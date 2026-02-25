# Use node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy full frontend code
COPY . .

# Expose vite port
EXPOSE 5173

# Start vite dev server
CMD ["npm", "run", "dev", "--", "--host"]