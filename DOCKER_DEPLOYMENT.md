# Docker Hub & GitHub Pages Deployment

This repository includes deployment workflows for both Docker Hub and GitHub Pages.

## Docker Hub Deployment

### Workflow: `.github/workflows/docker-publish.yml`
- **Triggers**: Push to `main` branch
- **Purpose**: Build and push Hugo site to Docker Hub
- **Repository**: `surendocker/jaqstack-website:latest`

### Setup Required:
1. **Docker Hub Repository**: Create `surendocker/jaqstack-website`
2. **GitHub Secrets**:
   - `DOCKERHUB_USERNAME`: `surendocker`
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

## GitHub Pages Deployment

### Workflow: `.github/workflows/docusaurus-deploy.yml`
- **Triggers**: Push to `features/docusaurus-site` branch
- **Purpose**: Deploy Docusaurus site to GitHub Pages
- **URL**: `https://yourusername.github.io/jaqstack-website`

### Setup Required:
1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
2. **Update Docusaurus Config** (in `features/docusaurus-site` branch):
   ```typescript
   // docusaurus.config.ts
   const config: Config = {
     url: 'https://yourusername.github.io',
     baseUrl: '/jaqstack-website/',
     // ... rest of config
   };
   ```

## Deployment Workflow

### For Hugo Site (Docker):
```bash
git checkout main
git merge develop
git push origin main
# Triggers Docker Hub deployment
```

### For Docusaurus Site (GitHub Pages):
```bash
git checkout features/docusaurus-site
git push origin features/docusaurus-site
# Triggers GitHub Pages deployment
```

## Features

✅ **Docker Hub**: Hugo site containerized and pushed to Docker Hub  
✅ **GitHub Pages**: Docusaurus site deployed to GitHub Pages  
✅ **Automatic**: Both deployments trigger on push to respective branches  
✅ **Isolated**: Each deployment system works independently  

## Troubleshooting

### Docker Hub Issues:
- Check Docker Hub credentials in GitHub Secrets
- Verify repository exists on Docker Hub
- Check Actions tab for build logs

### GitHub Pages Issues:
- Ensure GitHub Pages is enabled in repository settings
- Check `baseUrl` matches your repository name
- Verify the branch name in the workflow file

## Manual Deployment

Both workflows support manual triggering:
1. Go to **Actions** tab
2. Select the workflow
3. Click **Run workflow**
