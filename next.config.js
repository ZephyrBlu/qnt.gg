const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  exportPathMap: async () => ({
    '/': { page: '/' },
    '/analyzing-sc2': { page: '/blog/analyzing-sc2' },
  }),
});