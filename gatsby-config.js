const { format, zonedTimeToUtc } = require('date-fns-tz')

module.exports = {
  siteMetadata: {
    title: `Henry's Devlog`,
    siteUrl: `https://henrysha.github.io`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-5BEX80QN7K'],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            stage: 2,
            features: {
              'nesting-rules': true,
            },
          }),
        ],
      },
    },
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allMdx {
            nodes {
              fields {
                slug
              }
              frontmatter {
                date_updated
                timezone
              }
            }
          }
        }
          `,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMdx: { nodes: allPosts },
        }) => {
          const postsMap = allPosts.reduce((acc, node) => {
            const {
              fields: { slug },
            } = node
            acc[`/${slug}`] = node.frontmatter

            return acc
          }, {})

          return allPages.map((page) => {
            return { ...page, ...postsMap[page.path] }
          })
        },
        serialize: ({ path, date_updated, timezone }) => {
          const lastmod = zonedTimeToUtc(
            date_updated,
            timezone || 'Asia/Seoul'
          ).toUTCString()
          return {
            url: path,
            lastmod,
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/posts`,
      },
      __key: 'posts',
    },
    'gatsby-plugin-tsconfig-paths',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-highlight-code',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-external-links',
          'gatsby-remark-numbered-footnotes',
          'gatsby-remark-embedder',
          'gatsby-remark-images-zoom',
        ],
      },
    },
  ],
}
