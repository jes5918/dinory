FROM node:14.15.4 as builder
WORKDIR /app/Deploy
COPY ./Deploy/package.json ./
RUN yarn install
COPY ./Deploy/ ./
RUN yarn build

FROM nginx:latest

RUN rm -rf /etc/nginx/default.conf
RUN rm -rf /etc/nginx/sites-available/

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-app.conf /etc/nginx/sites-available/

COPY ./letsencrypt /etc/letsencrypt

RUN mkdir -p /etc/nginx/sites-enabled/\
    && ln -s /etc/nginx/sites-available/nginx-app.conf /etc/nginx/sites-enabled/

COPY --from=build /app/deploy/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
