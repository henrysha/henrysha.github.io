import { useMemo } from 'react'
import Layout from '@/components/Layout/Layout'
import { chakraUiComponents } from '@/components/MdxUi'
import { Profile } from '@/components/Profile'
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import { format, parse } from 'date-fns'
import { ko } from 'date-fns/locale'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { BlogBreadcrumb } from '@/components/BlogBreadcrumb'
import { TocItem } from '@/types/tableOfContents'
import { TableOfContents } from '@/components/TableOfContents'
import { useActiveId } from '@/hooks/useActiveId'

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
    fields: {
      slug: string
    }
    tableOfContents: {
      items: TocItem[]
    }
    body: string
    timeToRead: number
  }
}

const getListOfIds = (items: TocItem[] | undefined): string[] => {
  if (!items) return []
  return items
    .flatMap((item) => [item.url.slice(1), ...getListOfIds(item.items)])
    .filter((v) => v)
}

const BlogPost = ({ data }: PageProps<DataProps>) => {
  const tocIds = useMemo(() => {
    return getListOfIds(data.mdx.tableOfContents.items)
  }, [data.mdx.tableOfContents.items])
  const activeId = useActiveId(tocIds)

  return (
    <Layout>
      <Grid maxW='1194px' m='0 auto' px={[4, null, 10]} gap={5}>
        <BlogBreadcrumb
          category={data.mdx.frontmatter.category}
          title={data.mdx.frontmatter.title}
        />
        <Profile
          isBlogPost
          createdDate={format(
            parse(data.mdx.frontmatter.date_updated, 'yyyy-MM-dd hh:mm', 0),
            'PPP',
            { locale: ko }
          )}
          minutesRead={data.mdx.timeToRead}
        />
        <Heading as='h1' size='xl' mb={0}>
          {data.mdx.frontmatter.title}
        </Heading>
        <Grid
          gap={10}
          templateColumns={{ base: '1fr', md: '1fr 200px', lg: '1fr 300px' }}
        >
          <GridItem maxW='calc(100vw - 2em)'>
            <MDXProvider components={chakraUiComponents}>
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </MDXProvider>
          </GridItem>
          <GridItem>
            <Box position='fixed' p={2} bgColor='gray.100'>
              <Heading as='h4' size='sm' mb={2}>
                Table of Contents
              </Heading>
              <TableOfContents
                items={data.mdx.tableOfContents.items}
                activeId={activeId}
              />
            </Box>
          </GridItem>
        </Grid>
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
      fields {
        slug
      }
      tableOfContents
      body
      timeToRead
    }
  }
`

export default BlogPost
