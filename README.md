Docker setup for Node.js
========================

The Docker configuration for Node.js allows you to use Node.js without installing it on the host machine.

This configuration is intended for using Node.js-based tools
(like [gulp](https://gulpjs.com/), [grunt](https://gruntjs.com/) or [webpack](https://webpack.js.org/))
in projects in other programming languages.

You can use this solution system-wide or for each project separately.
It provides the possibility to select any version of Node.js.

See also:

* [Docker official image for the Node.js](https://hub.docker.com/_/node/).
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp).

Please NOTE that this configuration is intended for use with Node.js-based tools and is not meant for developing Node.js applications.



INSTALL
=======

After clone/copy source files:

1. Copy `.env.sample` to `.env`.
2. Configure `.env`.
3. Run `bin/init.sh` - script creates required files and  directories.



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
**WARNING!** If defined incorrectly, the container may fail to start up.


Port numbers and `server.js`
----------------------------

`Server.js` is a simple web server added to demonstrate the functionality of the Docker container, along with the `test.js` script.

To configure the port numbers:

- The "external" port number (exposed by the Docker container) should be defined in the `.env` file using the `CONTAINER_EXT_PORT_NODEJS` environment variable (default 80).
- The "internal" port number (used by the containerized software) should be specified using the `CONTAINER_INT_PORT_NODEJS` environment variable (default 8080).

Both of these environment variables are required to correctly create the port mapping in Docker.

The `server.js` script can load the port numbers from these environment variables. However, the script also utilizes its own configuration file, `server.json`, where you have the option to overwrite the ports:

```json
{
    "version": "1",
    "host": "localhost",
    "port": {
        "internal": 8080,
        "external": 80
    },
    "public": "__public"
}
```

Port number priority order:

1. The port numbers are defined in the `server.json` configuration file.
2. If not defined in the `server.json` file, the port numbers can be set using the environment variables `CONTAINER_EXT_PORT_NODEJS` and `CONTAINER_INT_PORT_NODEJS`.
3. If neither the `server.json` file nor the environment variables are specified, default values in the `server.js` script will be used (external port: `80`, internal port: `8080`).



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
