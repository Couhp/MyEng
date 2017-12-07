FROM node:0.10.38

RUN mkdir /src

WORKDIR /src

ADD . /src

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

EXPOSE  8080
CMD ["node", "/src/app.js"]