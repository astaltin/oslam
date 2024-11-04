'use client'

import '@fontsource/geist-sans'
import './globals.css'

import { useEffect, useState } from 'react'
import LandingPage from './LandingPage'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isGettingStarted, setIsGettingStarted] = useState(false)

  useEffect(() => {
    document.title = 'OSLAM Billing'

    const hasId = localStorage.getItem('oslambs_id')
    if (!hasId) {
      setIsGettingStarted(true)
    }
  }, [])

  return (
    <html lang="en">
      <body className="antialiased">{!isGettingStarted ? children : <LandingPage />}</body>
    </html>
  )
}
