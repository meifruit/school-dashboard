# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /schoolapp

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Database
# RUN npx prisma generate
RUN npx prisma generate
RUN npm run build

# Build the Next.js application

# Expose the port the app runs on
# EXPOSE 3000

# Start the Next.js application
# CMD ["npm", "start"]
# npm install
# npx prisma generate
# npx prisma migrate deploy
