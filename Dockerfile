FROM node:8
RUN mkdir -p /app/pictagraph
WORKDIR /app/pictagraph


# Install app dependencies
COPY package.json /app/pictagraph
RUN npm install     

# Bundle app source
COPY . /app/pictagraph

# Build the built version
EXPOSE 3000
#RUN npm run dev

CMD ["npm", "start"]