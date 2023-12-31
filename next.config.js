const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n.ts'
);

module.exports = withNextIntl({
  // Other Next.js configuration ...
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'], // Add 'tailwindui.com' to the list of allowed domains
  },
  headers: () => [
    {
      source: '/:dashboard*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
});
