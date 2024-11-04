'use client'

import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

export default function HelloWorldPage() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    getHelloWorldMessage()
  }, [])

  const getHelloWorldMessage = async () => {
    const res = await api.get<{ message: string }>('/hello-world')
    setMessage(res.data.message)
  }

  return <p>{message}</p>
}
