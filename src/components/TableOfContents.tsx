import { Link, ListItem, UnorderedList } from '@chakra-ui/react'
import { TocItem } from '@/types/tableOfContents'
import { Fragment } from 'react'

export const TableOfContents = ({
  items,
  activeId,
}: {
  items: TocItem[]
  activeId: string
}) => {
  return (
    <UnorderedList listStyleType='none'>
      {items.map(({ url, title, items: subItems }: TocItem) => {
        const isActive = `#${activeId}` === url
        return (
          <Fragment key={url}>
            <ListItem
              color={isActive ? 'black' : 'gray'}
              borderLeft={isActive ? '3px solid black' : '2px solid gray'}
              pl={2}
              py={2}
            >
              <Link href={url}>{title}</Link>
            </ListItem>
            {subItems && (
              <TableOfContents items={subItems} activeId={activeId} />
            )}
          </Fragment>
        )
      })}
    </UnorderedList>
  )
}
