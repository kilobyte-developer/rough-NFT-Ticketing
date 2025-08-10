"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useAdminStore } from "@/lib/admin-store"
import { useToast } from "@/hooks/use-toast"

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BarChart3, FilePlus2, ScanLine, Lock, LogOut } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function AdminUnlock() {
  const [password, setPassword] = useState("")
  const unlock = useAdminStore((s) => s.unlock)
  const { toast } = useToast()

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!unlock(password)) {
      toast({ title: "Incorrect password", description: "Please try again.", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-svh flex items-center justify-center bg-[#F8FAFC] p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center gap-2">
          <Lock className="size-5 text-muted-foreground" />
          <CardTitle>{"Admin mode locked"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="admin-pass">{"Password"}</Label>
              <Input
                id="admin-pass"
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-md"
                placeholder="Enter admin password"
              />
            </div>
            <Button type="submit" className="h-10 rounded-md" style={{ background: "#2563EB" }}>
              {"Unlock Admin"}
            </Button>
            <div className="text-xs text-muted-foreground">{"Hint: use the provided passcode from the brief."}</div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const unlocked = useAdminStore((s) => s.unlocked)
  const lock = useAdminStore((s) => s.lock)

  if (!unlocked) {
    return <AdminUnlock />
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{"Admin"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin">
                      <FilePlus2 />
                      <span>{"Create Event"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/logs">
                      <BarChart3 />
                      <span>{"Sales & Scan Logs"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/scanner">
                      <ScanLine />
                      <span>{"Scanner"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={lock}>
                    <LogOut />
                    <span>{"Lock Admin"}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="px-4 sm:px-6 pt-4">
          <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
// Structure follows the documented SidebarProvider/Sidebar/SidebarContent composition,
// using the collapsible 'icon' variant and SidebarTrigger inside the inset content. [^1]
