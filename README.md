Docker setup for Node.js
========================

The Docker configuration for Node.js allows you to use Node.js without installing it on the host machine.

You can use this solution system-wide or for each project separately.
It provides the possibility to select any version of Node.js.

See also:

* [Docker official image for the Node.js](https://hub.docker.com/_/node/).
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp).

Please NOTE that this configuration is intended for use with Node.js-based tools and is not meant for developing Node.js applications.


INSTALL
=======


Before building the image for the first time
--------------------------------------------

After clone/copy source files:

1. Copy `.env.sample` to `.env`.
2. Configure the `.env` file.
3. Run `bin/init.sh` - this script creates the required files and directories.

After starting the container for the first time
-----------------------------------------------

1. Connect to the container using the command `bin/node-connect.sh`.
2. Execute `bin/init.sh` within the container - this will install and initialize dependencies, such as the required NPM packages.


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

COPYRIGHT
=========

* (c) 2023 Yaroslav Chupikov
