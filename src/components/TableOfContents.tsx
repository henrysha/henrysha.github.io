import { Link, ListItem, UnorderedList } from '@chakra-ui/react'
import { TocItem } from '@/types/tableOfContents'

export const TableOfContents = ({ items }: { items: TocItem[] }) => {
  return (
    <UnorderedList listStyleType='none' spacing={5}>
      {items.map(({ url, title, items: subItems }: TocItem) => (
        <>
          <ListItem key={url}>
            <Link href={url}>{title}</Link>
          </ListItem>
          {subItems && <TableOfContents items={subItems} />}
        </>
      ))}
    </UnorderedList>
  )
}
