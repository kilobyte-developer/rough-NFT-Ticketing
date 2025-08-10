"use client"

import { useMemo, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { TopNavigation } from "@/components/top-navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ResaleModal } from "@/components/resale-modal"
import { useTicketStore } from "@/lib/ticket-store"

export default function Page() {
  const { id } = useParams()
  const [resellOpen, setResellOpen] = useState(useSearchParams().get("resell") === "1")
  const { tickets } = useTicketStore()
  const ticket = useMemo(() => tickets.find((t) => t.id === id), [tickets, id])

  if (!ticket) {
    return (
      <div className="min-h-svh bg-[#F8FAFC]">
        <TopNavigation />
        <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10">
          <div className="rounded-xl border bg-white p-8 text-center">{"Ticket not found."}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="relative w-full aspect-[16/9]">
            <Image src={ticket.imageUrl || "/placeholder.svg"} alt="NFT art" fill className="object-cover" />
          </div>
          <div className="p-5">
            <h1 className="text-2xl font-semibold">{ticket.eventTitle}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="rounded-md">
                {"Owned"}
              </Badge>
              <Badge variant="outline" className="rounded-md">
                {ticket.tier}
              </Badge>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {"Owner"}: {ticket.ownerEmail}
            </div>
            <div className="mt-4 flex gap-2">
              <Link href={`/qr/${ticket.id}`}>
                <Button variant="outline" className="rounded-md bg-transparent">
                  {"Show QR"}
                </Button>
              </Link>
              {ticket.canResell && (
                <Button className="rounded-md" style={{ background: "#2563EB" }} onClick={() => setResellOpen(true)}>
                  {"Resell"}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-xl border bg-white p-5">
            <h3 className="font-semibold">{"Metadata"}</h3>
            <div className="mt-2 text-sm grid gap-1">
              <div>
                {"Token ID"}: <code className="bg-muted rounded px-1 py-0.5">{ticket.id}</code>
              </div>
              <div>{"Network"}: Polygon (testnet)</div>
              <div>{"Royalties"}: 5% to organizer</div>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <h3 className="font-semibold">{"Perks"}</h3>
            <ul className="mt-2 text-sm list-disc pl-5 text-muted-foreground">
              <li>{"Fast entry lane"}</li>
              <li>{"Lounge access"}</li>
            </ul>
          </div>
        </div>
      </main>
      <ResaleModal open={resellOpen} onOpenChange={setResellOpen} ticketId={ticket.id} />
    </div>
  )
}
