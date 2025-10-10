import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Introducing JAQ Stack',
  tagline:
  'JAQ Stack is a pre-built, open-source tech stack that helps developers start fast like a rapid application development (RAD) toolkit for the modern web. ' +
  'It removes the pain of wiring up the frontend, backend, and databases, giving you a ready-to-run foundation built on Java, Angular/JavaScript, and SQL or NoSQL. ' +
  'Focus on building features, not boilerplate - JAQ Stack handles the integration so your team can move from idea to prototype in days, not weeks.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://jaqstack.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'JAQ Stack', // Usually your GitHub org/user name.
  projectName: 'JAQ Stack Official Website', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          editUrl:
            'https://github.com/jaqstack/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/jaqstack/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // plugins: [
  //   [
  //     require.resolve("@easyops-cn/docusaurus-search-local"),
  //     {
  //       hashed: true,
  //       language: ["en"],
  //       highlightSearchTermsOnTargetPage: true,
  //       explicitSearchResultPath: true,
  //     },
  //   ],
  // ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'JAQ Stack',
      logo: {
        alt: 'JaqStack Logo',
        src: 'img/jaqstack-logo.svg',
      },
      items: [
        {to: '/about', label: 'About', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/examples', label: 'Example Stacks', position: 'left'},      
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/jaqstack',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/TBbXkz5rkN',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/jaqstack',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Examples Stacks',
              to: '/examples',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/jaqstack',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} JAQ Stack.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // Your Algolia credentials
      appId: 'GROS89QWRY',
      apiKey: '96778409f5927678b51bd1a1d1e0709c',
      indexName: 'JAQ Stack Website',
      askAi: 'YOUR_ALGOLIA_ASSISTANT_ID', // TODO: Replace with your Algolia Assistant ID
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
