# Multi-stage build for Hugo site
# Stage 1: Build the Hugo site
FROM klakegg/hugo:ext-alpine AS builder

# Set working directory
WORKDIR /src

# Copy package files for dependency management
COPY package*.json ./
COPY go.mod go.sum ./

# Install Node.js dependencies if package.json exists
RUN if [ -f package.json ]; then \
    apk add --no-cache nodejs npm && \
    npm ci --only=production; \
    fi

# Copy Hugo configuration
COPY hugo.yaml ./
COPY config.yaml ./

# Copy source files
COPY content/ ./content/
COPY layouts/ ./layouts/
COPY assets/ ./assets/
COPY static/ ./static/ 2>/dev/null || true

# Build the site
RUN hugo --minify --cleanDestinationDir

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy the built site from builder stage
COPY --from=builder /src/public /usr/share/nginx/html

# Copy custom nginx configuration if it exists
COPY nginx.conf /etc/nginx/conf.d/default.conf 2>/dev/null || true

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
