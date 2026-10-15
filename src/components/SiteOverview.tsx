import { ChevronRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import {
  SITE_PALETTE,
  incidentChart,
  siteIncidentSummary,
  siteIncidents,
  siteKpiList,
  siteKpiTotals,
  siteTaskSummary,
  siteTasks,
  unitKpiStatus,
  type KpiPoint,
  type SiteIncidentSeverity,
} from '../data/siteOverview'

const SEVERITY_BADGE: Record<SiteIncidentSeverity, { bg: string; fg: string; soft: string; textVar: string }> = {
  Critical: { bg: SITE_PALETTE.red, fg: '#ffffff', soft: 'theme-status-critical-soft theme-status-critical-text', textVar: 'var(--status-critical-text)' },
  Warning: { bg: SITE_PALETTE.orange, fg: '#ffffff', soft: 'theme-status-warning-soft theme-status-warning-text', textVar: 'var(--status-warning-text)' },
  Deviation: { bg: '#FFD542', fg: '#000000', soft: 'theme-status-deviation-soft theme-status-deviation-text', textVar: 'var(--status-deviation-text)' },
}

const maskIcon = (src: string, color: string): CSSProperties => ({
  background: color,
  WebkitMaskImage: `url(${src})`,
  maskImage: `url(${src})`,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
})

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md flex flex-col overflow-hidden h-full">
      {children}
    </div>
  )
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-center text-[13px] font-bold text-gray-800 py-3 shrink-0">{children}</div>
}

function Stat({ value, label, emphasis }: { value: number; label: string; emphasis?: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <span className={`font-bold leading-none text-gray-900 ${emphasis ? 'text-[32px]' : 'text-[26px]'}`}>{value}</span>
      <span className="text-[11px] font-medium text-gray-500 mt-1">{label}</span>
    </div>
  )
}

function DotSquare({ type }: { type: KpiPoint }) {
  if (type === 'blocked') {
    return (
      <span
        className="inline-flex items-center justify-center"
        style={{ width: 10, height: 10, borderRadius: 1.5, background: SITE_PALETTE.blocked }}
      >
        <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3">
          <circle cx="12" cy="12" r="9" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </span>
    )
  }
  const background = type === 'healthy' ? SITE_PALETTE.green : SITE_PALETTE.red
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{ width: 10, height: 10, borderRadius: 1.5, background }}
    >
      {type === 'pinned' && (
        <svg width="6" height="6" viewBox="0 0 384 512" fill="#ffffff">
          <path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H298.3c-14.6 11.4-24.6 27.4-28.7 45.4l-11.6 50.1c-2.2 9.5-9.7 16.7-19.3 18.4L222.1 181.3V313.9l31.1 43.5c5.1 7.1 7.8 15.6 7.8 24.3V448c0 17.7-14.3 32-32 32H154.9c-17.7 0-32-14.3-32-32V381.7c0-8.7 2.8-17.2 7.8-24.3l31.1-43.5V181.3L145.2 178c-9.5-1.6-17-8.9-19.3-18.4l-11.6-50.1c-4.1-18-14.1-34-28.7-45.4H64C46.3 64 32 49.7 32 32z" />
        </svg>
      )}
    </span>
  )
}

