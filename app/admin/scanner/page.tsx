import { TopNavigation } from "@/components/top-navigation"
import { ScannerView } from "@/components/scanner-view"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[800px] px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-semibold">{"Scan to Verify"}</h1>
        <p className="text-sm text-muted-foreground">
          {"Admin-only scanner. You’ll see Verifying… (cache) or Verifying… (on-chain) based on speed."}
        </p>
        <div className="mt-4">
          <ScannerView />
        </div>
      </main>
    </div>
  )
}
