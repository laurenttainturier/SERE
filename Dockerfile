FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY . ./
RUN npm install

CMD node bin/www

EXPOSE 3000