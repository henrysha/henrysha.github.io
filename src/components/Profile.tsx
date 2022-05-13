import { Grid, HStack, Icon, Link, Text } from '@chakra-ui/react'
import { StaticImage } from 'gatsby-plugin-image'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

type Props = {
  isBlogPost?: boolean
  createdDate?: string
  minutesRead?: number
}

export const Profile = ({ isBlogPost, createdDate, minutesRead }: Props) => {
  return (
    <HStack gap={2}>
      <StaticImage
        src='../images/profile.jpeg'
        alt='profile'
        width={75}
        height={75}
        placeholder='blurred'
        style={{
          borderRadius: '100%',
        }}
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
        {isBlogPost && (
          <Text color='gray.600'>
            {createdDate} | {minutesRead} mins read
          </Text>
        )}
      </Grid>
    </HStack>
  )
}
