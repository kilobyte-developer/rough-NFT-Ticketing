import { TopNavigation } from "@/components/top-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[800px] px-4 sm:px-6 py-8 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{"Profile & Settings"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="text-sm text-muted-foreground">{"Quick setup — no crypto required"}</div>
            <Button variant="outline" className="rounded-md bg-transparent">
              {"Link Email"}
            </Button>
            <Button variant="outline" className="rounded-md bg-transparent">
              {"Connect Wallet"}
            </Button>
            <Button variant="outline" className="rounded-md bg-transparent">
              {"Payment Methods"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
