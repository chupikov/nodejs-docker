#!/bin/bash
# Install and initialize dependencies.
# Run this script manually from the Docker container after the build.
# (C) 2023 Yaroslav Chupikov <yaroslav@mirasoltek.com>

SELF_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
ROOT_DIR="$(dirname ${SELF_DIR})"

cd ${ROOT_DIR}
sudo npm install --global gulp
npm install
