FROM node:16-alpine  AS builder

WORKDIR /app

COPY . .
RUN yarn install --prod && yarn build

FROM nginx:1.21

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80