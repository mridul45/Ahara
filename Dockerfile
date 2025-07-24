# Use official Node.js image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first for better cache
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the app (if needed)
RUN npm run build

# Expose port (default Vite port)
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview"]
