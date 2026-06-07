FROM node:22-alpine

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend ./
RUN npm run prisma:generate
RUN npm run build

VOLUME ["/app/data"]

EXPOSE 3000
CMD ["sh", "-c", "DATABASE_URL='file:/app/data/prod.db' npx prisma migrate deploy && node dist/src/server.js"]