"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type AdminState = {
  unlocked: boolean
  unlock: (password: string) => boolean
  lock: () => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      unlocked: false,
      unlock: (password: string) => {
        const ok = password === "aezakim"
        if (ok) set({ unlocked: true })
        return ok
      },
      lock: () => set({ unlocked: false }),
    }),
    { name: "admin-store" },
  ),
)
