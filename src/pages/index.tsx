import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Tag,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import { graphql, PageProps } from 'gatsby'
import Layout from '@/components/Layout'
import { THEME } from '@/constants/theme'

deckDeckGoHighlightElement()

type DataProps = {
  allMdx: {
    nodes: [
      {
        frontmatter: {
          category: [string]
          tag: [string]
          title: string
          date_updated: string
        }
        timeToRead: number
        excerpt: string
      }
    ]
    totalCount: number
  }
}

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const titleSize = useBreakpointValue(['lg', 'xl'])

  if (process.env.NODE_ENV === 'production') {
    return (
      <Grid placeItems='center' h='100vh'>
        <Heading>UNDER CONSTRUCTION</Heading>
      </Grid>
    )
  }

  return (
    <Layout>
      <Grid p={5} gap={10} alignItems='start'>
        {data.allMdx.nodes.map((node) => (
          <Grid gap={2}>
            <Heading size={titleSize}>{node.frontmatter.title}</Heading>
            <Text fontSize='md' color='gray.600'>
              {node.excerpt}
            </Text>
            <Text fontSize='md' color='black'>
              Last updated: {node.frontmatter.date_updated}
            </Text>
            <HStack>
              {node.frontmatter.tag.map((_tag) => (
                <Tag colorScheme={THEME.pointColorScheme}>{_tag}</Tag>
              ))}
            </HStack>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetPosts {
    allMdx(sort: { fields: frontmatter___date_updated, order: ASC }) {
      nodes {
        frontmatter {
          category
          tag
          title
          date_updated(fromNow: true)
        }
        timeToRead
        excerpt(pruneLength: 200, truncate: true)
      }
      totalCount
    }
  }
`

export default IndexPage
