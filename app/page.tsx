'use client'

import { useEffect, useState } from 'react'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasId = localStorage.getItem('oslambs_id')
    if (hasId) setIsLoading(false)
  }, [])

  if (isLoading) return null

  return <h1>Home</h1>
}
