#!/bin/bash

repo="$1"

if [ -f "~/docker/image.tar" ]; then docker load -i ~/docker/image.tar; fi
docker build --rm=false -t $repo .
mkdir -p ~/docker
# docker save $repo > ~/docker/image.tar
docker save $(docker history -q $repo | sed '/^<missing>$/d') > ~/docker/image.tar
