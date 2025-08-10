"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { createEvent } from "@/lib/mock-actions"

type Tier = { name: string; price: number; supply: number; perWallet: number }

export function AdminWizard() {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [imageUrl, setImageUrl] = useState("/images/hero-concert.png")
  const [tiers, setTiers] = useState<Tier[]>([{ name: "General", price: 25, supply: 200, perWallet: 4 }])
  const [royalty, setRoyalty] = useState(5)
  const [platformOnly, setPlatformOnly] = useState(true)
  const [resaleCap, setResaleCap] = useState(2)
  const [mintSchedule, setMintSchedule] = useState<"immediate" | "scheduled" | "whitelist">("immediate")
  const { toast } = useToast()

  const next = () => setStep((s) => Math.min(4, s + 1))
  const prev = () => setStep((s) => Math.max(0, s - 1))

  const addTier = () => setTiers((t) => [...t, { name: "", price: 0, supply: 0, perWallet: 1 }])
  const removeTier = (i: number) => setTiers((t) => t.filter((_, idx) => idx !== i))

  const deploy = async () => {
    await createEvent({
      title,
      desc,
      imageUrl,
      tiers,
      royalty,
      platformOnly,
      resaleCap,
      mintSchedule,
    })
    toast({ title: "Event deployed", description: "Your event is live on testnet." })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{"Event Creator Wizard"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {step === 0 && (
              <div className="grid gap-3">
                <Label htmlFor="title">{"Title"}</Label>
                <Input
                  id="title"
                  className="h-10 rounded-md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Label htmlFor="desc">{"Description"}</Label>
                <Textarea id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
                <Label htmlFor="hero">{"Hero image URL"}</Label>
                <Input
                  id="hero"
                  className="h-10 rounded-md"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>{"Tiers & Supply"}</Label>
                  <Button variant="outline" onClick={addTier} className="rounded-md bg-transparent">
                    <Plus className="mr-2 size-4" />
                    {"Add tier"}
                  </Button>
                </div>
                {tiers.map((t, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2">
                    <div className="col-span-3">
                      <Label htmlFor={`tname-${i}`}>Name</Label>
                      <Input
                        id={`tname-${i}`}
                        value={t.name}
                        onChange={(e) =>
                          setTiers((ts) => ts.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)))
                        }
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor={`tprice-${i}`}>Price</Label>
                      <Input
                        id={`tprice-${i}`}
                        type="number"
                        value={t.price}
                        onChange={(e) =>
                          setTiers((ts) =>
                            ts.map((x, idx) => (idx === i ? { ...x, price: Number(e.target.value) } : x)),
                          )
                        }
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor={`tsupply-${i}`}>Supply</Label>
                      <Input
                        id={`tsupply-${i}`}
                        type="number"
                        value={t.supply}
                        onChange={(e) =>
                          setTiers((ts) =>
                            ts.map((x, idx) => (idx === i ? { ...x, supply: Number(e.target.value) } : x)),
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`tper-${i}`}>Per wallet</Label>
                      <Input
                        id={`tper-${i}`}
                        type="number"
                        value={t.perWallet}
                        onChange={(e) =>
                          setTiers((ts) =>
                            ts.map((x, idx) => (idx === i ? { ...x, perWallet: Number(e.target.value) } : x)),
                          )
                        }
                      />
                    </div>
                    <div className="col-span-1 flex items-end">
                      <Button variant="ghost" className="text-red-500" onClick={() => removeTier(i)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-3">
                <Label>{"Royalties & Resale policy"}</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="royalty">Royalty %</Label>
                    <Input
                      id="royalty"
                      type="number"
                      value={royalty}
                      onChange={(e) => setRoyalty(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cap">Resale cap per wallet</Label>
                    <Input
                      id="cap"
                      type="number"
                      value={resaleCap}
                      onChange={(e) => setResaleCap(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="text-sm">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={platformOnly} onChange={(e) => setPlatformOnly(e.target.checked)} />
                    {"Platform-only resale"}
                  </label>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="grid gap-3">
                <Label>{"Mint Schedule"}</Label>
                <Tabs defaultValue={mintSchedule} onValueChange={(v) => setMintSchedule(v as any)}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="immediate">{"Immediate"}</TabsTrigger>
                    <TabsTrigger value="scheduled">{"Scheduled"}</TabsTrigger>
                    <TabsTrigger value="whitelist">{"Whitelist"}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
            {step === 4 && (
              <div className="grid gap-3">
                <div className="text-sm text-muted-foreground">{"Review & Deploy — Estimated gas: ~0.002 MATIC"}</div>
                <div className="rounded-lg border p-3 text-sm">
                  <div>
                    <b>Title</b>: {title || "—"}
                  </div>
                  <div>
                    <b>Tiers</b>: {tiers.map((t) => `${t.name} ($${t.price}, ${t.supply})`).join(", ") || "—"}
                  </div>
                  <div>
                    <b>Royalty</b>: {royalty}% • <b>Resale cap</b>: {resaleCap}
                  </div>
                  <div>
                    <b>Schedule</b>: {mintSchedule}
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={prev} disabled={step === 0} className="rounded-md bg-transparent">
                {"Back"}
              </Button>
              {step < 4 ? (
                <Button onClick={next} className="rounded-md" style={{ background: "#2563EB" }}>
                  {"Next"}
                </Button>
              ) : (
                <Button onClick={deploy} className="rounded-md" style={{ background: "#2563EB" }}>
                  {"Review & Deploy"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Live Preview */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{"Live Preview"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={imageUrl || "/images/hero-conference.png"}
                alt="Preview hero image"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-xl font-semibold">{title || "Event Title"}</div>
            <div className="flex flex-wrap items-center gap-2">
              {tiers.map((t, i) => (
                <Badge key={i} variant="secondary" className="rounded-md">
                  {t.name} ${t.price}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
