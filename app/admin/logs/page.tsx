"use client"

import { TopNavigation } from "@/components/top-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const scans = [
  { time: "10:21:02", token: "0xabc…123", status: "ok", mode: "cache" },
  { time: "10:25:11", token: "0xabc…456", status: "fail", mode: "-" },
  { time: "10:31:45", token: "0xdef…777", status: "ok", mode: "on-chain" },
]

const sales = [
  { time: "09:10", buyer: "alex@example.com", tier: "General", tx: "0xaaa…001", amount: "$25.00" },
  { time: "09:32", buyer: "mina@example.com", tier: "VIP", tx: "0xbbb…002", amount: "$60.00" },
]

export default function Page() {
  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 grid gap-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{"Scan Logs"}</CardTitle>
            <Button variant="outline" className="rounded-md bg-transparent">
              {"Export CSV"}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{"Time"}</TableHead>
                  <TableHead>{"Token"}</TableHead>
                  <TableHead>{"Status"}</TableHead>
                  <TableHead>{"Mode"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scans.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{s.time}</TableCell>
                    <TableCell>{s.token}</TableCell>
                    <TableCell className={s.status === "ok" ? "text-emerald-600" : "text-red-600"}>
                      {s.status}
                    </TableCell>
                    <TableCell>{s.mode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{"Sales"}</CardTitle>
            <Button variant="outline" className="rounded-md bg-transparent">
              {"Export CSV"}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{"Time"}</TableHead>
                  <TableHead>{"Buyer"}</TableHead>
                  <TableHead>{"Tier"}</TableHead>
                  <TableHead>{"Tx"}</TableHead>
                  <TableHead>{"Amount"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{s.time}</TableCell>
                    <TableCell>{s.buyer}</TableCell>
                    <TableCell>{s.tier}</TableCell>
                    <TableCell>{s.tx}</TableCell>
                    <TableCell>{s.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
