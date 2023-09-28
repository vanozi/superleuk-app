FROM node:18.15-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm i -g add @quasar/cli
COPY . .


# build stage
FROM develop-stage as build-stage
RUN npm install && quasar build -m pwa


# production stage
FROM nginx:1.23.4-alpine as production-stage
COPY --from=build-stage /app/dist/pwa /usr/share/nginx/html
