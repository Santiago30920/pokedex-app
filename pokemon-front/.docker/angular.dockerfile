FROM node:20 as pokeFront
RUN mkdir /www
WORKDIR /www
COPY . .
RUN npm i
RUN npm run build

FROM nginx 
COPY --from=pokeFront /www/dist/pokemon-front/browser /usr/share/nginx/html
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf