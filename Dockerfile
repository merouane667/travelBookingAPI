# Use Node.js as the base image
FROM node:18-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files to the container
COPY . .

# Change the directory to src
WORKDIR /app/src

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
