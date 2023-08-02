FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY ./api/package.json .

RUN npm install

COPY ./api .

EXPOSE 5000

CMD ["npm", "run", "dev"]