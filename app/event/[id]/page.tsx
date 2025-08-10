"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { TopNavigation } from "@/components/top-navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AddAttendeesModal, type Attendee } from "@/components/add-attendees-modal"
import { CheckoutModal } from "@/components/checkout-modal"
import { sampleEvents } from "@/lib/sample-data"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const event = sampleEvents.find((e) => e.id === params?.id)
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const { toast } = useToast()

  if (!event) {
    return (
      <div className="min-h-svh bg-[#F8FAFC]">
        <TopNavigation />
        <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10">
          <div className="rounded-xl border bg-white p-8 text-center">{"Event not found."}</div>
        </main>
      </div>
    )
  }

  const startCheckout = (rows: Attendee[]) => {
    setAttendees(rows)
    setCheckoutOpen(true)
  }

  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="grid gap-4">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={event.imageUrl || "/placeholder.svg"}
              alt={`${event.title} hero`}
              fill
              className="object-cover"
            />
          </div>
          <div className="rounded-xl border bg-white p-5">
            <h1 className="text-2xl font-semibold">{event.title}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="rounded-md">
                {"Verified Organizer"}
              </Badge>
              <Badge variant="outline" className="rounded-md">
                {event.location}
              </Badge>
            </div>
            <p className="mt-4 text-muted-foreground">
              {
                "Join us for an unforgettable experience with live performances, talks, and more. Secure your spot today."
              }
            </p>
          </div>
          <div className="rounded-xl border bg-white">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-5">{"What is included?"}</AccordionTrigger>
                <AccordionContent className="px-5">
                  {"Access to main stage, lounge, and partner booths."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-5">{"Refund policy"}</AccordionTrigger>
                <AccordionContent className="px-5">
                  {"All sales are final. Tickets can be resold via platform."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-xl border bg-white p-5">
            <h2 className="font-semibold">{"Ticket Tiers"}</h2>
            <div className="mt-3 grid gap-3">
              {event.tiers.map((t) => (
                <div key={t.name} className="rounded-lg border p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {"Supply left"}: {t.supply}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">${t.price}</div>
                    <Button
                      onClick={() => {
                        toast({ title: `${t.name} reserved` })
                      }}
                      variant="outline"
                      className="rounded-md"
                    >
                      {"Reserve"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <AddAttendeesModal onConfirm={startCheckout} />
              <Button variant="outline" className="rounded-md bg-transparent" onClick={() => router.push("/settings")}>
                {"Connect Wallet (for advanced users) or Continue with Email"}
              </Button>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <h3 className="font-semibold">{"Perks"}</h3>
            <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5">
              <li>{"Fast entry"}</li>
              <li>{"Ownership & verified royalties"}</li>
              <li>{"Resale on platform only (secure escrow)"}</li>
            </ul>
          </div>
        </div>
      </main>
      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        eventId={event.id}
        attendees={attendees}
        price={attendees.length * event.tiers[0].price}
        currency={"USD"}
      />
    </div>
  )
}
