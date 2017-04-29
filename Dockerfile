FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD Makefile Makefile
ADD package.json package.json

RUN make install

ADD . .

CMD [ "make" ]
