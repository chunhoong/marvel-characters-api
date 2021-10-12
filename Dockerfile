FROM node:lts-alpine AS builder
WORKDIR /usr/marvel-characters-api
COPY . /usr/marvel-characters-api
RUN npm i -g npm@7
RUN npm install && npm run build && npm ci --production --ignore-scripts

FROM node:lts-alpine
WORKDIR /root/marvel-characters-api
COPY --from=builder /usr/marvel-characters-api/node_modules ./node_modules
COPY --from=builder /usr/marvel-characters-api/dist ./
RUN npm i -g npm@7
CMD node -r dotenv/config ./core/server.js