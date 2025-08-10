"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Timer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTicketStore } from "@/lib/ticket-store"

export function ResaleModal({
  open,
  onOpenChange,
  ticketId,
  royaltyPct = 5,
  feePct = 2.5,
  capPerWallet = 2,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  ticketId: string
  royaltyPct?: number
  feePct?: number
  capPerWallet?: number
}) {
  const [price, setPrice] = useState<number | "">("")
  const [confirmDelay, setConfirmDelay] = useState(3)
  const { toast } = useToast()
  const { listForResale, resaleCount } = useTicketStore()

  useEffect(() => {
    let t: any
    if (open) {
      setConfirmDelay(3)
      t = setInterval(() => setConfirmDelay((c) => (c > 0 ? c - 1 : 0)), 1000)
    }
    return () => clearInterval(t)
  }, [open])

  const estRoyalty = typeof price === "number" ? (price * royaltyPct) / 100 : 0
  const platformFee = typeof price === "number" ? (price * feePct) / 100 : 0

  const onConfirm = () => {
    const count = resaleCount()
    if (count >= capPerWallet) {
      toast({
        title: "Resale cap reached",
        description: `Limit per-wallet resale: ${capPerWallet}.`,
        variant: "destructive",
      })
      return
    }
    if (!price || typeof price !== "number" || price <= 0) {
      toast({ title: "Invalid price", variant: "destructive" })
      return
    }
    listForResale(ticketId, price)
    toast({ title: "Ticket listed", description: "Your ticket is listed on the platform." })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{"Resell Ticket"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <Label htmlFor="price">{"Set Price (USD)"}</Label>
          <Input
            id="price"
            type="number"
            min={1}
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="h-10 rounded-md"
          />
          <div className="rounded-lg border p-3 bg-muted/20 text-sm">
            <div>
              {"Platform fee"}: {feePct}% = ${platformFee.toFixed(2)}
            </div>
            <div>
              {"Royalty to organizer"}: {royaltyPct}% = ${estRoyalty.toFixed(2)}
            </div>
          </div>
          <Alert>
            <Timer className="size-4" />
            <AlertTitle>{"Confirm listing"}</AlertTitle>
            <AlertDescription>
              {`This ticket will be listed on platform. Limit per-wallet resale: ${capPerWallet}.`}
            </AlertDescription>
          </Alert>
          <Button
            disabled={confirmDelay > 0}
            onClick={onConfirm}
            className="rounded-md"
            style={{ background: "#2563EB" }}
          >
            {confirmDelay > 0 ? `Confirm in ${confirmDelay}s` : "Confirm Listing"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
