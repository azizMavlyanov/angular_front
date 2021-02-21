FROM node:alpine as builder-step
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm install
RUN echo $PORT

ARG API_URL
ENV API_URL=$API_URL

COPY . .
RUN npm run test-headless
RUN npm run build 

FROM nginx:alpine
COPY --from=builder-step /app/dist/angular-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
EXPOSE $PORT