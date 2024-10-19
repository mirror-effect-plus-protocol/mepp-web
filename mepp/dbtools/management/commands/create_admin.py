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

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    help = 'Create superuser'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating a super user for MEPP platform...')
        User = get_user_model()  # noqa
        email_address = input('E-mail address:')
        first_name = input('First name:')
        last_name = input('Last name:')
        good_passwords = False
        while not good_passwords:
            password = input('Password:')
            confirm_password = input('Confirm password:')
            if password != confirm_password:
                self.stdout.write('Passwords do not match')
            else:
                good_passwords = True

        admin = User.objects.create(
            username=email_address,
            email=email_address,
            first_name=first_name,
            last_name=last_name,
            is_superuser=True,
            is_staff=True,
        )
        admin.set_password(password)
        admin.save()

        self.stdout.write('Super user has been created!')
