# JaqStack Website

A modern documentation website built with Docusaurus, TypeScript, and the classic template.

## Features

- 📚 **Documentation**: Comprehensive guides and tutorials
- 📝 **Blog**: Regular updates and insights
- 🎨 **Modern Design**: Clean and responsive interface
- ⚡ **Fast Performance**: Optimized for speed
- 🔧 **TypeScript**: Full TypeScript support
- 📱 **Mobile Friendly**: Responsive design

## Getting Started

### Prerequisites

- Node.js 18.0 or above
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd jaqstack-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the site for production
- `npm run serve` - Serve the built site locally
- `npm run clear` - Clear the Docusaurus cache
- `npm run deploy` - Deploy the site to GitHub Pages

## Project Structure

```
jaqstack-website/
├── blog/                 # Blog posts
├── docs/                 # Documentation
├── src/
│   ├── components/       # React components
│   ├── css/             # Global styles
│   └── pages/           # Additional pages
├── static/              # Static assets
├── docusaurus.config.ts # Docusaurus configuration
├── sidebars.ts          # Documentation sidebar
└── tsconfig.json        # TypeScript configuration
```

## Customization

### Site Configuration

Edit `docusaurus.config.ts` to customize:
- Site title and tagline
- Navigation menu
- Footer links
- Theme colors
- Social media links

### Search Configuration

The site is configured with Algolia DocSearch. To enable search:

1. **Apply for Algolia DocSearch** (free for open source):
   - Visit [Algolia DocSearch](https://docsearch.algolia.com/apply/)
   - Submit your site URL and requirements
   - Wait for approval (usually 1-2 weeks)

2. **Update configuration**:
   - Replace `YOUR_APP_ID` with your Algolia application ID
   - Replace `YOUR_SEARCH_API_KEY` with your search API key
   - Update `indexName` to match your Algolia index

3. **Alternative: Local Search**:
   If you prefer local search without external dependencies, you can install `@docusaurus/theme-search-algolia` and configure it locally.

### Styling

Customize the appearance by editing:
- `src/css/custom.css` - Global styles
- Component-specific CSS modules

### Content

- Add documentation in the `docs/` folder
- Create blog posts in the `blog/` folder
- Add custom pages in `src/pages/`

## Deployment

### GitHub Pages

1. Set up GitHub Pages in your repository settings
2. Update the `url` and `baseUrl` in `docusaurus.config.ts`
3. Run `npm run deploy`

### Other Platforms

The built site in the `build/` folder can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support, please open an issue on GitHub or contact our team.
