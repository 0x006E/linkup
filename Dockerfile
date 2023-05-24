FROM node:lts-alpine as build

WORKDIR /app

COPY . /app

RUN yarn install --frozen-lockfile

ENV NODE_ENV=production

RUN cd /app/server && yarn run build

RUN cd /app/client && yarn run build


FROM node:lts-alpine

WORKDIR /app

ENV PORT 3000
EXPOSE $PORT

COPY --from=build /app/server/dist/app.js app.js

COPY --from=build /app/client/dist/ /app/frontend

RUN npm install pm2 -g

CMD ["pm2-runtime", "app.js"]

CMD ["node", "app.js"] 
