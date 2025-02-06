FROM node:20.11.0-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . . 

CMD [ "npm", "run", "start" ]