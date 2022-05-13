import { useEffect, useState } from 'react'

export const useActiveId = (itemIds: string[]) => {
  const [activeId, setActiveId] = useState(``)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds.forEach((id) => {
      const dom = document.getElementById(id)
      if (!dom) return
      observer.observe(dom)
    })

    return () => {
      itemIds.forEach((id) => {
        const dom = document.getElementById(id)
        if (!dom) return
        observer.unobserve(dom)
      })
    }
  }, [itemIds])

  return activeId
}
