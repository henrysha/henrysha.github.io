import {
  Grid,
  Heading,
  HStack,
  Tag,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import { graphql, PageProps } from 'gatsby'
import { zonedTimeToUtc } from 'date-fns-tz'
import Layout from '@/components/Layout'
import { THEME } from '@/constants/theme'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

deckDeckGoHighlightElement()

type DataProps = {
  allMdx: {
    nodes: [
      {
        frontmatter: {
          category: string
          tag: [string]
          title: string
          date_updated: string
          timezone: string
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
      <Grid
        p={5}
        gap={10}
        alignItems='start'
        justifyContent='center'
        templateColumns='min(100%,1280px)'
      >
        {data.allMdx.nodes.map((node) => (
          <Grid gap={2}>
            <Heading size={titleSize}>{node.frontmatter.title}</Heading>
            <Text fontSize='md' color='gray.600'>
              {node.excerpt}
            </Text>
            <Text fontSize='md' color='black'>
              Last Modified:&nbsp;
              {formatDistanceToNow(
                zonedTimeToUtc(
                  node.frontmatter.date_updated,
                  node.frontmatter.timezone
                ),
                { addSuffix: true, locale: ko }
              )}
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
          date_updated
          timezone
        }
        timeToRead
        excerpt(pruneLength: 200, truncate: true)
      }
      totalCount
    }
  }
`

export default IndexPage
