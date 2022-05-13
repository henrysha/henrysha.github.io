import {
  Grid,
  Heading,
  HStack,
  Link,
  Tag,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { graphql, PageProps } from 'gatsby'
import { zonedTimeToUtc } from 'date-fns-tz'
import Layout from '@/components/Layout/Layout'
import { THEME } from '@/constants/theme'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Profile } from '@/components/Profile'

type DataProps = {
  allMdx: {
    nodes: [
      {
        frontmatter: {
          category: string
          tag: string[]
          title: string
          date_updated: string
          timezone: string
        }
        fields: {
          slug: string
        }
        timeToRead: number
        excerpt: string
      }
    ]
    totalCount: number
  }
  allFile: {
    group: {
      fieldValue: string
    }[]
  }
}

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const titleSize = useBreakpointValue(['lg', 'xl'])

  return (
    <Layout>
      <Grid
        p={5}
        gap={10}
        alignItems='start'
        justifyContent='center'
        templateRows={{ base: '5em 1fr', md: '1fr' }}
        templateColumns={{ base: '100%', md: '15em 1fr' }}
      >
        <Grid gap={5}>
          <Profile />
          <Grid gap={2} display={{ base: 'none', md: 'grid' }}>
            <Heading size='sm'>Tags</Heading>
            <HStack>
              {data.allFile.group.map(({ fieldValue }) => (
                <Tag colorScheme={THEME.pointColorScheme}>{fieldValue}</Tag>
              ))}
            </HStack>
          </Grid>
        </Grid>
        <Grid justifyItems='center'>
          {data.allMdx.nodes.map((node) => (
            <Grid gap={2} maxW='60em'>
              <Link href={node.fields.slug}>
                <Heading size={titleSize}>{node.frontmatter.title}</Heading>
              </Link>
              <Text fontSize='md' color='gray.600'>
                {node.excerpt}
              </Text>
              <Text fontSize='md' color='black'>
                {formatDistanceToNow(
                  zonedTimeToUtc(
                    node.frontmatter.date_updated,
                    node.frontmatter.timezone || 'Asia/Seoul'
                  ),
                  { addSuffix: true, locale: ko }
                )}
              </Text>
              <HStack>
                {node.frontmatter.tag.map((_tag) => (
                  <Tag colorScheme={THEME.pointColorScheme}>{_tag}</Tag>
                ))}
                <Text fontSize='md' color='gray'>
                  {node.timeToRead} min read
                </Text>
              </HStack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetPosts {
    allMdx(
      sort: { fields: frontmatter___date_updated, order: DESC }
      limit: 20
    ) {
      nodes {
        frontmatter {
          category
          tag
          title
          date_updated
          timezone
        }
        fields {
          slug
        }
        timeToRead
        excerpt(pruneLength: 200, truncate: true)
      }
      totalCount
    }
    allFile(filter: { extension: { in: "md" } }, limit: 2000) {
      group(field: childMdx___frontmatter___tag) {
        fieldValue
      }
    }
  }
`

export default IndexPage
