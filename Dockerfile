FROM mhart/alpine-node

ADD . /app
WORKDIR /app

RUN npm install -g gulp-cli
RUN npm shrinkwrap

RUN apk add --update python

RUN mkdir -p /app/common/styleguide
RUN ln -s /app/dist/* /app/common/styleguide/

CMD ["gulp"]
