"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { useTicketStore } from "@/lib/ticket-store"
import Link from "next/link"

export function MintModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const intervalRef = useRef<any>(null)
  const { pendingMint, completeMint } = useTicketStore()

  const steps = useMemo(
    () => [
      "Payment processed",
      pendingMint?.method === "crypto" ? "Wallet tx signed" : "Wallet prepared",
      "Minting on chain",
      "Success",
    ],
    [pendingMint?.method],
  )

  useEffect(() => {
    if (open) {
      setStep(0)
      setLoading(true)
      let s = 0
      intervalRef.current = setInterval(() => {
        s += 1
        setStep(s)
        if (s >= steps.length - 1) {
          clearInterval(intervalRef.current)
          setLoading(false)
          // Complete mint and save tickets to store
          completeMint()
        }
      }, 900)
    }
    return () => clearInterval(intervalRef.current)
  }, [open, steps.length, completeMint])

  const progress = (step / (steps.length - 1)) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{"Processing your ticket… Do not close this window"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex items-center gap-2 text-sm">
            {steps.map((label, idx) => (
              <div key={label} className="flex items-center">
                <div
                  className={`size-8 rounded-full flex items-center justify-center text-xs ${
                    idx <= step ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                  }`}
                  aria-label={label}
                >
                  {idx < steps.length - 1 ? idx + 1 : <CheckCircle2 className="size-4" />}
                </div>
                {idx < steps.length - 1 && <div className="w-6 h-px bg-muted mx-2" />}
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-md">
            <Progress value={progress} className="h-2" />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 size-5 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #6EE7B7 0%, #60A5FA 70%)",
                boxShadow: "0 0 10px rgba(96,165,250,0.6)",
              }}
              animate={{ x: `${progress}%` }}
              transition={{ ease: [0.22, 0.9, 0.1, 1], duration: 0.3 }}
            />
          </div>

          {step >= steps.length - 1 ? (
            <div className="grid gap-3">
              <div className="text-emerald-600 font-medium">{"Ticket Minted! View in My Tickets"}</div>
              <div className="text-sm text-muted-foreground">
                {"Tx: "}
                <code className="px-1 py-0.5 rounded bg-muted">0xabc…123</code>
                <a
                  href="https://polygonscan.com/tx/0xabc"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 ml-2"
                >
                  {"View"} <ExternalLink className="size-3" />
                </a>
              </div>
              <Link href="/tickets" className="w-full">
                <Button className="w-full rounded-md" style={{ background: "#2563EB" }}>
                  {"Go to My Tickets"}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">{steps[step]}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
