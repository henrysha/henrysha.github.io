import Layout from '@/components/Layout'
import { chakraUiComponents } from '@/components/MdxUi'
import { Grid, GridItem, Link, ListItem, UnorderedList } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import './blog-post.scss'

type TocItem = {
  url: string
  title: string
  items?: TocItem[]
}

type DataProps = {
  mdx: {
    frontmatter: {
      category: string
      date_created: string
      date_updated: string
      tag: string[]
      title: string
      timezone: string
    }
    tableOfContents: {
      items: TocItem[]
    }
    body: string
  }
}

const TableOfContents = ({ items }: { items: TocItem[] }) => {
  return (
    <>
      {items.map(({ url, title, items: subItems }: TocItem) => (
        <>
          <ListItem key={url}>
            <Link href={url}>{title}</Link>
          </ListItem>
          {subItems && (
            <UnorderedList listStyleType='none' spacing={5}>
              <TableOfContents items={subItems} />
            </UnorderedList>
          )}
        </>
      ))}
    </>
  )
}

const BlogPost = ({ data }: PageProps<DataProps>) => {
  return (
    <Layout>
      <Grid gap={2} templateColumns={{ base: '1fr', md: '4fr 1fr' }}>
        <GridItem p={10}>
          <MDXProvider components={chakraUiComponents}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </GridItem>
        <GridItem>
          <UnorderedList position='fixed' listStyleType='none' spacing={5}>
            <TableOfContents items={data.mdx.tableOfContents.items} />
          </UnorderedList>
        </GridItem>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetPost($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        category
        date_created
        date_updated
        tag
        title
        timezone
      }
      tableOfContents
      body
    }
  }
`

export default BlogPost
