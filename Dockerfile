FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

ADD . .

CMD [ "yarn", "start" ]
