FROM node:latest

# Install app dependencies
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app; npm install
COPY . /usr/src/app

#Sets the working dir
WORKDIR /usr/src/app

EXPOSE  8080
CMD ["npm", "start"]
