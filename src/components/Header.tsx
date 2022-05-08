import { Flex, Heading, HStack, Button, Icon, Text } from '@chakra-ui/react'
import { CgProfile } from 'react-icons/cg'
import { FaHome } from 'react-icons/fa'

const Header = () => (
  <Flex justifyContent='space-between' alignItems='center' p='5'>
    <Heading>Henry's Devlog</Heading>
    <HStack spacing={0}>
      <Button variant='ghost' gap='2' alignItems='center' size='md'>
        <Icon as={FaHome} />
        <Text display={['none', 'inline']}>Home</Text>
      </Button>
      <Button variant='ghost' gap='2' alignItems='center' size='md'>
        <Icon as={CgProfile} />
        <Text display={['none', 'inline']}>About</Text>
      </Button>
    </HStack>
  </Flex>
)
export default Header
