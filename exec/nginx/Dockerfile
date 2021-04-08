FROM node:14.15.4 as build
WORKDIR /app/Deploy
COPY ./Deploy/package*.json ./
RUN yarn install
COPY ./Deploy/ ./
RUN yarn build

FROM nginx:latest

COPY --from=build /app/Deploy/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/default.conf
RUN rm -rf /etc/nginx/sites-available/

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-app.conf /etc/nginx/sites-available/

COPY ./letsencrypt /etc/letsencrypt

RUN mkdir -p /etc/nginx/sites-enabled/\
    && ln -s /etc/nginx/sites-available/nginx-app.conf /etc/nginx/sites-enabled/

CMD ["nginx", "-g", "daemon off;"]
