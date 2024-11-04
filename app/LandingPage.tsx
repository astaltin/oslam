'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { ArrowUpRightIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import Image from 'next/image'

export default function LandingPage() {
  const handleGettingStarted = () => {
    const hasId = localStorage.getItem('oslambs_id')
    if (!hasId) {
      localStorage.setItem('oslambs_id', nanoid())

      // WARNING: temporary solution. This must be replaced with a better one,
      // instead of forcing the entire page to do a full reload.
      location.reload()
    }
  }

  return (
    <main className="mx-auto max-w-[50ch] px-3 flex flex-col gap-10">
      <div className="animate-in fade-in slide-in-from-top duration-1000">
        <div className="py-3 pt-5 flex gap-2 items-center opacity-80">
          <Image src="/oslam-logo.png" width={32} height={32} alt="oslam_logo" />
          <Separator className="h-[22.5px]" orientation="vertical" />
          <span className="w-[14ch] font-bold text-base leading-tight">OSLAM</span>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
        <section className="py-5 flex flex-col gap-y-6">
          <div className="flex flex-col gap-2">
            <Badge className="w-fit">New</Badge>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Automate your hospital billing process with OSLAM&apos;s billing system
            </h1>
          </div>

          <p className="text-muted-foreground">
            Say goodbye to manual errors and inefficiencies—our system streamlines billing, allowing
            you to focus on what matters most: patient care.
          </p>

          <Button className="w-fit font-semibold" type="button" onClick={handleGettingStarted}>
            Get Started
            <ArrowUpRightIcon strokeWidth={2.75} />
          </Button>
        </section>
      </div>
    </main>
  )
}
