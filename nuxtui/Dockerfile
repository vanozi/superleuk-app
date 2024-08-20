# syntax = docker/dockerfile:1

ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-slim as base

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json /

RUN npm install

COPY . .

EXPOSE 9000

RUN npm run build
CMD [ "npm", "run", "start" ]
