# Base image
FROM node:lts-alpine

# Make folder to put our files in
RUN mkdir -p /toolbox
RUN mkdir -p /toolbox/backend

# Set working directory so that all subsequent command runs in this folder
WORKDIR /toolbox/backend

# Copy package json and install dependencies
COPY package*.json ./

# install project dependencies
RUN npm install
RUN npx prisma generate

# Copy our app
COPY . .

# Expose port to access server
EXPOSE 4000

# Command to run our app
CMD [ "npm", "start"]