import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export const BlogBreadcrumb = ({
  category,
  title,
}: {
  category?: string
  title?: string
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>🏠</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>{category}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink isCurrentPage>{title}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
