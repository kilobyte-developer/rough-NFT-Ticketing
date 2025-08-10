"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, Wallet, Plus, Search, LogOut } from "lucide-react"
import { useState } from "react"

type TopNavigationProps = {
  isAuthed?: boolean
  onConnectWallet?: () => void
  onLogout?: () => void
}

const tabs = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/tickets", label: "My Tickets" },
]

export function TopNavigation({ isAuthed = false, onConnectWallet, onLogout }: TopNavigationProps) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const isActive = (href: string) => (pathname === href ? "text-foreground" : "text-muted-foreground")

  return (
    <header className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Go to Home">
            <div className="size-8 rounded-md bg-gradient-to-br from-[#6EE7B7] to-[#60A5FA]" />
            <span className="font-semibold text-[18px] tracking-tight" style={{ color: "#0F1724" }}>
              MintPass
            </span>
          </Link>

          {/* Center: Search + category pills (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, venues..."
                className="pl-9 h-10 w-[320px] rounded-md"
                aria-label="Search events"
              />
            </div>
            <nav className="flex items-center gap-1">
              {["Events", "Campus", "Conferences"].map((pill) => (
                <button
                  key={pill}
                  className="h-9 px-3 rounded-full text-sm bg-muted/30 hover:bg-muted/50 transition-colors"
                  aria-label={pill}
                >
                  {pill}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/admin">
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2, ease: [0.22, 0.9, 0.1, 1] }}>
                <Button className="h-10 rounded-md" style={{ background: "#2563EB" }}>
                  <Plus className="mr-2 size-4" />
                  {"Create Event"}
                </Button>
              </motion.div>
            </Link>
            {!isAuthed ? (
              <Button
                variant="outline"
                className="h-10 rounded-md bg-transparent"
                onClick={onConnectWallet}
                aria-label="Connect Wallet"
              >
                <Wallet className="mr-2 size-4" />
                {"Connect Wallet"}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-md">
                  Verified
                </Badge>
                <Avatar className="size-9">
                  <AvatarFallback>MP</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Log out">
                  <LogOut className="size-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile: Hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open Menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl p-4">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search events, venues..."
                      className="pl-9 h-10 rounded-md"
                      aria-label="Search events"
                    />
                  </div>
                  <nav className="grid gap-1">
                    {tabs.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        className={cn("h-10 rounded-md px-3 flex items-center", isActive(t.href))}
                        aria-current={pathname === t.href ? "page" : undefined}
                      >
                        {t.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link href="/admin" className="col-span-2">
                      <Button className="w-full h-11 rounded-md" style={{ background: "#2563EB" }}>
                        <Plus className="mr-2 size-4" />
                        {"Create Event"}
                      </Button>
                    </Link>
                    {!isAuthed ? (
                      <Button variant="outline" className="h-11 rounded-md bg-transparent" onClick={onConnectWallet}>
                        <Wallet className="mr-2 size-4" />
                        {"Connect Wallet"}
                      </Button>
                    ) : (
                      <Button variant="outline" className="h-11 rounded-md bg-transparent" onClick={onLogout}>
                        {"Sign out"}
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Secondary tabs */}
        <nav className="hidden lg:flex items-center gap-4 h-10">
          {tabs.map((t) => {
            const active = pathname === t.href
            return (
              <Link
                key={t.href}
                href={t.href}
                className={cn(
                  "relative text-sm hover:text-foreground transition-colors",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {t.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #6EE7B7 0%, #60A5FA 100%)",
                    }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
