import Layout from '@/components/Layout'
import { chakraUiComponents } from '@/components/MdxUi'
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useRef } from 'react'

import './blog-post.scss'

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
    headings: {
      value: string
      depth: number
    }[]
    body: string
  }
}

const getSlugFromValue = (value: string) =>
  value
    .match(/[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9 ]*/)
    ?.join('')
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('.', '')

const BlogPost = ({ data }: PageProps<DataProps>) => {
  return (
    <Layout>
      <Grid gap={2} templateColumns={{ base: '1fr', md: '4fr 1fr' }}>
        <GridItem>
          <MDXProvider components={chakraUiComponents}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </GridItem>
        <GridItem>
          <UnorderedList position='fixed' listStyleType='none' spacing={5}>
            {data.mdx.headings.map(({ value }) => {
              const slug = getSlugFromValue(value)
              return (
                <ListItem key={slug}>
                  <Link href={`#${slug}`}>{value}</Link>
                </ListItem>
              )
            })}
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
      headings {
        value
        depth
      }
      body
    }
  }
`

export default BlogPost
