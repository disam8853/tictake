FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .
RUN yarn install --prod

CMD [ "yarn", "start" ]