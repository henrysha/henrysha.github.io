import { useEffect, useRef } from 'react'

export const Utterance = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')

    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('repo', 'henrysha/henrysha.github.io')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', 'true')

    ref.current?.appendChild(script)
  }, [])

  return <div className='comments' ref={ref} />
}
