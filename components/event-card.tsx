"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, CalendarDays, Verified, Crown } from "lucide-react"
import { motion } from "framer-motion"

export type EventCardProps = {
  id: string
  title: string
  imageUrl: string
  date: string
  location: string
  tier?: "VIP" | "General"
  price: string
  verified?: boolean
}

export function EventCard({
  id,
  title,
  imageUrl,
  date,
  location,
  tier = "General",
  price,
  verified = true,
}: EventCardProps) {
  const img = imageUrl || "/images/hero-concert.png"
  return (
    <motion.div
      initial={{ y: 0, boxShadow: "0 6px 18px rgba(2,6,23,0.06)" }}
      whileHover={{ y: -8, boxShadow: "0 14px 40px rgba(2,6,23,0.08)" }}
      transition={{ duration: 0.2, ease: [0.22, 0.9, 0.1, 1] }}
      className="h-full"
    >
      <Card className="overflow-hidden rounded-xl h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={img || "/placeholder.svg"}
            alt={`${title} hero image`}
            fill
            className="object-cover transition-transform duration-200 ease-out"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-tight truncate">{title}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="size-4" />
                  {date}
                </span>
                <span className="inline-flex items-center gap-1 truncate">
                  <MapPin className="size-4" />
                  <span className="truncate">{location}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {verified && (
                <Badge variant="secondary" className="gap-1 rounded-md">
                  <Verified className="size-3" />
                  {"Verified"}
                </Badge>
              )}
              <div className="text-sm">
                <span className="font-medium">{price}</span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Badge className="rounded-md" variant="outline">
              {tier === "VIP" ? <Crown className="mr-1 size-3" /> : null}
              {tier}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link href={`/event/${id}`} className="w-full">
            <Button className="w-full h-10 rounded-md" style={{ background: "#2563EB" }}>
              {"Buy Ticket"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
