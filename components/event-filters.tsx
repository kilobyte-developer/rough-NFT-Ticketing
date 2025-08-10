"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Filter } from "lucide-react"

export type EventFiltersProps = {
  onApply: (query: { q: string; city: string; date: string; categories: string[] }) => void
}

const CATEGORIES = ["Music", "College", "Tech", "Conference"] as const

export function EventFilters({ onApply }: EventFiltersProps) {
  const [q, setQ] = useState("")
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")
  const [categories, setCategories] = useState<string[]>([])

  // Apply on category toggle immediately for snappy UX
  useEffect(() => {
    onApply({ q, city, date, categories })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories])

  const toggleCategory = (c: string) =>
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  return (
    <div className="w-full rounded-xl border p-3 sm:p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="col-span-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search events…"
            className="h-11 rounded-md"
            aria-label="Search"
          />
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-muted-foreground" />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="h-11 rounded-md"
            aria-label="City"
          />
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted-foreground" />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 rounded-md"
            aria-label="Date"
          />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          className="h-10 rounded-md bg-transparent"
          onClick={() => onApply({ q, city, date, categories })}
        >
          <Filter className="mr-2 size-4" />
          {"Apply Filters"}
        </Button>
        <div className="flex items-center gap-1 flex-wrap">
          {CATEGORIES.map((tag) => {
            const active = categories.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => toggleCategory(tag)}
                className={`h-8 px-3 rounded-full text-sm transition-all border ${
                  active ? "text-white border-transparent" : "text-foreground bg-muted/30 hover:bg-muted/50"
                }`}
                style={active ? { background: "linear-gradient(90deg, #6EE7B7 0%, #60A5FA 100%)" } : undefined}
                aria-pressed={active}
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            )
          })}
        </div>
        {categories.length > 0 && (
          <Badge
            variant="secondary"
            className="ml-auto cursor-pointer rounded-md"
            onClick={() => setCategories([])}
            aria-label="Clear category filters"
          >
            {"Clear"}
          </Badge>
        )}
      </div>
    </div>
  )
}
