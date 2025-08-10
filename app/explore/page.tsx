"use client"

import { useEffect, useState } from "react"
import { TopNavigation } from "@/components/top-navigation"
import { EventCard } from "@/components/event-card"
import { EventFilters } from "@/components/event-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { sampleEvents, type EventItem } from "@/lib/sample-data"

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<EventItem[]>([])

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setEvents(sampleEvents)
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [])

  const apply = ({ q, city, categories }: { q: string; city: string; date: string; categories: string[] }) => {
    setLoading(true)
    setTimeout(() => {
      const f = sampleEvents.filter((e) => {
        const okQ = q ? e.title.toLowerCase().includes(q.toLowerCase()) : true
        const okC = city ? e.city.toLowerCase().includes(city.toLowerCase()) : true
        const okTags = categories.length ? categories.includes(e.category) : true
        return okQ && okC && okTags
      })
      setEvents(f)
      setLoading(false)
    }, 250)
  }

  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8">
        <EventFilters onApply={apply} />
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border overflow-hidden bg-white">
                  <Skeleton className="aspect-[16/9]" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-2/3" />
                    <div className="mt-2 flex gap-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))
            : events.map((e) => <EventCard key={e.id} {...e} />)}
        </div>
      </main>
    </div>
  )
}
