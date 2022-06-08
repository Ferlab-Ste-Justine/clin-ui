FROM node:16.13.0 as builder

WORKDIR /code

COPY package.json package-lock.json /code/
RUN npm install

COPY public /code/public
COPY src /code/src
COPY .env tsconfig.json /code/
RUN npm run build

FROM nginx:stable as server

COPY --from=builder /code/build /usr/share/nginx/html/

COPY static.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT [""]
CMD ["nginx", "-g", "daemon off;"]
