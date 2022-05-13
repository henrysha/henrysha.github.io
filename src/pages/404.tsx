import Layout from '@/components/Layout/Layout'
import { Grid, Heading } from '@chakra-ui/react'

import 'normalize.css'

const NotFoundPage = () => {
  return (
    <Layout>
      <Grid placeItems='center' h='100%'>
        <Heading>404 Not Found</Heading>
      </Grid>
    </Layout>
  )
}

export default NotFoundPage
