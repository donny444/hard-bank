FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --save

COPY . .

EXPOSE 3715

CMD ["npm", "start"]