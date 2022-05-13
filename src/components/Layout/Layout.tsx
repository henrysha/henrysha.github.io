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
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <title>{metadata.site.siteMetadata.title}</title>
      </Helmet>
      <Grid h='100vh' templateRows={['80px auto', '88px auto']}>
        <Header />
        {children}
      </Grid>
    </>
  )
}

export default Layout
