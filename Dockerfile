FROM mhart/alpine-node

ADD . /app
WORKDIR /app

RUN apk add --update alpine-sdk python
RUN npm install -g gulp-cli http-server
RUN npm install
RUN apk del --purge alpine-sdk python

RUN gulp build
CMD http-server /app/dist
