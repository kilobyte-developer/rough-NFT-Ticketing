"use client"

import { TopNavigation } from "@/components/top-navigation"
import { QRView } from "@/components/qr-view"
import { useParams } from "next/navigation"
import { useTicketStore } from "@/lib/ticket-store"

export default function Page() {
  const { id } = useParams()
  const { tickets } = useTicketStore()
  const ticket = tickets.find((t) => t.id === id)

  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[600px] px-4 sm:px-6 py-8">
        {ticket ? (
          <QRView tokenId={ticket.id} ownerEmail={ticket.ownerEmail} eventName={ticket.eventTitle} />
        ) : (
          <div className="rounded-xl border bg-white p-8 text-center">{"Ticket not found."}</div>
        )}
      </main>
    </div>
  )
}
