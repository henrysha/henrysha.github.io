import {
  Grid,
  Heading,
  HStack,
  Icon,
  Link,
  Tag,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { graphql, PageProps } from 'gatsby'
import { zonedTimeToUtc } from 'date-fns-tz'
import Layout from '@/components/Layout'
import { THEME } from '@/constants/theme'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { StaticImage } from 'gatsby-plugin-image'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

type DataProps = {
  allMdx: {
    nodes: [
      {
        frontmatter: {
          category: string
          tag: string[]
          title: string
          date_created: string
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
        templateRows={{ base: '5em 1fr', md: '1fr' }}
        templateColumns={{ base: '100%', md: '15em 1fr' }}
      >
        <Grid gap={5}>
          <HStack gap={2}>
            <StaticImage
              src='../images/profile.jpeg'
              alt='profile'
              width={75}
              height={75}
              placeholder='blurred'
              style={{ borderRadius: '100%' }}
            />
            <Grid justifyItems='left' alignItems='end'>
              <Text>Written by:</Text>
              <HStack>
                {/* <Link href='/about'> */}
                <Text>@henrysha</Text>
                {/* </Link> */}
                <Link href='https://linkedin.com/in/henryseongwookha'>
                  <Icon as={FaLinkedin} />
                </Link>
                <Link href='https://github.com/henrysha'>
                  <Icon as={FaGithub} />
                </Link>
                <Link href='https://twitter.com/HenrySHa'>
                  <Icon as={FaTwitter} />
                </Link>
              </HStack>
            </Grid>
          </HStack>
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
                    node.frontmatter.date_created,
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
      sort: { fields: frontmatter___date_created, order: DESC }
      limit: 20
    ) {
      nodes {
        frontmatter {
          category
          tag
          title
          date_created
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
