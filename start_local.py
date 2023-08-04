#!/usr/bin/env python3
# coding: utf-8
# MEPP - A web application to guide patients and clinicians in the process of
# facial palsy rehabilitation, with the help of the mirror effect and principles
# of motor learning
# Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
#
# This file is part of MEPP.
#
# MEPP is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# MEPP is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
import argparse
import os
import signal
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from threading import Thread
from typing import Union

try:
    import netifaces
except ModuleNotFoundError:
    print('Please run `pip install netifaces` or `pipenv shell`')
    sys.exit(1)


class EnvStarter:

    BASE_DIR = Path(__file__).resolve().parent
    LOCAL_DOMAIN_NAME = 'mepp.local'

    def __init__(self, no_front_end, no_back_end):

        self.__validate_dotenv()
        self.__no_front_end = no_front_end
        self.__no_back_end = no_back_end
        self.__thread_killer = ThreadKiller()
        self.__process_ids = []
        self.__init_db()
        self.__ip_address, same = self.__get_ip_address()
        if not same:
            self.__update_etc_hosts()
            self.__write_new_ip()

        self.__write_nginx_config()
        self.__write_docker_compose_file()

    def run(self):
        self.start_docker()
        if not self.__no_back_end:
            self.start_django()

        if not self.__no_front_end:
            self.start_webpack()

    def run_shell(
        self, cmd: Union[str, list], polling: bool = True, cwd: str = None
    ):
        if cwd is None:
            cwd = self.BASE_DIR

        if isinstance(cmd, list):
            if polling:
                process = subprocess.Popen(cmd,
                                           stdout=subprocess.PIPE,
                                           universal_newlines=True,
                                           cwd=cwd)
                self.__process_ids.append(process.pid)
                process_polling = ProcessPolling(process, self.__thread_killer)
                process_polling.start()
            else:
                try:
                    stdout = subprocess.check_output(cmd,
                                                     universal_newlines=True,
                                                     cwd=cwd)
                except subprocess.CalledProcessError as cpe:
                    sys.stderr.write(cpe.output)
                    print('An error has occurred')
                    sys.exit(1)
                return stdout
        else:
            return_value = os.system(cmd)
            if return_value != 0:
                print('An error has occurred')
                sys.exit(1)

    def start_django(self):
        cmd = [
            'pipenv',
            'run',
            'python',
            'manage.py',
            'runserver_plus',
            '0:8000',
        ]
        self.run_shell(cmd)

    def start_docker(self):
        cmd = (
            'cd {base_dir} && '
            '$(command -v docker) compose -f docker-compose.yml up --force-recreate -d'
        ).format(base_dir=self.BASE_DIR)
        self.run_shell(cmd)

    def start_webpack(self):
        cmd = [
            'npm',
            'run',
            'start',
        ]
        self.run_shell(cmd)

    def stop(self):

        self.__thread_killer.kill()

        for pid in self.__process_ids:
            try:
                os.kill(pid, signal.SIGTERM)
            except ProcessLookupError:
                pass

        self.stop_docker()

    def stop_docker(self):
        cmd = (
            'cd {base_dir} &&'
            '$(command -v docker-compose) '
            '-f docker-compose.yml '
            'stop'
        ).format(base_dir=self.BASE_DIR)
        self.run_shell(cmd)

    @classmethod
    def __get_ip_address(cls) -> tuple:
        excluded_interfaces = ('lo', 'docker', 'br-', 'veth', 'vmnet')
        searched_ranges = ['192', '172', '10']

        for interface in netifaces.interfaces():
            if not interface.startswith(excluded_interfaces):
                ifaddresses = netifaces.ifaddresses(interface)
                if (
                    ifaddresses.get(netifaces.AF_INET)
                    and ifaddresses.get(netifaces.AF_INET)[0].get('addr')
                ):
                    addresses = ifaddresses.get(netifaces.AF_INET)
                    first_ip_addr = addresses[0].get('addr').split('.')[0]
                    if first_ip_addr not in searched_ranges:
                        continue
                    ip_address = addresses[0].get('addr')
                    break

        if ip_address is None:
            print('Your IP address cannot be detected!')
            sys.exit(1)

        try:
            with open(f'{cls.BASE_DIR}/.last_ip.txt', 'r') as f:
                last_ip_address = f.read()
        except FileNotFoundError:
            same = False
        else:
            same = last_ip_address.strip() == ip_address

        return ip_address, same

    def __init_db(self):
        if not os.path.exists(f'{self.BASE_DIR}/.vols/db.sqlite3'):
            if not os.path.exists(f'{self.BASE_DIR}/.vols'):
                os.mkdir(f'{self.BASE_DIR}/.vols/')
            print('Initializing the database...')
            migrate_cmd = [
                'pipenv',
                'run',
                'python',
                'manage.py',
                'migrate',
            ]
            self.run_shell(migrate_cmd, polling=False)
            print('Inserting data into the database...')
            mock_data_cmd = [
                'pipenv',
                'run',
                'python',
                'manage.py',
                'mock_data',
            ]
            self.run_shell(mock_data_cmd, polling=False)

    def __update_etc_hosts(self):

        _, tmp_file_path = tempfile.mkstemp()

        with open('/etc/hosts', 'r') as f:
            lines = f.readlines()

        tmp_etc_hosts = []
        for line in lines:
            if self.LOCAL_DOMAIN_NAME not in line:
                tmp_etc_hosts.append(line)

        if '\n' not in tmp_etc_hosts[-1]:
            tmp_etc_hosts.append('\n')

        tmp_etc_hosts.append(f'{self.__ip_address}\t'
                             f'{self.LOCAL_DOMAIN_NAME}')

        with open(tmp_file_path, 'w') as f:
            f.write(''.join(tmp_etc_hosts))

        print('`sudo` is required to update your `/etc/hosts`')
        cmd = (
            'sudo cp /etc/hosts /etc/hosts.old && '
            f'sudo cp {tmp_file_path} /etc/hosts'
        )
        self.run_shell(cmd)
        os.unlink(tmp_file_path)

    def __validate_dotenv(self):

        if not os.path.exists(f'{self.BASE_DIR}/.env'):
            print('You must create your `.env` file first!')

    def __write_docker_compose_file(self):

        compose_yml = f"""
version: '3'

services:
  nginx:
    image: nginx:latest
    hostname: nginx
    environment:
      - DJANGO_SETTINGS_MODULE=mepp.settings.dev
    volumes:
      - ./.vols/nginx.conf:/etc/nginx/conf.d/default.conf
    extra_hosts:
      - mepp.local:{self.__ip_address}
    ports:
      - 9090:80
        """

        with open(f'{self.BASE_DIR}/docker-compose.yml', 'w') as f:
            f.write(compose_yml.strip())

    def __write_new_ip(self):

        with open(f'{self.BASE_DIR}/.vols/last_ip.txt', 'w') as f:
            f.write(self.__ip_address)

    def __write_nginx_config(self):

        nginx_config = """
server {
    listen 80 default_server;
    server_name _;

    proxy_set_header Host $host:9090;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host:9090;
    proxy_redirect off;

    location ~ ^/(admin|api|static) {
        proxy_pass http://mepp.local:8000;
    }

    location / {
        proxy_pass http://mepp.local:8080;
    }

}
        """
        with open(f'{self.BASE_DIR}/.vols/nginx.conf', 'w') as f:
            f.write(nginx_config.strip())


class ProcessPolling(Thread):

    def __init__(self, process, thread_killer):
        self.__thread_killer = thread_killer
        self.__process = process
        super().__init__()

    def run(self):
        while self.__thread_killer.is_alive:
            output = self.__process.stdout.readline()
            if output == '' and self.__process.poll() is not None:
                break
            if output:
                print(output.strip())

        return


class ThreadKiller:

    def __init__(self):
        self.__is_alive = True

    @property
    def is_alive(self):
        return self.__is_alive

    def kill(self):
        self.__is_alive = False


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Start MEPP application')
    parser.add_argument(
        '--no-front-end',
        action='store_true',
        default=False,
        help='Do not start front-end dev server '
    )
    parser.add_argument(
        '--no-back-end',
        action='store_true',
        default=False,
        help='Do not start backend-end dev server '
    )

    env_starter = EnvStarter(**vars(parser.parse_args(sys.argv[1:])))
    env_starter.run()

    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        env_starter.stop()

