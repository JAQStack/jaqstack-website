# Docker Hub & GitHub Pages Deployment

This repository includes deployment workflows for both Docker Hub and GitHub Pages (Docusaurus).

## Docker Hub Deployment (Docusaurus static site)

### Workflow: `.github/workflows/docker-publish.yml`
- **Triggers**: Push to `main` branch
- **Purpose**: Build the Docusaurus site and publish a Docker image (e.g., Nginx serving `build/`)
- **Repository**: `jaqstack/jaqstack-website:latest`

### Setup Required:
1. **Docker Hub Repository**: Create `jaqstack/jaqstack-website`
2. **GitHub Secrets**:
   - `DOCKERHUB_USERNAME`: `jaqstack`
   - `DOCKERHUB_TOKEN`: Docker Hub access token

### Notes:
- The workflow runs `npm ci` and `npm run build` to produce the static site in `build/`.
- Ensure your `Dockerfile` serves the `build/` directory (e.g., with Nginx).

## GitHub Pages Deployment (Docusaurus)

### Workflow: `.github/workflows/docusaurus-deploy.yml`
- **Triggers**: Push to the deployment branch configured in the workflow (often `main` or a release branch)
- **Purpose**: Deploy Docusaurus site to GitHub Pages
- **URL**: If deploying to a user/org site, `https://<user>.github.io/`. If a project site, `https://<user>.github.io/<repo>/`.

### Setup Required:
1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
2. **Update Docusaurus Config** if using a project site:
   ```ts
   // docusaurus.config.ts
   const config: Config = {
     url: 'https://<user>.github.io',
     baseUrl: '/<repo>/',
     // ...
   };
   ```

## Deployment Workflow

### Publish Docker Image
```bash
git checkout main
git merge develop
git push origin main
# Triggers Docker Hub deployment
```

### Deploy to GitHub Pages
```bash
git checkout main
# push a commit that triggers the pages workflow per .github/workflows/docusaurus-deploy.yml
```

## Features

✅ **Docker Hub**: Docusaurus site containerized and pushed to Docker Hub  
✅ **GitHub Pages**: Docusaurus site deployed to GitHub Pages  
✅ **Automatic**: Deployments trigger on push to configured branches  
✅ **Isolated**: Each deployment works independently  

## Troubleshooting

### Docker Hub Issues:
- Check Docker Hub credentials in GitHub Secrets
- Verify repository exists on Docker Hub
- Check Actions tab for build logs

### GitHub Pages Issues:
- Ensure GitHub Pages is enabled in repository settings
- If a project site, ensure `baseUrl` matches the repository name
- Verify the branch name and triggers in the workflow file

## Manual Deployment

Both workflows support manual triggering:
1. Go to **Actions** tab
2. Select the workflow
3. Click **Run workflow**