function KpiStatusPanel({ onViewAllAssets }: { onViewAllAssets: () => void }) {
  return (
    <Panel>
      <PanelTitle>KPI Status</PanelTitle>
      <div className="flex items-center gap-1 pb-3 shrink-0">
        <Stat value={siteKpiTotals.total} label="Total" emphasis />
        <Stat value={siteKpiTotals.unhealthy} label="Unhealthy" />
        <Stat value={siteKpiTotals.healthy} label="Healthy" />
      </div>
      <div className="overflow-y-auto scrollbar-thin px-3 shrink-0" style={{ maxHeight: 168 }}>
        {siteKpiList.map((k) => (
          <div key={k.name} className="flex items-center gap-2 py-1.5 text-[12px] text-gray-700">
            <span
              className="inline-flex items-center justify-center text-[8px] font-bold text-white shrink-0"
              style={{
                width: 13,
                height: 13,
                borderRadius: 2,
                background: k.count > 0 ? SITE_PALETTE.red : SITE_PALETTE.green,
              }}
            >
              {k.count > 0 ? k.count : ''}
            </span>
            <span className="truncate">{k.name}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 mt-2 pt-3 px-3 pb-2 flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[12px] font-bold text-gray-800">Units wise status of KPIs</span>
          <button
            onClick={onViewAllAssets}
            className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
          >
            View all assets
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-thin mt-1 min-h-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 py-1.5">
                  Unit
                </th>
                <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 py-1.5">
                  KPI Indicator
                </th>
              </tr>
            </thead>
            <tbody>
              {unitKpiStatus.map((u) => (
                <tr key={u.unit} className="border-t border-gray-100">
                  <td className="py-2 pr-2 text-[11px] font-medium text-gray-700 whitespace-nowrap align-top">
                    {u.unit}
                  </td>
                  <td className="py-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {u.points.map((p, i) => (
                        <DotSquare key={i} type={p} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  )
}

function IncidentChart() {
  const w = 300
  const h = 150
  const padL = 30
  const padR = 10
  const padT = 12
  const padB = 24
  const { values, max, days, label } = incidentChart
  const innerW = w - padL - padR
  const innerH = h - padT - padB
  const x = (i: number) => padL + (i / (values.length - 1)) * innerW
  const y = (v: number) => padT + innerH - (v / max) * innerH
  const path = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const ticks = [0, Math.round(max / 2), max]

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[150px] block">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} y1={y(t)} x2={w - padR} y2={y(t)} stroke="#EEF2F6" strokeWidth="1" />
          <text x={padL - 5} y={y(t) + 3} textAnchor="end" fontSize="8" fill="#9CA3AF">
            {t}
          </text>
        </g>
      ))}
      <text x={4} y={padT + innerH / 2} fontSize="8" fill="#9CA3AF" transform={`rotate(-90 4 ${padT + innerH / 2})`} textAnchor="middle">
        {label}
      </text>
      <path d={path} fill="none" stroke={SITE_PALETTE.info} strokeWidth="2" strokeLinejoin="round" />
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill={SITE_PALETTE.info} />
      ))}
      {days.map((d, i) => (
        <text key={d} x={x(i)} y={h - 8} textAnchor="middle" fontSize="7.5" fill="#9CA3AF">
          {d}
        </text>
      ))}
    </svg>
  )
}

