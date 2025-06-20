# Here, we'll be defining the Dockerfile for our server application.

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8000

# start the backend application:-
CMD [ "nodemon", "app.js" ]