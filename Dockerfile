FROM node:16
RUN mkdir -p /usr/src/app
COPY --chown=node:node . /usr/src/app
USER node
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm i --production
COPY . .
CMD [ "node", "index.js" ]