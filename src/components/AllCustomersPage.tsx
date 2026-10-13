import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { varySeed } from '../lib/vary'

const HEALTHY = '#006D5B'
const REVIEW = '#FFB300'
const AT_RISK = '#C62828'
const PRIMARY = '#005EDB'

const statusData = [
  { name: 'Healthy', value: 60, color: HEALTHY },
  { name: 'Review', value: 10, color: REVIEW },
  { name: 'At risk', value: 20, color: AT_RISK },
]

const statusLegend = [
  { label: 'At risk', value: 20, color: AT_RISK },
  { label: 'Healthy', value: 60, color: HEALTHY },
  { label: 'Review', value: 10, color: REVIEW },
]

const totalAssets = statusData.reduce((sum, s) => sum + s.value, 0)

const ranges = ['Daily', 'Weekly', 'Monthly'] as const
type Range = (typeof ranges)[number]

const uptimeSites = [
  'Bangalore',
  'Pune',
  'Noida',
  'Indore',
  'BR',
  'Patna',
  'Hyderabad',
  'Mysore',
  'KR',
  'Lucknow',
  'Gurgaon',
  'Delhi',
  'Visakhapatnam',
  'Chennai',
  'Kochi',
]

const uptimeData = Object.fromEntries(
  ranges.map((range) => [
    range,
    uptimeSites.map((site) => {
      const rnd = varySeed('uptime', range, site)
      return { site, uptime: Math.round((86 + rnd() * 14) * 10) / 10 }
    }),
  ]),
) as Record<Range, { site: string; uptime: number }[]>

const chartLabel = (site: string) => (site.length > 9 ? `${site.slice(0, 7)}...` : site)

type SiteCard = {
  name: string
  units: number
  online: number
  offline: number
  assets: number
  assetsNote: string
  tasks: number
  incidents: number
}

const siteCards: SiteCard[] = [
  { name: 'Bangalore Thermal Plant', units: 10, online: 7, offline: 0, assets: 34, assetsNote: 'All healthy', tasks: 45, incidents: 12 },
  { name: 'Pune Power Station', units: 4, online: 0, offline: 0, assets: 30, assetsNote: 'All healthy', tasks: 25, incidents: 3 },
]

type StatusKey = 'healthy' | 'review' | 'atRisk'

const assetCounts = [
  { name: 'Bangalore', assets: 34 },
  { name: 'Pune', assets: 30 },
  ...uptimeSites.slice(2).map((name) => ({ name, assets: 2 })),
]

function buildAssetRows() {
  const pool: StatusKey[] = [
    ...Array.from({ length: 60 }, () => 'healthy' as StatusKey),
    ...Array.from({ length: 10 }, () => 'review' as StatusKey),
    ...Array.from({ length: 20 }, () => 'atRisk' as StatusKey),
  ]

  const rnd = varySeed('asset-status-pool')
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1))
    const swap = pool[i]
    pool[i] = pool[j]
    pool[j] = swap
  }

  let cursor = 0
  return assetCounts.map((site) => {
    const slice = pool.slice(cursor, cursor + site.assets)
    cursor += site.assets
    return {
      ...site,
      healthy: slice.filter((s) => s === 'healthy').length,
      review: slice.filter((s) => s === 'review').length,
      atRisk: slice.filter((s) => s === 'atRisk').length,
    }
  })
}

const assetRows = buildAssetRows()

const assetTotals = assetRows.reduce(
  (acc, row) => ({
    assets: acc.assets + row.assets,
    healthy: acc.healthy + row.healthy,
    review: acc.review + row.review,
    atRisk: acc.atRisk + row.atRisk,
  }),
  { assets: 0, healthy: 0, review: 0, atRisk: 0 },
)

