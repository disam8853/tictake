FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .
RUN yarn install --prod

EXPOSE 8080
CMD [ "yarn", "start" ]