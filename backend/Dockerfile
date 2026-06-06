FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY backend ./backend/
COPY shared ./shared/


RUN npm install

RUN npm run build --workspace=shared
RUN npm install --workspace=backend
RUN npm run prisma:generate --workspace=backend
RUN npm run build --workspace=backend

VOLUME ["/app/data"]

EXPOSE 3000
CMD ["sh", "-c", "cd backend && DATABASE_URL='file:/app/data/prod.db' npx prisma migrate deploy && node dist/src/server.js"]