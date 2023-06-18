FROM node:18-alpine

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS --openssl-legacy-provider

COPY package.json ./
COPY craco.config.js ./

ADD . /usr/src/app

RUN yarn install
RUN yarn global add craco

EXPOSE 3000

CMD ["yarn", "start"]
