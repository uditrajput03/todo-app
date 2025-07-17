FROM node:lts-alpine AS builder
WORKDIR /frontend
COPY package*.json .
RUN npm install
COPY . .
# ENV VITE_BACKEND_URL="http://localhost:3000"
RUN npm run build
# EXPOSE 8000
# CMD [ "npx" , "serve" , "dist", "-p", "8000"]
FROM nginx:mainline-alpine
COPY --from=builder /frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80