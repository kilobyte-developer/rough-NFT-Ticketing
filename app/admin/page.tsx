import { TopNavigation } from "@/components/top-navigation"
import { AdminWizard } from "@/components/admin/admin-wizard"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#F8FAFC]">
      <TopNavigation />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8">
        <AdminWizard />
      </main>
    </div>
  )
}
