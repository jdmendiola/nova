# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-slim as ui

WORKDIR /app/client 

COPY /client/package-lock.json /client/package.json ./
RUN npm install
COPY /client /app/client/
RUN npm run build

FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Final stage for app image
FROM base

# for debian/ubuntu-based images
RUN apt-get update -y && apt-get install -y ca-certificates fuse3 sqlite3

# Copy built application
COPY --from=build /app /app
COPY --from=ui /app/client /app/client/

# LiteFS
COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs

ENTRYPOINT litefs mount