function StatusDot({ color, pulse }: { color: string; pulse?: boolean }) {
  return (
    <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
      {pulse && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: color }} />}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${pulse ? '' : 'animate-pulse'}`} style={{ background: color }} />
    </span>
  )
}

export default function AllCustomersPage({ onOpenDashboard }: { onOpenDashboard: (siteName: string) => void }) {
  const [range, setRange] = useState<Range>('Weekly')
  const [assetsOpen, setAssetsOpen] = useState(false)

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
      <div className="p-3 bg-gray-50 max-w-[1060px] mx-auto w-full">
        <div className="bg-white rounded-lg border border-gray-200 p-2" style={{ marginBottom: 10 }}>
          <div className="flex items-stretch gap-6 p-4 flex-wrap" style={{ height: 250 }}>
            {/* Status */}
            <div className="flex-1 min-w-[240px]">
              <h3 className="font-bold mb-6 text-base">Status</h3>
              <div className="flex items-center gap-2">
                <div className="relative shrink-0" style={{ width: 128, height: 128 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        stroke="#fff"
                        strokeWidth={2}
                        isAnimationActive={false}
                      >
                        {statusData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <div className="text-3xl font-medium">{totalAssets}</div>
                    <div className="text-xs text-gray-600 mt-0.5">Assets</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">All ({totalAssets})</span>
                  </div>
                  {statusLegend.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                      <span className="text-sm">
                        {item.label} ({item.value})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-px bg-gray-200 self-stretch" />

            {/* Sites uptime */}
            <div className="flex-[2] min-w-[300px]">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                  <h3 className="font-bold text-base">Sites Uptime</h3>
                  <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
                    {ranges.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setRange(item)}
                        className={`text-xs border-r border-gray-300 last:border-r-0 transition-colors cursor-pointer ${
                          range === item ? 'bg-[#005EDB] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        style={{ padding: '3px 6px' }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ width: '100%', height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={uptimeData[range]} margin={{ top: 10, right: 8, bottom: 0, left: 8 }}>
                    <XAxis
                      dataKey="site"
                      angle={-90}
                      textAnchor="end"
                      height={70}
                      interval={0}
                      tickFormatter={chartLabel}
                      tick={{ fontSize: 11, fill: '#666' }}
                      axisLine={{ stroke: '#666' }}
                      tickLine={{ stroke: '#666' }}
                    />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }} />
                    <Bar dataKey="uptime" fill={PRIMARY} radius={[3, 3, 0, 0]} maxBarSize={18} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Assets accordion */}
        <div className="bg-white rounded-lg border border-gray-200 p-2" style={{ marginBottom: 10 }}>
          <button
            type="button"
            onClick={() => setAssetsOpen((open) => !open)}
            className="w-full flex items-center gap-2 px-2 py-1 cursor-pointer"
          >
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${assetsOpen ? 'rotate-180' : ''}`} />
            <h3 className="font-bold text-base">{totalAssets} Assets</h3>
          </button>
          {assetsOpen && (
            <div className="px-2 pb-2 pt-1 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
                    <th className="py-2 px-2">Site</th>
                    <th className="py-2 px-2">Assets</th>
                    <th className="py-2 px-2">Healthy</th>
                    <th className="py-2 px-2">Review</th>
                    <th className="py-2 px-2">At risk</th>
                  </tr>
                </thead>
                <tbody>
                  {assetRows.map((row) => (
                    <tr key={row.name} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-2 px-2 text-sm font-semibold text-gray-900">{row.name}</td>
                      <td className="py-2 px-2 text-sm text-gray-900">{row.assets}</td>
                      <td className="py-2 px-2 text-sm text-gray-900">{row.healthy}</td>
                      <td className="py-2 px-2 text-sm text-gray-900">{row.review}</td>
                      <td className="py-2 px-2 text-sm text-gray-900">{row.atRisk}</td>
                    </tr>
                  ))}
                  <tr className="bg-[var(--theme-surface-header)]">
                    <td className="py-2 px-2 text-sm font-bold text-gray-900">Total</td>
                    <td className="py-2 px-2 text-sm font-bold text-gray-900">{assetTotals.assets}</td>
                    <td className="py-2 px-2 text-sm font-bold text-gray-900">{assetTotals.healthy}</td>
                    <td className="py-2 px-2 text-sm font-bold text-gray-900">{assetTotals.review}</td>
                    <td className="py-2 px-2 text-sm font-bold text-gray-900">{assetTotals.atRisk}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* All sites */}
      <div className="px-6 pb-6 bg-gray-50">
        <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">ALL SITES</div>
        <div className="space-y-3">
          {siteCards.map((site) => (
            <div
              key={site.name}
              onClick={() => onOpenDashboard(site.name)}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
            >
              <div className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 ml-2">{site.name}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenDashboard(site.name)
                    }}
                    className="text-[#005EDB] hover:bg-[#005EDB] hover:text-white font-medium text-sm flex items-center gap-1 px-3 py-1.5 rounded transition-all group/btn cursor-pointer"
                  >
                    Overview
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="flex items-start pl-2 flex-wrap gap-x-4 gap-y-3">
                  <div style={{ width: 270 }}>
                    <div className="text-sm mb-1">
                      <span className="font-semibold">{site.units}</span> Unit(s)
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5">
                        <StatusDot color="#006E5B" pulse />
                        <span className="text-gray-700">{site.online} Online</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <StatusDot color="#EF4444" />
                        <span className="text-gray-700">{site.offline} Offline</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: 180 }}>
                    <div className="text-sm mb-1">
                      <span className="font-semibold">{site.assets}</span> Assets
                    </div>
                    <div className="text-sm text-gray-600">{site.assetsNote}</div>
                  </div>
                  <div style={{ width: 160 }}>
                    <div className="text-gray-900 text-sm">
                      <span className="font-semibold">{site.tasks}</span> Tasks
                    </div>
                  </div>
                  <div style={{ width: 160 }}>
                    <div className="text-gray-900 text-sm">
                      <span className="font-semibold">{site.incidents}</span> Incidents
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
