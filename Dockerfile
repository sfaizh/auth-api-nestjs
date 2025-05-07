# syntax=docker/dockerfile:1.15.0

FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["node", "dist/main"]

CMD ["node", "--inspect=0.0.0.0:9229", "dist/main"]