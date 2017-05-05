FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json package.json

RUN npm install

ADD . .

CMD [ "npm", "start" ]
