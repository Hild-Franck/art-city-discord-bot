FROM node:lts-alpine AS base

WORKDIR /app

FROM base AS builder

COPY package*.json babel.config.js ./

RUN npm install

COPY ./index.js .
COPY ./src ./src

RUN npm run build
RUN npm prune --production

FROM base AS release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node

CMD [ "node", "./dist/index.js" ]
