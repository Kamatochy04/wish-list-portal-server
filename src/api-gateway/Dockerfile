FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "--inspect=0.0.0.0:9229", "src/app.ts"]