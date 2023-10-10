## Mirror Effect Plus Protocol

## Introduction 

A growing body of research has demonstrated the beneficial effects of mirror effect therapy combined with 
drug therapy to support the recovery of severe Bell’s Palsy, but there is a need for specialized clinical 
computer-based tool to create modified visual feedback during facial exercises. 

The specialized Mirror Effect Plus Protocol website, aka MEPP website, allows patients to benefit from a 
mirror effect therapy through augmented reality and from many other functionalities, that 
should promote motor learning and diminish cognitive load. The MEPP website increase clinicians’ accessibility
to a specialized facial rehabilitation tool for mirror therapy. 

Clinicians using the MEPP website can also objectively and easily measure compliance to facial therapy 
with the MEPP website. 


## Requirements

**Back end:**

- Python 3.10
- pipenv

**Front end:**

- nodejs 16.x

**DeepAR.ai**

- A valid license key from https://www.deepar.ai/

**Docker** 
- docker
- docker-compose

## Run the application

```shell
computer:mepp user$ npm install --legacy-peer-deps
or
computer:mepp user$ npm run setup

```

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
