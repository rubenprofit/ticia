FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
COPY package*.json /usr/src/app/
RUN npm i
COPY . .
USER node
CMD [ "npm", "start" ]