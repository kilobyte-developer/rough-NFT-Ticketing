import Image from "next/image"
import { TopNavigation } from "@/components/top-navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10">
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ color: "#0F1724" }}>
              {"Tickets that prove it — NFT-backed access in seconds"}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {
                "Quick setup — no crypto required. Buy with UPI/Card or wallet, show QR at the gate, verified in under 5s."
              }
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/explore">
                <Button className="h-11 rounded-md" style={{ background: "#2563EB" }}>
                  {"Explore Events"}
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" className="h-11 rounded-md bg-transparent">
                  {"Create Event"}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-[0_14px_40px_rgba(2,6,23,0.08)]">
            <Image
              src="/images/hero-campus.jpg"
              alt="College fest crowd hero"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 600px, 100vw"
            />
          </div>
        </section>
        <section className="mt-12 grid gap-6">
          <h2 className="text-xl font-semibold" style={{ color: "#0F1724" }}>
            {"Trusted by organizers"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["/images/organizers/org-1.png","/images/organizers/org-2.png","/images/organizers/org-3.png","/images/organizers/org-4.png"].map((src, i) => (
              <div key={i} className="h-14 rounded-xl bg-white border shadow-sm relative">
                <Image src={src || "/placeholder.svg"} alt={`Organizer logo ${i + 1}`} fill className="object-contain p-3" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
