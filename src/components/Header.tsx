import {
  Flex,
  Heading,
  HStack,
  Button,
  Icon,
  Text,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react'
import { CgProfile } from 'react-icons/cg'
import { FaHome } from 'react-icons/fa'

const Header = () => {
  const headerSize = useBreakpointValue(['lg', 'xl'])
  const buttonSize = useBreakpointValue(['md', 'lg'])

  return (
    <Flex justifyContent='space-between' alignItems='center' p='5'>
      <Heading size={headerSize}>Henry's Devlog</Heading>
      <HStack spacing={[0, 2]}>
        <Link href='/' _hover={{ textDecoration: 'none' }}>
          <Button
            variant='ghost'
            gap='2'
            alignItems='center'
            size={buttonSize}
            p={[0, 2]}
          >
            <Icon as={FaHome} />
            <Text display={['none', 'inline']}>Home</Text>
          </Button>
        </Link>
        {/* <Link href='/about' _hover={{ textDecoration: 'none' }}> */}
        <Button
          variant='ghost'
          gap='2'
          alignItems='center'
          size={buttonSize}
          p={[0, 2]}
        >
          <Icon as={CgProfile} />
          <Text display={['none', 'inline']}>About</Text>
        </Button>
        {/* </Link> */}
      </HStack>
    </Flex>
  )
}
export default Header