function IncidentsPanel({ onViewAll }: { onViewAll: () => void }) {
  return (
    <Panel>
      <PanelTitle>Incidents</PanelTitle>
      <div className="flex items-center justify-center gap-1 pb-2 shrink-0">
        <Stat value={siteIncidentSummary.total} label="Total" />
        <Stat value={siteIncidentSummary.critical} label="Critical" />
        <Stat value={siteIncidentSummary.warning} label="Warning" />
        <Stat value={siteIncidentSummary.deviation} label="Deviation" />
      </div>
      <div className="px-2 shrink-0">
        <IncidentChart />
      </div>
      <div className="border-t border-gray-100 mt-2 pt-2 flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between shrink-0 pb-1 px-3">
          <span className="text-[12px] font-bold text-gray-800">Recent incidents</span>
          <button onClick={onViewAll} className="text-[11px] font-semibold text-blue-600 hover:underline">
            View all
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-thin min-h-0 pb-2">
          {siteIncidents.map((inc) => {
            const badge = SEVERITY_BADGE[inc.severity]
            return (
              <div
                key={inc.id}
                role="button"
                tabIndex={0}
                className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${badge.soft}`}>
                    <span className="w-[13px] h-[13px] shrink-0 transition-all opacity-70 group-hover:opacity-100" style={maskIcon('/incidents.svg', badge.textVar)} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[10px] text-gray-400">{inc.time}</div>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap shrink-0 ${inc.severity === 'Deviation' ? 'theme-status-deviation-badge' : ''}`}
                        style={{ backgroundColor: badge.bg, color: badge.fg }}
                      >
                        {inc.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="text-[12px] font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{inc.title}</div>
                    </div>
                    <div className="text-[11px] text-gray-500 truncate">
                      <span>{inc.tag}</span>
                      <span className="ml-1 text-amber-500 font-medium">{inc.value}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
                </div>
                <div className="mt-2">
                  <div className="text-[11px] text-gray-500 truncate">
                    <span>{inc.unit}</span>
                    <span><span className="text-gray-400 mx-0.5">&gt;</span>{inc.asset}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Panel>
  )
}

function Donut() {
  const size = 120
  const stroke = 16
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const { total, notStarted, completed } = siteTaskSummary
  const completedLen = (completed / total) * c
  const notStartedLen = (notStarted / total) * c

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-[120px] h-[120px]">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={SITE_PALETTE.grey} strokeWidth={stroke} strokeDasharray={`${notStartedLen} ${c - notStartedLen}`} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={SITE_PALETTE.green} strokeWidth={stroke} strokeDasharray={`${completedLen} ${c - completedLen}`} strokeDashoffset={-notStartedLen} />
      </g>
      <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fontSize="24" fontWeight="700" fill="#111827">
        {total}
      </text>
      <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize="11" fill="#9CA3AF">
        Tasks
      </text>
    </svg>
  )
}

function LegendItem({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
      <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: color }} />
      <span>{label}</span>
      <span className="font-bold text-gray-800">({value})</span>
    </div>
  )
}

function TasksPanel({ onViewAll }: { onViewAll: () => void }) {
  return (
    <Panel>
      <PanelTitle>Tasks Summary</PanelTitle>
      <div className="flex items-center justify-center gap-5 pb-2 shrink-0">
        <Donut />
        <div className="flex flex-col gap-2">
          <LegendItem color="#111827" label="Total" value={siteTaskSummary.total} />
          <LegendItem color={SITE_PALETTE.grey} label="Not started" value={siteTaskSummary.notStarted} />
          <LegendItem color={SITE_PALETTE.green} label="Completed" value={siteTaskSummary.completed} />
        </div>
      </div>
      <div className="border-t border-gray-100 mt-2 pt-2 flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between shrink-0 pb-1 px-3">
          <span className="text-[12px] font-bold text-gray-800">Task list</span>
          <button onClick={onViewAll} className="text-[11px] font-semibold text-blue-600 hover:underline">
            View all
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-thin min-h-0 pb-2">
          {siteTasks.map((task) => (
            <div
              key={task.id}
              role="button"
              tabIndex={0}
              className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 theme-status-healthy-soft theme-status-healthy-text">
                  <span className="w-[13px] h-[13px] shrink-0 transition-all opacity-70 group-hover:opacity-100" style={maskIcon('/Tasks.svg', 'var(--status-healthy-text)')} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <div className="text-[12px] font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{task.title}</div>
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">{task.date}</div>
                </div>
                <span className="w-6 h-6 rounded-full bg-[#5B5FC7] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{task.initials}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
              </div>
              <div className="mt-2">
                <div className="text-[11px] text-gray-500 truncate">
                  <span>{task.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

export default function SiteOverview({
  onViewAllAssets,
  onViewAllIncidents,
  onViewAllTasks,
}: {
  onViewAllAssets: () => void
  onViewAllIncidents: () => void
  onViewAllTasks: () => void
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[560px] lg:min-h-0">
      <KpiStatusPanel onViewAllAssets={onViewAllAssets} />
      <IncidentsPanel onViewAll={onViewAllIncidents} />
      <TasksPanel onViewAll={onViewAllTasks} />
    </div>
  )
}
