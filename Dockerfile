FROM node:20-slim as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .

COPY prisma/ ./prisma/
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "build"]
