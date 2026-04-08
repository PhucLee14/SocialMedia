FROM node:18.16.1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm install && npx nodemon index.js"]