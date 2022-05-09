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
    const createdDate = node.frontmatter.date_created || new Date()

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
