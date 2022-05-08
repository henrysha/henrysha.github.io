import { PropsWithChildren } from 'react'

import { Grid } from '@chakra-ui/react'

import Header from './Header'

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Grid h='100vh' templateRows={['80px auto', '88px auto']}>
      <Header />
      {children}
    </Grid>
  )
}

export default Layout
