FROM node:lts-alpine AS builder
WORKDIR /usr/marvel-characters-api
COPY . /usr/marvel-characters-api
RUN npm install && npm run build && npm ci --production

FROM node:lts-alpine
WORKDIR /root/marvel-characters-api
COPY --from=builder /usr/marvel-characters-api/node_modules ./node_modules
COPY --from=builder /usr/marvel-characters-api/dist ./
CMD node -r dotenv/config ./core/index.js