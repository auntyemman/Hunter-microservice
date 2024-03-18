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

# Copy RabbitMQ and RPC configuration files from shared directory
COPY ./services/shared/config/rabbitmqConfig.js ./services/shared/config/rpcConfig.js ./config/

# Expose port (change port number as needed)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]