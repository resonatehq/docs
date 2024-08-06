import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Resonate',
  tagline: ' dead simple programming model for modern applications',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.resonatehq.io',
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
        gtag: {
          trackingID: 'G-0660YY8LZF',
          anonymizeIP: true,
        }
      } satisfies Preset.Options,
    ],
  ],
  scripts: [
    {
      src: '/scripts/fullstory.js',
      async: true,
    },
  ],

  themeConfig: {
    image: 'img/echo.png', // used for link previews
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Resonate',
      logo: {
        alt: 'Resonate Logo',
        src: 'img/echo-logo.svg',
        href: 'https://www.resonatehq.io',
        target: '_self',
        width: 40,
      },
      items: [
        {
          to: 'https://docs.resonatehq.io',
          label: 'Docs',
          position: 'right',
          target: '_self',
        },
        {
          to: 'https://blog.resonatehq.io',
          label: 'Blog',
          position: 'right',
          target: '_self',
        },
        {
          href: 'https://resonatehq.io/subscribe',
          html: '<button class="button button--secondary" style="border-radius: 20px">Subscribe</button>',
          position: 'right',
        },
        {
          href: 'https://github.com/resonatehq/resonate',
          html: '<i class="bx bx-md bxl-github"></i>',
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
            <a href="https://join.slack.com/t/resonatehqcommunity/shared_invite/zt-22h6iu4m8-2Tl9M25IZduNU_sBcPteMg" target="_blank" rel="noopener noreferrer" aria-label="Resonate Slack">
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
