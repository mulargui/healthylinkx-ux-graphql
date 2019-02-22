#!/usr/bin/env bash

set -x
export DEBIAN_FRONTEND=noninteractive
# Absolute path to this repo
SCRIPT=$(readlink -f "$0")
export REPOPATH=$(dirname "$SCRIPT")/..

# what you can do
CLEANUP=N
BUILD=N

# you can also set the flags using the command line
for var in "$@"
do
	if [ "CLEANUP" == "$var" ]; then CLEANUP=Y 
	fi
	if [ "BUILD" == "$var" ]; then BUILD=Y 
	fi
done

# clean up all images
if [ "${CLEANUP}" == "Y" ]; then
	sudo docker rmi -f react
fi

# create image
if [ "${BUILD}" == "Y" ]; then
	# this is a hack
	# docker can only copy files in the container from the docker folder
	cp -r $REPOPATH/public $REPOPATH/docker
	cp -r $REPOPATH/fonts $REPOPATH/docker
	cp -r $REPOPATH/src $REPOPATH/docker
	sudo docker build --rm=true -t react $REPOPATH/docker
	# now we do the cleanup
	rm -r $REPOPATH/docker/public
	rm -r $REPOPATH/docker/fonts
	rm -r $REPOPATH/docker/src
fi
