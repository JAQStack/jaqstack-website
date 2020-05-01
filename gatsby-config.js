module.exports = {
  siteMetadata: {
    title: 'JAQ Stack Official',
    description: 'Build websites with Java, Angular, SQL or NoSQL',
    keywords: 'java,angular,typescript,sql,nosql,mysql,mongodb,software,development,technology,pogramming,developer',
  },
  pathPrefix: ``,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Carbon Design Gatsby Theme',
        short_name: 'Gatsby Theme Carbon',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0062ff',
        display: 'browser',
      },
    },
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        repository: {
          baseUrl:
            'https://github.com/carbon-design-system/gatsby-theme-carbon',
          subDirectory: '/packages/example',
        },
      },
    },
  ],
};
