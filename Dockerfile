# Multi-stage build for Hugo site
# Stage 1: Build the Hugo site
FROM klakegg/hugo:ext-alpine AS builder

# Set working directory
WORKDIR /src

# Copy all files first
COPY . .

# Install Node.js dependencies if package.json exists
RUN if [ -f package.json ]; then \
    apk add --no-cache nodejs npm && \
    npm ci --only=production; \
    fi

# Build the site with custom config that disables git info
RUN hugo --config hugo.docker.yaml --minify --cleanDestinationDir

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy the built site from builder stage
COPY --from=builder /src/public /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
