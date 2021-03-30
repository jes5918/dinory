FROM nginx:latest

RUN rm -rf /etc/nginx/default.conf
RUN rm -rf /etc/nginx/sites-available/

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-app.conf /etc/nginx/sites-available/

COPY ./letsencrypt /etc/letsencrypt

RUN mkdir -p /etc/nginx/sites-enabled/\
    && ln -s /etc/nginx/sites-available/nginx-app.conf /etc/nginx/sites-enabled/

CMD ["nginx", "-g", "daemon off;"]
