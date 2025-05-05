FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build; \
    fi

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"DEVELOP\" ]; then npm run dev; else node dist/app.js; fi"]