FROM node:22.14.0-alpine

# Create app directory with correct ownership
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Copy package.json and lock file as root, change ownership
COPY package*.json ./
RUN chown node:node package*.json

# Switch to non-root user
USER node

# Install dependencies
RUN npm install

# Copy remaining files with correct ownership
USER root
COPY --chown=node:node . .

# Switch back to node for runtime
USER node

EXPOSE 3011
CMD [ "npm", "run", "start" ]