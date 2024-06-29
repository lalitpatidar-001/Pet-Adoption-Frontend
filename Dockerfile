FROM node:alpine

WORKDIR /react-app

COPY . .

RUN npm install 

EXPOSE 5173

CMD ["npm","run","dev"]

