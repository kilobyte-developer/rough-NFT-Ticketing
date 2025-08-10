import { NextResponse } from "next/server"

// Simple in-memory cache for verification simulation
const cache = new Map<string, { used?: boolean; lastOwner: string; ts: number }>()
const TTL_MS = 30_000

export async function POST(req: Request) {
  const { tokenId, ownerEmail } = await req.json()

  const now = Date.now()
  const key = tokenId
  const cached = cache.get(key)

  // If we have fresh cache, return instantly
  if (cached && now - cached.ts < TTL_MS) {
    if (cached.used) {
      return NextResponse.json({ status: "fail", reason: "Ticket already used" })
    }
    // Mark used upon successful scan
    cache.set(key, { ...cached, used: true, ts: now })
    return NextResponse.json({
      status: "ok",
      mode: "cache",
      name: ownerEmail?.split("@")?.[0] ?? "Guest",
      tier: "General",
    })
  }

  // Simulate on-chain lookup fallback
  await new Promise((r) => setTimeout(r, 2500))
  // Populate cache after "on-chain"
  cache.set(key, { used: false, lastOwner: ownerEmail, ts: Date.now() })
  return NextResponse.json({
    status: "ok",
    mode: "on-chain",
    name: ownerEmail?.split("@")?.[0] ?? "Guest",
    tier: "General",
  })
}
