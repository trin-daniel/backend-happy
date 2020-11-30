FROM node:12
WORKDIR /usr/src/backend-happy
COPY ./package.json .
RUN npm install --only=prod
