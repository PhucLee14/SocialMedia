FROM node:18.16.1

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "npm install --legacy-peer-deps && npm start"]