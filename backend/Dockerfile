FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .

RUN npm i

ENV NODE_ENV=development

CMD [ "npm" ,"start" ]

EXPOSE 3000