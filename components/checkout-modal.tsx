"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard, Wallet, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MintModal } from "./mint-modal"
import type { Attendee } from "./add-attendees-modal"
import { useTicketStore } from "@/lib/ticket-store"

export type CheckoutModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventId: string
  attendees: Attendee[]
  price: number
  currency: string
}

export function CheckoutModal({ open, onOpenChange, eventId, attendees, price, currency }: CheckoutModalProps) {
  const [method, setMethod] = useState<"upi" | "card" | "crypto">("upi")
  const [details, setDetails] = useState({ upi: "", card: "", wallet: "" })
  const [processing, setProcessing] = useState(false)
  const [mintOpen, setMintOpen] = useState(false)
  const { toast } = useToast()
  const { setPendingMint } = useTicketStore()

  useEffect(() => {
    if (!open) {
      setMethod("upi")
      setDetails({ upi: "", card: "", wallet: "" })
      setProcessing(false)
    }
  }, [open])

  const pay = async () => {
    setProcessing(true)
    // Simulate fiat/crypto payment then open mint modal
    await new Promise((r) => setTimeout(r, 900))
    // Save pending mint payload to store
    setPendingMint({
      eventId,
      attendees,
      method,
      total: price,
      currency,
    })
    onOpenChange(false)
    setMintOpen(true)
    toast({
      title: "Payment processed",
      description: method === "crypto" ? "Wallet transaction signed." : "Fiat payment confirmed.",
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{"Checkout"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="rounded-lg border p-3 bg-muted/20">
              <div className="text-sm text-muted-foreground">{"Total"}</div>
              <div className="text-2xl font-semibold">
                {currency} {price.toFixed(2)}
              </div>
            </div>

            <Tabs defaultValue="upi" onValueChange={(v) => setMethod(v as any)}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="upi" className="gap-2">
                  <Smartphone className="size-4" />
                  {"UPI"}
                </TabsTrigger>
                <TabsTrigger value="card" className="gap-2">
                  <CreditCard className="size-4" />
                  {"Card"}
                </TabsTrigger>
                <TabsTrigger value="crypto" className="gap-2">
                  <Wallet className="size-4" />
                  {"Crypto"}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upi" className="mt-3">
                <Label htmlFor="upi-id">{"UPI ID"}</Label>
                <Input
                  id="upi-id"
                  placeholder="you@upi"
                  value={details.upi}
                  onChange={(e) => setDetails((d) => ({ ...d, upi: e.target.value }))}
                  className="h-10 rounded-md"
                />
              </TabsContent>
              <TabsContent value="card" className="mt-3">
                <Label htmlFor="card-number">{"Card Number"}</Label>
                <Input
                  id="card-number"
                  placeholder="4242 4242 4242 4242"
                  value={details.card}
                  onChange={(e) => setDetails((d) => ({ ...d, card: e.target.value }))}
                  className="h-10 rounded-md"
                />
              </TabsContent>
              <TabsContent value="crypto" className="mt-3">
                <div className="text-sm text-muted-foreground">
                  {"Connect MetaMask then confirm the transaction in your wallet."}
                </div>
              </TabsContent>
            </Tabs>

            <Button style={{ background: "#2563EB" }} className="h-11 rounded-md" onClick={pay} disabled={processing}>
              {processing ? "Processing…" : "Pay & Mint"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <MintModal open={mintOpen} onOpenChange={setMintOpen} />
    </>
  )
}
