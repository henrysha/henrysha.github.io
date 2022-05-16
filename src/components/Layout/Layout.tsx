import { PropsWithChildren } from 'react'

import { Grid } from '@chakra-ui/react'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import Header from '../Header'

import './Layout.css'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

deckDeckGoHighlightElement()

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const metadata = useStaticQuery(graphql`
    query MetadataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <title>{metadata.site.siteMetadata.title}</title>
        <meta property='og:url' content={metadata.site.siteMetadata.siteUrl} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={metadata.site.siteMetadata.title} />
        <meta
          property='og:description'
          content={metadata.site.siteMetadata.description}
        />
        <meta property='og:site_name' content="Henry's Devlog" />
        <meta property='og:locale' content='ko_KR' />
        <meta
          name='naver-site-verification'
          content='4a0749c1ec3ef911306acb3711efe7f2e63524d9'
        />
      </Helmet>
      <Grid h='100vh' templateRows={['80px auto', '88px auto']}>
        <Header />
        {children}
      </Grid>
    </>
  )
}

export default Layout
