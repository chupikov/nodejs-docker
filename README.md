Docker setup for Node.js
========================

The Docker configuration for Node.js allows you to use Node.js without installing it on the host machine.

You can use this solution system-wide or for each project separately.
It provides the possibility to select any version of Node.js.

**IMPORTANT! This is NOT a standalone ready-to-use solution. It is merely a template that should be used to configure your own projects.**

See also:

* [Docker official image for the Node.js](https://hub.docker.com/_/node/).
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp).

Please NOTE that this configuration is intended for use with Node.js-based tools and is not meant for developing Node.js applications.


INSTALL FOR TEST
================

This section explains how to get this project up and running (for test purposes).

For instructions on how to deploy this configuration to your project, please refer to the _'INSTALL TO YOUR PROJECT'_ section below.

Before building the image for the first time
--------------------------------------------

After clone/copy source files:

1. Copy `.env.sample` to `.env`.
2. Configure the `.env` file.
3. Run `bin/node-init.sh` - this script creates the required files and directories.

After starting the container for the first time
-----------------------------------------------

1. Connect to the container using the command `bin/node-connect.sh`.
2. Execute `bin/init.sh` within the container - this will install and initialize dependencies, such as the required NPM packages.


INSTALL TO YOUR PROJECT
=======================

Initial preparations
--------------------

This section explains how to deploy this configuration to your project. Please note that this operation should only be performed once.

1. Copy the directory `etc → docker → nodejs` to your project. If the location of the `Dockerfile` in your project is different from the provided one, please configure `services → nodejs → build → context` accordingly in the next stage.
2. Copy the required (missing) environment variables from the provided `.env.sample` file to your `.env` file and configure them according to your project requirements (e.g., rename the container name with the variable `CONTAINER_NAME_NODEJS`).
3. Configure Docker Compose. Copy the following sections from the provided `docker-compose.yml` file to your own file and configure them:
    1. `secrets`
    2. `services → nodejs`
4. Copy the required executables from the `bin` directory (rename them if necessary). Typically, these include `node`, `npm`, and files starting with `node-`.
5. Update your `package.json` file and add the required dependencies.
6. Update the `src/bin/init.sh` file and add the necessary commands for the project's functionality.
7. Build and start Docker container: `docker compose up --build -d`
8. Connect to the container: `bin/node-connect.sh`
9. Run `bin/init.sh`

Congratulations! Your project built and configured.

Adding local dependencies to the `package.json`
-----------------------------------------------

1. Add dependencies to the `package.json` file.
2. Start Docker container: `docker compose up -d`
3. Connect to the container: `bin/node-connect.sh`
4. Run `npm install`
5. Create executable file to start new command outside the Docker container (e.g. `bin/gulp`). Please use existing `bin/node` file as a template.

Adding global dependencies
--------------------------

To add global NPM dependencies (such as Gulp), follow these steps:

1. Open the file `src/bin/init.sh` and add the necessary commands to install the global dependencies. For example, you can use `sudo npm install --global gulp`.
2. Start the Docker container: `docker compose up -d`
3. Connect to the container: `bin/node-connect.sh`
4. Run `bin/init.sh` inside the container.
5. Create executable file to start new command outside the Docker container (e.g. `bin/gulp`)
    1. Use the existing `bin/node` file as a template.
    2. Create a new file named `bin/gulp`.
    3. Customize the content of the `bin/gulp` file to match your new command(s).
    4. Make the `bin/gulp` file executable.


CONFIGURATION
=============

Node.js image version
---------------------

Specified by environment variable `DOCKER_NODEJS_IMAGE_VERSION` in the `.env` file.

The list of available images can be found on the [official image page](https://hub.docker.com/_/node/).

The default image used is `20.3-alpine3.17`.

System user within Docker container
-----------------------------------

Docker is configured in a way that allows the use within the Docker container:

* Your system username, UID, and GID (as defined on the host machine) will be set as the file owners.
* Your GIT configuration will be preserved.
* Your private SSH key will be included.

In order to configure this feature, you need to define environment variables in the `.env` file:

* `HOST_USER` - name of your system user.
* `HOST_UID` - UID of your system user.
* `HOST_GID` - GID of your system user.

For example:

```.env
HOST_USER=user
HOST_UID=1000
HOST_GID=1000
```
**WARNING!** If defined incorrectly, the container might not start up.

USAGE
=====

Start
-----

```bash
docker-compose up --build -d
# OR
bin/start.sh --build
```

Stop
----

```bash
docker-compose down
# OR
bin/stop.sh
```

TEST
====

The configuration includes test scripts to check if the configuration works:

1. Console script `test.js`.
2. Test server `server.js`.

You can run scripts from the host machine (without logging into the Docker container):

```bash
# Run console script.
bin/npm start

# Start a test web server.
bin/npm run server

# Run Gulp default task
bin/gulp
```

COMMANDS
========

Commands located in the `bin` directory.

node
----

This allows executing Node.js commands within a container.

For example:

```bash
bin/node --version
```

npm
---

This allows execute `npm` command within a container.

For example:

```bash
bin/npm --version
```

gulp
----

This allows execute `gulp` command within a container.

For example:

```bash
bin/gulp --version
```


COPYRIGHT
=========

* (c) 2023 Yaroslav Chupikov
