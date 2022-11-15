FROM node:16.13.1 AS builder

WORKDIR /app

COPY package.json ./

FROM node:16.13.1

COPY --from=builder /app/package*.json ./

RUN yarn 

COPY . .

RUN yarn run build


EXPOSE 3000

CMD ["yarn", "start"]