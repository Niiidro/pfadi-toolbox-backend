# Base image
FROM node

# Make folder to put our files in
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app/backend

# Copy package json and install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate

# Copy our app
COPY . .

# Expose port to access server
EXPOSE 4000

# Command to run our app
CMD [ "npm", "start"]