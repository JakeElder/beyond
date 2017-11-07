FROM node:8.9.0-alpine

RUN mkdir -p /u/app
WORKDIR /u/app

ADD package.json /u/app/package.json
ADD yarn.lock /u/app/yarn.lock

RUN yarn

ADD . /u/app
RUN ./node_modules/.bin/webpack --env.DEV=false

RUN mv build/server.js .

EXPOSE 3000

CMD ["node", "server.js"]
