"use client"

import { useEffect, useRef, useState } from "react"
import jsQR from "jsqr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, XCircle } from "lucide-react"

type VerifyResult =
  | { status: "ok"; mode: "cache" | "on-chain"; name: string; tier: string; photo?: string }
  | { status: "fail"; reason: string }

export function ScannerView() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<VerifyResult | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let stream: MediaStream
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
          setScanning(true)
        }
      } catch (e) {
        toast({ title: "Camera permission needed", variant: "destructive" })
      }
    }
    start()
    return () => {
      stream?.getTracks()?.forEach((t) => t.stop())
      setScanning(false)
    }
  }, [toast])

  useEffect(() => {
    let raf: number
    const tick = () => {
      if (!videoRef.current || !canvasRef.current) {
        raf = requestAnimationFrame(tick)
        return
      }
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) {
        raf = requestAnimationFrame(tick)
        return
      }
      const w = (canvas.width = video.videoWidth)
      const h = (canvas.height = video.videoHeight)
      if (w && h) {
        ctx.drawImage(video, 0, 0, w, h)
        const imageData = ctx.getImageData(0, 0, w, h)
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" })
        if (code?.data) {
          try {
            const parsed = JSON.parse(code.data)
            verify(parsed.tokenId, parsed.ownerEmail)
          } catch {
            // ignore
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    if (scanning) {
      raf = requestAnimationFrame(tick)
    }
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanning])

  const verify = async (tokenId: string, ownerEmail: string) => {
    setScanning(false)
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ tokenId, ownerEmail }),
    })
    const data: VerifyResult = await res.json()
    setResult(data)
    if (data.status === "ok") {
      toast({
        title: `Verified — Welcome, ${data.name}`,
        description: `Mode: ${data.mode === "cache" ? "Verifying… (cache)" : "Verifying… (on-chain)"}`,
      })
    } else {
      toast({ title: "Invalid / Ticket already used. Ask for support.", variant: "destructive" })
    }
  }

  return (
    <div className="w-full grid gap-4">
      <div className="relative w-full aspect-[3/4] bg-black rounded-2xl overflow-hidden">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="w-2/3 max-w-xs aspect-square border-2 border-emerald-400 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
        </div>
        <div className="absolute bottom-3 w-full text-center text-white text-sm">
          {"Scan Ticket QR — Hold steady, verify within 5s"}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {result && (
        <Card className={`${result.status === "ok" ? "border-emerald-500" : "border-red-500"}`}>
          <CardContent className="p-4 flex items-center gap-3">
            {result.status === "ok" ? (
              <CheckCircle2 className="size-6 text-emerald-600" />
            ) : (
              <XCircle className="size-6 text-red-600" />
            )}
            <div className="flex-1">
              <div className="font-medium">
                {result.status === "ok"
                  ? `Verified — Welcome, ${result.name}`
                  : "Invalid / Ticket already used. Ask for support."}
              </div>
              <div className="text-sm text-muted-foreground">
                {result.status === "ok" ? `Tier: ${result.tier}` : result.reason}
              </div>
            </div>
            <Button variant="outline" onClick={() => setScanning(true)} className="rounded-md">
              {"Scan Again"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
