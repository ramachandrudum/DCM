import {
  ArrowRight,
  ChevronRight,
  Cloud,
  Droplets,
  Factory,
  Gauge,
  Recycle,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import {
  assetsHealth,
  energyMix,
  energyTrends,
  healthLegend,
  plantCards,
  priorityMatrixColors,
  siteKpis,
  sparkPath,
  type PlantCardData,
} from '../data/overview'
import EdgeCaseOverview from './EdgeCaseOverview'

const STATUS_BADGE: Record<string, { label: string; fg: string; bg: string; dot: string }> = {
  Running: { label: 'Running', fg: '#047857', bg: '#ECFDF5', dot: '#28A745' },
  Attention: { label: 'Attention', fg: '#B45309', bg: '#FFFBEB', dot: priorityMatrixColors.medium },
  Offline: { label: 'Offline', fg: '#B91C1C', bg: '#FEF2F2', dot: priorityMatrixColors.high },
}

function Donut({
  segments,
  size = 120,
  thickness = 16,
  gap = 0,
  centerValue,
  centerLabel,
}: {
  segments: { label: string; value: number; color: string }[]
  size?: number
  thickness?: number
  gap?: number
  centerValue?: string
  centerLabel?: string
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1
  const r = (size - thickness) / 2
  const circ = 2 * Math.PI * r
  const full = segments.map((seg) => (seg.value / total) * circ)
  const draws = full.map((l) => Math.max(0.5, l - Math.min(gap, l * 0.4)))
  const offsets = full.map((_, i) => -full.slice(0, i).reduce((s, l) => s + l, 0))
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={thickness} />
        {segments.map((seg, i) => (
          <circle
            key={seg.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${draws[i]} ${circ - draws[i]}`}
            strokeDashoffset={offsets[i]}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && <div className="text-[20px] font-bold text-gray-900 leading-none">{centerValue}</div>}
          {centerLabel && <div className="text-[10px] text-gray-500 mt-1">{centerLabel}</div>}
        </div>
      )}
    </div>
  )
}

function Trend({ values, color, height = 92 }: { values: number[]; color: string; height?: number }) {
  const w = 640
  const d = sparkPath(values, w, height)
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="w-full block" style={{ height }} aria-hidden="true">
      <defs>
        <linearGradient id={`siteTrend-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1="0" y1={height / 2} x2={w} y2={height / 2} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
      <path d={`${d} L${w - 2},${height} L2,${height} Z`} fill={`url(#siteTrend-${color.replace('#', '')})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function Delta({ value, invert = false }: { value: number; invert?: boolean }) {
  if (value === 0) {
    return <span className="text-[11px] font-bold whitespace-nowrap text-gray-400">→ 0%</span>
  }
  const up = value > 0
  const good = invert ? !up : up
  return (
    <span className={`text-[11px] font-bold whitespace-nowrap ${good ? 'text-emerald-600' : 'text-red-500'}`}>
      {up ? '▲' : '▼'} {Math.abs(value).toFixed(1)}%
    </span>
  )
}

function RangeSelector() {
  const ranges = ['24H', '7D', '1W', '1M', 'Custom']
  const [active, setActive] = useState('24H')
  return (
    <div className="flex items-center h-8 rounded-md border border-gray-300 bg-white px-1 gap-0.5 hover:border-blue-500 transition-colors">
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => setActive(r)}
          className={`px-2 h-6 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
            active === r ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  )
}

function Toolbar() {
  return (
    <div className="flex items-center gap-3 shrink-0 px-0.5">
      <div className="flex items-center gap-1.5 text-[12px] text-gray-500 shrink-0 whitespace-nowrap">
        <span className="cursor-pointer hover:text-blue-600 transition-colors">Organization</span>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <span className="font-semibold text-gray-800">All Sites Overview</span>
      </div>
      <div className="flex items-center gap-2 ml-auto shrink-0">
        <RangeSelector />
      </div>
    </div>
  )
}

function AssetHealthCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-[3px] px-4 py-3 flex flex-col gap-2.5 shrink-0">
      <div className="text-[12px] font-bold text-gray-800">Asset &amp; Site Health</div>
      <div className="flex items-center gap-4">
        <Donut segments={healthLegend} size={92} thickness={12} centerValue={String(assetsHealth.total)} centerLabel="Assets" />
        <div className="flex flex-col gap-1.5 min-w-0">
          {healthLegend.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-[3px] shrink-0" style={{ background: l.color }} />
              <span className="text-[11px] text-gray-600">{l.label}</span>
              <span className="text-[11px] font-bold text-gray-900 ml-auto">{l.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EnergyConsumptionCard() {
  const k = siteKpis
  const [tab, setTab] = useState<'Overview' | 'Total' | 'Specific'>('Overview')
  const powerColor = '#2563EB'
  const specificColor = '#28A745'
  return (
    <div className="bg-white border border-gray-200 rounded-[3px] px-4 py-3 shrink-0 w-[236px] flex flex-col">
      <div className="text-[12px] font-bold text-gray-800">Energy Consumption</div>
      <div className="flex items-center gap-1 mt-2 mb-2.5">
        {(['Overview', 'Total', 'Specific'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
              tab === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex items-start gap-4">
        {tab === 'Overview' && (
          <>
            <Donut segments={energyMix} size={64} thickness={11} />
            <div className="flex flex-col gap-1 pt-1">
              {energyMix.map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.color }} />
                  <span className="text-[10px] text-gray-600 whitespace-nowrap">
                    {m.label} <span className="font-bold text-gray-900">{m.value}%</span>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === 'Total' && (
          <div className="flex flex-col gap-1 w-full min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-amber-50 text-amber-500 shrink-0">
                <Zap className="w-3 h-3" />
              </span>
              <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Total Power Consumption</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[18px] font-bold text-gray-900">{k.power.value}</span>
              <span className="text-[10px] text-gray-400">{k.power.unit}</span>
              <span className="text-[10px] font-bold text-emerald-600">▼ {k.power.delta}</span>
            </div>
            <div className="w-full">
              <Trend values={energyTrends.power} color={powerColor} height={34} />
            </div>
            <div className="text-[9px] text-gray-400">Power — 24h</div>
          </div>
        )}
        {tab === 'Specific' && (
          <div className="flex flex-col gap-1 w-full min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 shrink-0">
                <Gauge className="w-3 h-3" />
              </span>
              <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Specific Energy</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[18px] font-bold text-gray-900">{k.specificEnergy.value}</span>
              <span className="text-[10px] text-gray-400">{k.specificEnergy.unit}</span>
              <span className="text-[10px] font-bold text-emerald-600">▼ {k.specificEnergy.delta}</span>
            </div>
            <div className="w-full">
              <Trend values={energyTrends.specific} color={specificColor} height={34} />
            </div>
            <div className="text-[9px] text-gray-400">Specific Energy — 24h</div>
          </div>
        )}
      </div>
    </div>
  )
}

function SiteAvailabilityCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-[3px] px-4 py-3 shrink-0">
      <div className="text-[12px] font-bold text-gray-800 mb-2">Site Availability</div>
      <div className="flex items-center gap-4">
        <Donut segments={[{ label: 'Available', value: 92.7, color: '#28A745' }, { label: 'Maintenance', value: 5.3, color: priorityMatrixColors.medium }, { label: 'Down', value: 2.0, color: priorityMatrixColors.high }]} size={88} thickness={14} gap={4} centerValue="92.7%" centerLabel="Available" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-gray-600">Available</span>
            <span className="text-[10px] font-bold text-gray-900 ml-auto">92.7%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[10px] text-gray-600">Maintenance</span>
            <span className="text-[10px] font-bold text-gray-900 ml-auto">5.3%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[10px] text-gray-600">Down</span>
            <span className="text-[10px] font-bold text-gray-900 ml-auto">2.0%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiBanner() {
  const k = siteKpis
  const dirIcon = (dir: 'up' | 'down') => (dir === 'up' ? '▲' : '▼')
  const dirColor = (dir: 'up' | 'down', goodWhen: 'up' | 'down') =>
    dir === goodWhen ? 'text-emerald-600' : 'text-red-500'
  const items: {
    label: string
    value: string
    unit: string
    delta?: string
    dir?: 'up' | 'down'
    note?: string
    goodWhen?: 'up' | 'down'
    Icon: LucideIcon
    tint: string
  }[] = [
    { label: 'Total Production', value: k.production.value, unit: k.production.unit, delta: k.production.delta, dir: k.production.dir, note: k.production.note, goodWhen: 'up' as const, Icon: Factory, tint: 'bg-blue-50 text-blue-600' },
    { label: 'Fresh Water Intake', value: k.freshWater.value, unit: k.freshWater.unit, Icon: Droplets, tint: 'bg-sky-50 text-sky-500' },
    { label: 'Effluent Recycle', value: k.effluentRecycle.value, unit: k.effluentRecycle.unit, Icon: Recycle, tint: 'bg-emerald-50 text-emerald-600' },
    { label: 'CO₂ Emissions', value: k.co2.value, unit: k.co2.unit, delta: k.co2.delta, dir: k.co2.dir, goodWhen: 'down' as const, Icon: Cloud, tint: 'bg-slate-100 text-slate-500' },
  ]
  return (
    <div className="bg-white border border-gray-200 rounded-[3px] px-4 py-2.5 flex flex-col gap-2 flex-1 min-w-0">
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Site KPIs</div>
      <div className="grid grid-cols-2 -mx-2.5">
        {items.map((it, i) => (
          <div
            key={it.label}
            className={`flex items-start gap-2 p-2.5 min-h-[58px] ${i % 2 === 0 ? 'border-r border-gray-100' : ''} ${i < 2 ? 'border-b border-gray-100' : ''}`}
          >
            <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${it.tint}`}>
              <it.Icon className="w-3 h-3" />
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[9px] text-gray-400 font-semibold truncate">{it.label}</span>
              <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                <span className="text-[15px] font-bold text-gray-900">{it.value}</span>
                <span className="text-[9px] text-gray-400">{it.unit}</span>
                {it.delta && it.dir && (
                  <span className={`text-[10px] font-bold ${dirColor(it.dir, it.goodWhen as 'up' | 'down')}`}>
                    {dirIcon(it.dir)} {it.delta}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlantRow({ plant, onOpenSite }: { plant: PlantCardData; onOpenSite?: (siteName: string) => void }) {
  const badge = STATUS_BADGE[plant.status]
  const trendColor = plant.status === 'Running' ? '#28A745' : priorityMatrixColors.medium
  const thumbTint = plant.status === 'Running' ? 'from-emerald-600/70 via-emerald-500/30 to-slate-700/60' : 'from-amber-500/70 via-amber-400/30 to-slate-700/60'
  return (
    <div className="border border-gray-200 rounded-[3px] overflow-hidden bg-white flex items-stretch">
      <div className={`relative w-[104px] shrink-0 bg-gradient-to-br ${thumbTint}`}>
        {plant.image ? (
          <img src={plant.image} alt={plant.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Factory className="w-7 h-7 text-white/70" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-1.5 pb-1">
          <div className="text-[9px] font-bold text-white leading-tight truncate drop-shadow">{plant.name}</div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: badge.dot }} />
            <span className="text-[8px] font-semibold text-white/90 leading-tight">{badge.label}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 items-end gap-x-4 gap-y-2 flex-1 min-w-0 px-3.5 py-2.5">
        {plant.metrics.map((m) => (
          <div key={m.label} className="min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold whitespace-nowrap">{m.label}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{m.value}</span>
              {m.delta !== null && <Delta value={m.delta} invert={m.invert} />}
            </div>
          </div>
        ))}
        <div className="min-w-0">
          <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold whitespace-nowrap">Tasks</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{plant.tasks}</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold whitespace-nowrap">Incidents</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{plant.incidents}</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold whitespace-nowrap">{plant.graphLabel} — 24h</div>
          <div className="w-full mt-0.5">
            <Trend values={plant.trend} color={trendColor} height={30} />
          </div>
        </div>
      </div>
      <div className="flex items-center pr-3 pl-1 shrink-0">
        <button
          onClick={() => onOpenSite?.(plant.name)}
          className="flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          Overview
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

function PlantMapPopover({ plant }: { plant: PlantCardData }) {
  const badge = STATUS_BADGE[plant.status]
  const prod = plant.metrics[0]
  const health = plant.metrics[2]
  return (
    <div className="absolute z-30 w-[230px] bg-white border border-gray-200 rounded-[3px] shadow-xl p-3 pointer-events-none">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: badge.dot }} />
        <span className="text-[12px] font-bold text-gray-900">{plant.name}</span>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto" style={{ color: badge.fg, background: badge.bg }}>
          {badge.label}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">{prod.label}</div>
          <div className="flex items-center gap-1">
            <span className="text-[13px] font-bold text-gray-900">{prod.value}</span>
            {prod.delta !== null && <Delta value={prod.delta} invert={prod.invert} />}
          </div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Health</div>
          <div className="flex items-center gap-1">
            <span className="text-[13px] font-bold text-gray-900">{health.value}</span>
            {health.delta !== null && <Delta value={health.delta} invert={health.invert} />}
          </div>
        </div>
      </div>
    </div>
  )
}

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5325.715233249047!2d75.88340103398056!3d25.136408098629367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f858f6e954f51%3A0xf57f5354f9d602a4!2sDCM%20SHRIRAM%20LTD!5e1!3m2!1sen!2sin!4v1791896149146!5m2!1sen!2sin'

function PlantMapHero() {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <div className="relative w-full h-[280px] shrink-0 overflow-hidden">
      <iframe
        src={MAP_EMBED}
        title="Plant location map"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div className="absolute inset-0 pointer-events-none z-40" onClick={() => setOpenId(null)}>
        {plantCards.map((p) => {
          const dotColor = p.status === 'Running' ? '#28A745' : priorityMatrixColors.medium
          const top = 30 + ((p.map.y - 34) / 30) * 50
          const below = top < 55
          return (
            <div
              key={p.id}
              className="absolute pointer-events-auto"
              style={{ left: `${p.map.x}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
              onClick={(e) => {
                e.stopPropagation()
                setOpenId((cur) => (cur === p.id ? null : p.id))
              }}
            >
              <button className="relative flex items-center justify-center w-8 h-8 -m-4 cursor-pointer" title={p.name}>
                {openId !== p.id && (
                  <span className="absolute w-6 h-6 rounded-full animate-ping opacity-40" style={{ background: dotColor }} />
                )}
                <span
                  className="relative w-3.5 h-3.5 rounded-full border-2 border-white shadow"
                  style={{ background: dotColor }}
                />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 top-4 px-1.5 py-0.5 rounded bg-blue-600 border border-blue-700 text-[9px] font-bold text-white whitespace-nowrap shadow-sm">
                {p.name}
              </span>
              {openId === p.id && (
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', ...(below ? { top: 24 } : { bottom: 24 }) }}>
                  <PlantMapPopover plant={p} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function HomeOverview({ onOpenSite, edgeCase = false }: { onOpenSite?: (siteName: string) => void; edgeCase?: boolean }) {
  if (edgeCase) {
    return (
      <div className="w-full flex flex-col gap-[15px] shrink-0 grow">
        <EdgeCaseOverview />
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex flex-col shrink-0 grow">
        <div className="relative w-full">
          <PlantMapHero />

          <div className="absolute inset-x-0 top-0 p-[15px] z-20 bg-gradient-to-b from-black/85 via-black/50 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent">
            <Toolbar />
          </div>
        </div>

        <div className="relative z-50 px-5 -mt-[25px] flex flex-nowrap items-stretch gap-[15px]">
          <AssetHealthCard />
          <EnergyConsumptionCard />
          <SiteAvailabilityCard />
          <KpiBanner />
        </div>

        <div className="p-5 flex flex-col gap-[15px]">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-gray-800">Plant Metrics ({plantCards.length})</span>
              <span className="flex items-center gap-1 text-[10px] text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {plantCards.filter((s) => s.status === 'Running').length} Running
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1.5" /> {plantCards.filter((s) => s.status === 'Attention').length} Attention
              </span>
            </div>
            {plantCards.map((plant) => (
              <PlantRow key={plant.id} plant={plant} onOpenSite={onOpenSite} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
