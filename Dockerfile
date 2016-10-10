FROM mhart/alpine-node:6

RUN mkdir -p /app
WORKDIR /app
ADD package.json .

CMD bash
