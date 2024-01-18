FROM alpine
RUN apk add --update nodejs npm
WORKDIR /frontend
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 5127
CMD [ "npm" , "run" , "dev" ]