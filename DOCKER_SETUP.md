# Docker Hub Setup

This repository includes a GitHub Action that automatically builds and pushes Docker images to Docker Hub when changes are pushed to the main branch.

## Setup Instructions

### 1. Create Docker Hub Repository

1. Go to [Docker Hub](https://hub.docker.com/)
2. Create a new repository named `jaqstack-website`
3. Make sure it's public or private as needed

### 2. Configure GitHub Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions, and add these secrets:

- `DOCKER_USERNAME`: Your Docker Hub username (`surendocker`)
- `DOCKER_PASSWORD`: Your Docker Hub password or access token

**Note**: For better security, use a Docker Hub access token instead of your password:
1. Go to Docker Hub → Account Settings → Security
2. Create a new access token
3. Use this token as `DOCKER_PASSWORD`

### 3. Workflow Details

The GitHub Action workflow (`/.github/workflows/docker-publish.yml`) will:

- **Trigger**: On pushes to `main` branch and pull requests
- **Build**: Multi-architecture Docker image (AMD64 and ARM64)
- **Push**: Automatically push to `surendocker/jaqstack-website` on Docker Hub
- **Tags**: 
  - `latest` for main branch pushes
  - `main-<commit-sha>` for specific commits
  - Branch name for other branches

### 4. Usage

Once set up, every push to main will automatically:

1. Build the Hugo site
2. Create a Docker image
3. Push to Docker Hub

You can then pull and run the image:

```bash
docker pull surendocker/jaqstack-website:latest
docker run -p 8080:80 surendocker/jaqstack-website:latest
```

### 5. Manual Build (Optional)

You can also build and push manually:

```bash
# Build locally
docker build -t surendocker/jaqstack-website .

# Tag for Docker Hub
docker tag surendocker/jaqstack-website surendocker/jaqstack-website:latest

# Push to Docker Hub
docker push surendocker/jaqstack-website:latest
```

## Troubleshooting

- **Authentication errors**: Verify your Docker Hub credentials in GitHub Secrets
- **Build failures**: Check the Actions tab in your GitHub repository for detailed logs
- **Permission issues**: Ensure your Docker Hub account has push permissions for the repository
