FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ .
RUN npm run build

EXPOSE $port

CMD [ "npm", "run", "prod"]