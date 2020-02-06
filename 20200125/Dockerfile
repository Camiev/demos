FROM node:10

WORKDIR /var/myapi

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN mkdir src

COPY src src

CMD [ "npm", "run", "start" ]