FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install

COPY next.config.js ./next.config.js
COPY .env.local ./.env.local

CMD [ "npm", "run", "dev" ]