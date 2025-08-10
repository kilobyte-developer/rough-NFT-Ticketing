"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Check, MailCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export type Attendee = {
  name: string
  email: string
  age?: number
  createDid: boolean
  verified?: boolean
}

export function AddAttendeesModal({
  onConfirm,
  defaultOpen = false,
}: {
  onConfirm: (attendees: Attendee[]) => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [rows, setRows] = useState<Attendee[]>([
    { name: "", email: "", age: undefined, createDid: true, verified: false },
  ])
  const { toast } = useToast()

  const addRow = () => setRows((r) => [...r, { name: "", email: "", age: undefined, createDid: true }])
  const removeRow = (index: number) => setRows((r) => r.filter((_, i) => i !== index))

  const verifyEmail = async (i: number) => {
    // Simulate verification
    setTimeout(() => {
      setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, verified: true } : r)))
      toast({ title: "Email verified", description: "Verification link accepted." })
    }, 600)
  }

  const submit = () => {
    const invalid = rows.some((r) => !r.name || !r.email)
    if (invalid) {
      toast({
        title: "Please fill required fields",
        description: "Name and Email are required.",
        variant: "destructive",
      })
      return
    }
    onConfirm(rows)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-md" style={{ background: "#2563EB" }}>
          {"Add Attendee"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{"Add Attendees"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 max-h-[60vh] overflow-auto pr-1">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3">
                <Label htmlFor={`name-${i}`}>Name</Label>
                <Input
                  id={`name-${i}`}
                  value={row.name}
                  onChange={(e) =>
                    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, name: e.target.value } : r)))
                  }
                  className="h-10 rounded-md"
                  aria-invalid={row.name === "" ? true : undefined}
                />
              </div>
              <div className="col-span-5">
                <Label htmlFor={`email-${i}`}>Email</Label>
                <div className="flex gap-2">
                  <Input
                    id={`email-${i}`}
                    type="email"
                    value={row.email}
                    onChange={(e) =>
                      setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, email: e.target.value } : r)))
                    }
                    className="h-10 rounded-md"
                    aria-invalid={row.email === "" ? true : undefined}
                  />
                  <Button type="button" variant="outline" onClick={() => verifyEmail(i)} className="h-10">
                    {row.verified ? (
                      <Check className="mr-2 size-4 text-emerald-500" />
                    ) : (
                      <MailCheck className="mr-2 size-4" />
                    )}
                    {row.verified ? "Verified" : "Verify"}
                  </Button>
                </div>
              </div>
              <div className="col-span-2">
                <Label htmlFor={`age-${i}`}>Age (optional)</Label>
                <Input
                  id={`age-${i}`}
                  type="number"
                  value={row.age ?? ""}
                  onChange={(e) =>
                    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, age: Number(e.target.value) } : r)))
                  }
                  className="h-10 rounded-md"
                />
              </div>
              <div className="col-span-2 flex items-center gap-2 mt-6">
                <Checkbox
                  id={`did-${i}`}
                  checked={row.createDid}
                  onCheckedChange={(ck) =>
                    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, createDid: Boolean(ck) } : r)))
                  }
                />
                <Label htmlFor={`did-${i}`}>{"Create DID + email verify"}</Label>
              </div>
              <div className="col-span-12 flex justify-end -mt-2">
                {rows.length > 1 && (
                  <Button
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => removeRow(i)}
                    aria-label="Remove attendee"
                  >
                    <Trash2 className="mr-2 size-4" />
                    {"Remove"}
                  </Button>
                )}
              </div>
              <hr className="col-span-12" />
            </div>
          ))}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={addRow} className="rounded-md bg-transparent">
              <Plus className="mr-2 size-4" />
              {"Add Row"}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-md">
                {"Cancel"}
              </Button>
              <Button onClick={submit} className="rounded-md" style={{ background: "#2563EB" }}>
                {"Confirm"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
