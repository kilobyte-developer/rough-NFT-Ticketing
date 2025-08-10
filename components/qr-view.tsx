"use client"

import { useEffect, useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Share2, WalletCards, ShieldAlert } from "lucide-react"
import { motion } from "framer-motion"

export function QRView({
  tokenId,
  eventName,
  ownerEmail,
}: {
  tokenId: string
  eventName: string
  ownerEmail: string
}) {
  const [copied, setCopied] = useState(false)
  const value = JSON.stringify({ tokenId, ownerEmail })

  useEffect(() => {
    let t: any
    if (copied) t = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-center">
        <h1 className="text-xl font-semibold">{eventName}</h1>
        <p className="text-sm text-muted-foreground">{ownerEmail}</p>
      </div>
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-2xl border"
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="bg-white p-4 rounded-2xl shadow-[0_14px_40px_rgba(2,6,23,0.08)]">
          <QRCodeCanvas value={value} size={256} includeMargin />
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {"Token"}:{" "}
        <button
          className="underline underline-offset-2"
          onClick={async () => {
            await navigator.clipboard.writeText(tokenId)
            setCopied(true)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            navigator.clipboard.writeText(tokenId)
            setCopied(true)
          }}
        >
          {tokenId}
        </button>
        {copied && <span className="ml-2 text-emerald-600">{"Copied"}</span>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="rounded-md bg-transparent">
          <WalletCards className="mr-2 size-4" />
          {"Add to Wallet"}
        </Button>
        <Button variant="outline" className="rounded-md bg-transparent">
          <Share2 className="mr-2 size-4" />
          {"Share"}
        </Button>
        <Button variant="outline" className="rounded-md bg-transparent">
          <ShieldAlert className="mr-2 size-4" />
          {"Report Fraud"}
        </Button>
      </div>
    </div>
  )
}
