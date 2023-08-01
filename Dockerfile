FROM node:17-alpine

WORKDIR /app

COPY ./api/package.json .

RUN npm install

COPY ./api .

EXPOSE 5000

CMD ["npm", "start"]