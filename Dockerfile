FROM node:12

WORKDIR /app
RUN apt-get update
COPY package-lock.json .
COPY package.json .
RUN npm install

COPY src src
COPY ssl ssl
COPY public public

EXPOSE 10000
EXPOSE 10001-10100

RUN npm i -g nodemon

CMD npm start