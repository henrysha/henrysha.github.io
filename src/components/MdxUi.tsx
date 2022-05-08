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
} from '@chakra-ui/react'

export const chakraUiComponents = {
  h1: (props: HeadingProps) => (
    <Heading as='h1' paddingY='5' size='xl' {...props} />
  ),
  h2: (props: HeadingProps) => (
    <Heading as='h2' paddingY='5' size='lg' {...props} />
  ),
  h3: (props: HeadingProps) => (
    <Heading as='h3' paddingY='5' size='md' {...props} />
  ),
  h4: (props: HeadingProps) => (
    <Heading as='h4' paddingY='5' size='sm' {...props} />
  ),
  h5: (props: HeadingProps) => (
    <Heading as='h5' paddingY='5' size='xs' {...props} />
  ),
  h6: (props: HeadingProps) => (
    <Heading as='h6' paddingY='5' size='xs' {...props} />
  ),
  p: (props: TextProps) => <Text lineHeight={2} fontSize='lg' {...props} />,
  img: (props: ImageProps) => <Image marginBottom='4' {...props} />,
  code: (props: CodeProps) => (
    <Code colorScheme='gray' variant='solid' {...props} />
  ),
  a: (props: LinkProps) => <Link color='blue' {...props} />,
  blockquote: (props: TextProps) => (
    <Text
      borderLeft='5px solid gray'
      bg='gray.100'
      m={5}
      p={5}
      fontStyle='italic'
      {...props}
    />
  ),
}
