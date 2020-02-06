FROM node:10

WORKDIR /project

ADD package.json package-lock.json .env ./

RUN npm install

ADD app ./app

RUN ls

CMD ["npm", "run", "start"]