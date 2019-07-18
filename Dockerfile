FROM node:12-alpine
LABEL maintainer="taichunmin <taichunmin@gmail.com>"
WORKDIR /app
COPY package.json yarn.lock ./
RUN set -ex; \
  yarn install --production  --non-interactive
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]