FROM node:lts-alpine as build

WORKDIR /app

COPY . /app

RUN yarn install --frozen-lockfile

RUN cd /app/server && yarn run build

RUN cd /app/client && yarn run build


FROM node:lts-alpine

WORKDIR /app

ENV PORT 3000
EXPOSE $PORT

COPY --from=build /app/server/dist/ .

COPY --from=build /app/client/dist/ /app/frontend

RUN yarn global add nodemon

CMD ["nodemon", "-q", "app.js"] 
