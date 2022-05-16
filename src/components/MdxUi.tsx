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
} from '@chakra-ui/react'

export const chakraUiComponents = {
  h1: (props: HeadingProps) => <Heading as='h1' mb={2} size='xl' {...props} />,
  h2: (props: HeadingProps) => <Heading as='h2' mb={2} size='lg' {...props} />,
  h3: (props: HeadingProps) => (
    <Heading as='h3' mb={2} size='md' fontSize='2xl' {...props} />
  ),
  h4: (props: HeadingProps) => <Heading as='h4' mb={2} size='md' {...props} />,
  h5: (props: HeadingProps) => <Heading as='h5' mb={2} size='sm' {...props} />,
  h6: (props: HeadingProps) => <Heading as='h6' mb={2} size='xs' {...props} />,
  p: (props: TextProps) => <Text lineHeight={2} fontSize='lg' {...props} />,
  img: (props: ImageProps) => (
    <Image data-zoomable placeholder='blurred' {...props} />
  ),
  inlineCode: (props: CodeProps) => (
    <Code colorScheme='gray' variant='solid' {...props} />
  ),
  a: (props: LinkProps) => <Link color='teal' {...props} />,
  blockquote: (props: TextProps) => (
    <Box
      as='blockquote'
      borderLeft='5px solid gray'
      bg='gray.100'
      mx={[0, null, 5]}
      my={[2, null, 5]}
      px={5}
      py={2}
      fontStyle='italic'
      {...props}
    />
  ),
}
