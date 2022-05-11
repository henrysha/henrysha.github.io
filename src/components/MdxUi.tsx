import {
  Heading,
  Text,
  Image,
  HeadingProps,
  TextProps,
  ImageProps,
  Code,
  CodeProps,
  Link,
  LinkProps,
  Box,
  Icon,
  HStack,
} from '@chakra-ui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'

export const chakraUiComponents = {
  h1: (props: HeadingProps) => (
    <HStack>
      <Heading as='h1' paddingY='5' size='xl' {...props} />
      <Link href={`#${props.id}`}>
        <Icon as={FaExternalLinkAlt} />
      </Link>
    </HStack>
  ),
  h2: (props: HeadingProps) => (
    <HStack>
      <Heading as='h2' paddingY='5' size='lg' {...props} />
      <Link href={`#${props.id}`}>
        <Icon as={FaExternalLinkAlt} />
      </Link>
    </HStack>
  ),
  h3: (props: HeadingProps) => (
    <HStack>
      <Heading as='h3' paddingY='5' size='md' {...props} />
      <Link href={`#${props.id}`}>
        <Icon as={FaExternalLinkAlt} />
      </Link>
    </HStack>
  ),
  h4: (props: HeadingProps) => (
    <HStack>
      <Heading as='h4' paddingY='5' size='sm' {...props} />
      <Link href={`#${props.id}`}>
        <Icon as={FaExternalLinkAlt} />
      </Link>
    </HStack>
  ),
  h5: (props: HeadingProps) => (
    <HStack>
      <Heading as='h5' paddingY='5' size='xs' {...props} />
      <Link href={`#${props.id}`}>
        <Icon as={FaExternalLinkAlt} />
      </Link>
    </HStack>
  ),
  h6: (props: HeadingProps) => (
    <HStack>
      <Heading as='h6' paddingY='5' size='xs' {...props} />
      <Link href={`#${props.id}`}>
        <Icon as={FaExternalLinkAlt} />
      </Link>
    </HStack>
  ),
  p: (props: TextProps) => <Text lineHeight={2} fontSize='lg' {...props} />,
  img: (props: ImageProps) => <Image marginBottom='4' {...props} />,
  inlineCode: (props: CodeProps) => (
    <Code colorScheme='gray' variant='solid' {...props} />
  ),
  a: (props: LinkProps) => <Link color='teal' {...props} />,
  blockquote: (props: TextProps) => (
    <Box
      borderLeft='5px solid gray'
      bg='gray.100'
      m={5}
      p={5}
      fontStyle='italic'
      {...props}
    />
  ),
}
