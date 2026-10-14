import { useState } from 'react'
import HomeOverview from './HomeOverview'
import RightSidebar from './RightSidebar'

export default function AllCustomersPage({ onOpenDashboard }: { onOpenDashboard: (siteName: string) => void }) {
  const [priorityOpen, setPriorityOpen] = useState(true)
  return (
    <div className="flex-1 min-h-0 flex overflow-hidden bg-[#F7F9FA]">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <HomeOverview onOpenSite={onOpenDashboard} />
      </div>
      {priorityOpen && (
        <RightSidebar onClose={() => setPriorityOpen(false)} widthClass="w-[260px] max-w-[260px]" />
      )}
    </div>
  )
}
