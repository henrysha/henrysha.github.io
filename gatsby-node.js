const { format, zonedTimeToUtc } = require('date-fns-tz')

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      reactRuntime: 'automatic',
    },
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const createdDate = node.frontmatter['date created'] || new Date()

    const formattedDate = format(
      zonedTimeToUtc(createdDate, node.frontmatter.timezone || 'Asia/Seoul'),
      'yyyy/MM/dd'
    )

    const value = `${formattedDate}/${node.frontmatter.title.replaceAll(
      ' ',
      '-'
    )}`

    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    {
      allMdx {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)
  data.allMdx.nodes.forEach((node) => {
    const slug = node.fields.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/blog-post.tsx`),
      context: { slug: slug },
    })
  })
}
