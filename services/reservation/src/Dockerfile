# Use Node.js image as base
FROM node:14-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to container
COPY . .

# Expose port (change port number as needed)
EXPOSE 3003

# Command to run the application
CMD ["npm", "start"]