FROM node:12-buster

WORKDIR /usr/src/app

COPY . .
COPY production.env .env

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build

EXPOSE 3002
CMD ["npm","run","start:prod"]

