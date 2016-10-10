#!/bin/sh

repo="$1"
tag="$2"

tag=$(echo $tag | sed 's/[^-._0-9a-zA-Z]/-/g') # convert invalid chars to '-'

aws ecr get-login --region us-east-1 | bash
docker tag $repo 054973484287.dkr.ecr.us-east-1.amazonaws.com/$repo:$tag
docker push 054973484287.dkr.ecr.us-east-1.amazonaws.com/$repo:$tag
