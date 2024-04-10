FROM node:18.3.0-alpine3.15 AS builder

WORKDIR /app
COPY . .
RUN npm install
ENV NODE_ENV=production

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:1.21.3-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]