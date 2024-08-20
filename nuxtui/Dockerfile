# syntax = docker/dockerfile:1

ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-slim as base

ARG PORT=9000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY  package.json package-lock.json /
RUN npm install --production=false

COPY . .

ENV NODE_OPTIONS=--max-old-space-size=16384

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /.output /.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]


