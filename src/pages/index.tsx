import { Grid } from '@chakra-ui/react'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import Header from '@/components/Header'

deckDeckGoHighlightElement()

const IndexPage = () => {
  return (
    <Grid>
      <Header />
    </Grid>
  )
}

export default IndexPage
