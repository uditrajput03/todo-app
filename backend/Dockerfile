FROM alpine
RUN apk add --update nodejs npm
WORKDIR /backend
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node" , "index.js" ]