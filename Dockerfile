# Base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN yarn

# Copy the entire project
COPY . .

# Production build
RUN yarn build

# Development server
CMD ["yarn", "start"]
