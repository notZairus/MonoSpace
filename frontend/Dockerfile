FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY frontend ./frontend/
COPY shared ./shared/

RUN npm install
RUN npm run build --workspace=shared
RUN npm install --workspace=frontend
RUN npm run build --workspace=frontend

FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]