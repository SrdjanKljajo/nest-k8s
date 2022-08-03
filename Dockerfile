#############################
# BUILD FOR LOCAL DEVELOPMENT
#############################

FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

EXPOSE 5001
# new migrate and start app script
CMD [  "npm", "run", "start:migrate:dev" ]
