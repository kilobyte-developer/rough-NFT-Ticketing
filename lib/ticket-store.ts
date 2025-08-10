"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { nanoid } from "nanoid"
import { sampleEvents } from "./sample-data"

type PendingMint = {
  eventId: string
  attendees: { name: string; email: string }[]
  method: "upi" | "card" | "crypto"
  total: number
  currency: string
} | null

type Ticket = {
  id: string
  eventTitle: string
  date: string
  imageUrl: string
  ownerEmail: string
  tier: string
  canResell: boolean
}

type Store = {
  tickets: Ticket[]
  listed: { ticketId: string; price: number }[]
  pendingMint: PendingMint
  setPendingMint: (p: PendingMint) => void
  completeMint: () => void
  resaleCount: () => number
  listForResale: (ticketId: string, price: number) => void
}

export const useTicketStore = create<Store>()(
  persist(
    (set, get) => ({
      tickets: [],
      listed: [],
      pendingMint: null,
      setPendingMint: (p) => set({ pendingMint: p }),
      completeMint: () => {
        const p = get().pendingMint
        if (!p) return
        const ev = sampleEvents.find((e) => e.id === p.eventId)
        const date = ev?.date ?? "TBD"
        const imageUrl = ev?.imageUrl ?? "/images/abstract.png"
        const eventTitle = ev?.title ?? "Event"
        const newTickets: Ticket[] = p.attendees.map((a) => ({
          id: nanoid(8),
          eventTitle,
          date,
          imageUrl,
          ownerEmail: a.email,
          tier: ev?.tiers?.[0]?.name ?? "General",
          canResell: true,
        }))
        set((s) => ({ tickets: [...s.tickets, ...newTickets], pendingMint: null }))
      },
      resaleCount: () => get().listed.length,
      listForResale: (ticketId, price) => set((s) => ({ listed: [...s.listed, { ticketId, price }] })),
    }),
    { name: "ticket-store" },
  ),
)
