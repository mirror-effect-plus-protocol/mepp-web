## Mirror Effect Plus Protocol

## Requirements

**Back end:**

- Python 3.8
- pipenv

**Front end:**

- nodejs 15.x
- yarn

**DeepAR.ai**

- A valid license key from https://www.deepar.ai/

**Docker** 
- docker
- docker-compose

## Run the application

The easiest way to run the application is to clone [`mepp-docker`](https://github.com/mirror-effect-plus-protocol/mepp-docker) repository 
and use `docker-compose` to run `docker` containers.

Ensure to create a `.env` file first based on [`./env.sample`](.env.sample).
It has to be placed at the root of the project.

Look at [`mepp-docker` README](https://github.com/mirror-effect-plus-protocol/mepp-docker/README.md) for more details. 

### Run it locally 

If you want to test it locally, a script is provided (only for macOS or linux) to run the application on a local environment: `start_local.py`

It uses `docker` (and `docker-compose`) to start NGINX as a proxy for both front-end and back-end webservers in order to make the React app be able to speak with Django API.  
Both are hosted under the same domain (`mepp.local`) to avoid CORS errors.  

The script adds an entry to your `/etc/hosts` and creates a `docker-compose.yml` file before starting `webpack`, `django` and `docker`.
When started, the app is available at http://mepp.local:9090/.

_Admin credentials:_ 
  - E-mail address: `admin@mepp.local`
  - Password: `Test123!`


```shell
computer:mepp user$ pipenv install
computer:mepp user$ pipenv run python start_local.py
```

Run with option `--help` for more details

_Notes: Ports `8000`, `8080` and `9090` are required_

Have a look at the [wiki](https://github.com/mirror-effect-plus-protocol/mepp-web/wiki) for more info.

## Tests

Dev dependencies are installed when using `pipenv`.

```shell
computer:mepp user$ pipenv shell
(mepp) computer:mepp user$ pytest -vv
```
