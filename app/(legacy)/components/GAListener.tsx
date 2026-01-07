// 'use client'

// import { usePathname, useSearchParams } from 'next/navigation'
// import { useEffect } from 'react'

// export default function GAListener() {
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     if (!window.gtag) return

//     const url = pathname + searchParams.toString()
//     window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
//       page_path: url,
//     })
//   }, [pathname, searchParams])

//   return null
// }



'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function GAListener() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Increments on every navigation
  const navIdRef = useRef(0)

  useEffect(() => {
    if (!window.gtag) return

    navIdRef.current += 1
    const navId = navIdRef.current

    const query = searchParams.toString()
    const page_path = query ? `${pathname}?${query}` : pathname

    let attempts = 0
    const maxAttempts = 10

    const interval = setInterval(() => {
      if (navId !== navIdRef.current) {
        clearInterval(interval)
        return
      }

      attempts++

      if (document.title) {
        window.gtag?.('event', 'page_view', {
          page_path,
          page_location: window.location.href,
          page_title: document.title,
        })
        clearInterval(interval)
      }

      if (attempts >= maxAttempts) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [pathname, searchParams])

  return null
}
