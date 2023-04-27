FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js
COPY .env.local ./.env.local

CMD [ "yarn", "dev" ]