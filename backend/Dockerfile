# Build Stage


# Use Node.js LTS version
FROM node:24-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci 

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript code
# RUN npm install -D typescript @types/node
RUN npm run build


# Production Stage


FROM node:24-alpine

# Set working directory
WORKDIR /app
# Copy package files
COPY  package*.json ./

# Reinstall only production dependencies
RUN npm ci --only=production

# Copy built files from the build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]