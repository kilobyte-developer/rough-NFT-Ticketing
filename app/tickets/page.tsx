"use client"

import { TopNavigation } from "@/components/top-navigation"
import { TicketCard } from "@/components/ticket-card"
import { useTicketStore } from "@/lib/ticket-store"

export default function Page() {
  const { tickets } = useTicketStore()

  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-semibold">{"My Tickets"}</h1>
        {tickets.length === 0 ? (
          <div className="mt-6 rounded-xl border bg-white p-8 text-center text-muted-foreground">
            {"No tickets yet. Explore events to get started."}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((t) => (
              <TicketCard
                key={t.id}
                id={t.id}
                eventTitle={t.eventTitle}
                date={t.date}
                imageUrl={t.imageUrl}
                ownerEmail={t.ownerEmail}
                tier={t.tier}
                canResell={t.canResell}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
