FROM mhart/alpine-node

ADD package.json /app/
WORKDIR /app

RUN apk add --update alpine-sdk python && \
    npm install -g gulp-cli http-server && \
    npm install && \
    apk del --purge alpine-sdk python

ADD . /app

CMD gulp & http-server /app/dist
