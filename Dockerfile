FROM node:17-alpine

WORKDIR /app

COPY ./api .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]