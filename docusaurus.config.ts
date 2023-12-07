import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Resonate',
  tagline: ' dead simple programming model for modern applications',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.resonatehq.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'resonatehq', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

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
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root (ref: https://docusaurus.io/docs/next/docs-introduction#home-page-docs)
          // sidebarPath: '',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: '',
        },
        blog: false,
        theme: {
          customCss: [
            './static/css/custom.css',
            './static/css/boxicons.min.css'
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Resonate',
      logo: {
        alt: 'Resonate Logo',
        src: 'img/logo.svg',
        href: 'https://www.resonatehq.io',
        target: '_self',
        width: 40,
      },
      items: [
        {
          href: 'https://github.com/resonatehq/resonate',
          html: `<i class="bx bx-md bxl-github"></i>`,
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          html: `
            <a href="https://twitter.com/resonatehqio" target="_blank" rel="noopener noreferrer" aria-label="Resonate Twitter">
              <i class="bx bx-sm bxl-twitter"></i>
            </a>
          `,
        },
        {
          html: `
            <a href="https://resonatehqcommunity.slack.com" target="_blank" rel="noopener noreferrer" aria-label="Resonate Slack">
              <i class="bx bx-sm bxl-slack"></i>
            </a>
          `,
        },
        {
          html: `
            <a href="https://github.com/resonatehq/resonate" target="_blank" rel="noopener noreferrer" aria-label="Resonate GitHub">
              <i class="bx bx-sm bxl-github"></i>
            </a>
          `,
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ResonateHQ, Inc.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
