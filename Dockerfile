FROM node:alpine as builder-step
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM nginx:alpine
COPY --from=builder-step /app/dist/angular-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80