const fs = require('fs').promises;
const path = require('path');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  exportPathMap: async () => {
      const postsDir = path.join(process.cwd(), 'pages/blog');
      const pageRoutes = await fs.readdir(postsDir).then((posts) => {
        const routes = {};
        posts.forEach((name) => {
          if (
              name === 'index.js'
              || (
                process.env.NODE_ENV === 'production'
                && name.slice(0, 4) === 'WIP-'
              )
            ) {
            return;
          }
          // discard file extension
          const noExt = name.split('.')[0];
          routes[`/${noExt}`] = {
            page: `/blog/${noExt}`,
          };
        });
        return routes;
      });

      return {
        '/': { page: '/' },
        ...pageRoutes,
      };
    },
});