import Layout from '@/components/Layout'
import { chakraUiComponents } from '@/components/MdxUi'
import { Profile } from '@/components/Profile'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import { format, parse } from 'date-fns'
import { ko } from 'date-fns/locale'
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

const TableOfContents = ({ items }: { items: TocItem[] }) => {
  return (
    <UnorderedList listStyleType='none' spacing={5}>
      {items.map(({ url, title, items: subItems }: TocItem) => (
        <>
          <ListItem key={url}>
            <Link href={url}>{title}</Link>
          </ListItem>
          {subItems && <TableOfContents items={subItems} />}
        </>
      ))}
    </UnorderedList>
  )
}

const BlogPost = ({ data }: PageProps<DataProps>) => {
  return (
    <Layout>
      <Grid maxW='1600px' m='0 auto' px={[4, null, 10]} gap={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>🏠</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{data.mdx.frontmatter.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage>
              {data.mdx.frontmatter.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
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
          gap={2}
          templateColumns={{ base: '1fr', md: '1fr 200px', lg: '1fr 300px' }}
        >
          <GridItem maxW='100vw'>
            <MDXProvider components={chakraUiComponents}>
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </MDXProvider>
          </GridItem>
          <GridItem>
            <Box position='fixed' p={2} bgColor='gray.100'>
              <Heading as='h4' size='sm' mb={2}>
                Table of Contents
              </Heading>
              <TableOfContents items={data.mdx.tableOfContents.items} />
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
