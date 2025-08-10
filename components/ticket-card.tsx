"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export type TicketCardProps = {
  id: string
  eventTitle: string
  date: string
  imageUrl: string
  ownerEmail: string
  tier: string
  canResell?: boolean
}

export function TicketCard({ id, eventTitle, date, imageUrl, ownerEmail, tier, canResell = true }: TicketCardProps) {
  return (
    <motion.div initial={false} whileHover={{ rotateY: 4 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="overflow-hidden rounded-xl h-full">
        <div className="relative aspect-[4/3]">
          <Image src={imageUrl || "/placeholder.svg"} alt={`${eventTitle} art`} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold leading-tight truncate">{eventTitle}</h3>
          <div className="text-sm text-muted-foreground mt-1">{date}</div>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className="rounded-md">
              {tier}
            </Badge>
            <Badge variant="secondary" className="rounded-md truncate max-w-[160px]">
              {ownerEmail}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Link href={`/qr/${id}`} className="flex-1">
            <Button className="w-full h-10 rounded-md bg-transparent" variant="outline">
              {"Show QR"}
            </Button>
          </Link>
          {canResell && (
            <Link href={`/tickets/${id}?resell=1`} className="flex-1">
              <Button className="w-full h-10 rounded-md" style={{ background: "#2563EB" }}>
                {"Resell"}
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
