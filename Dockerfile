# Simple Hugo source code container
FROM klakegg/hugo:ext-alpine

# Set working directory
WORKDIR /src

# Copy all source files
COPY . .

# Install git for Hugo's git info requirements
RUN apk add --no-cache git

# Set up git repository
RUN git init && \
    git config user.email "build@docker.local" && \
    git config user.name "Docker Build" && \
    git add . && \
    git commit -m "Initial commit"

# Expose port 1313 (Hugo's default dev server port)
EXPOSE 1313

# Start Hugo development server
CMD ["hugo", "server", "--bind=0.0.0.0", "--port=1313", "--baseURL=http://localhost:1313"]
