#Build Stage
FROM node:24-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies

RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build


#Production Stage

FROM node:24-alpine

# Set working directory
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=build-stage /app/dist ./dist


# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]