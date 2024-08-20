ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-slim

ARG PORT=9000

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file into the working directory before copying the rest of the files to cache the dependencies
COPY package.json /app

# Install the dependencies, you might want to use yarn or pnpm instead
RUN npm install

# Copy the rest of the files into the working directory
COPY . /app

# Build the application, again, use yarn or pnpm if you want
RUN npm run build

# Expose the port the application runs on
ENV PORT=$PORT

# Start the application. This is the default command for Nuxt 3
CMD ["node", ".output/server/index.mjs"]
