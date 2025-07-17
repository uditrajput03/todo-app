FROM node:lts-alpine
WORKDIR /backend
COPY package*.json .
RUN npm install
COPY . .
ENV MONGO_URL="mongodb+srv://mongo:mongo@localhost:5432"
EXPOSE 3000
CMD [ "node" , "index.js" ]