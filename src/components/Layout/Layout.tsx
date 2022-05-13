import { PropsWithChildren } from 'react'

import { Grid } from '@chakra-ui/react'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import Header from '../Header'

import './Layout.css'

deckDeckGoHighlightElement()

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Grid h='100vh' templateRows={['80px auto', '88px auto']}>
        <Header />
        {children}
      </Grid>
    </>
  )
}

export default Layout
