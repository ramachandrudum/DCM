export type AlarmSeverity = 'Critical' | 'Warning' | 'Info'

export type Alarm = {
  id: string
  time: string
  site: string
  asset: string
  event: string
  severity: AlarmSeverity
}

export const activeAlarms: Alarm[] = [
  { id: 'a1', time: '10:42:18', site: 'Kota Complex', asset: 'BT-2 Turbine', event: 'Bearing vibration high', severity: 'Critical' },
  { id: 'a2', time: '10:38:05', site: 'Kota Complex', asset: 'Feed Pump P-104', event: 'Discharge pressure low', severity: 'Critical' },
  { id: 'a3', time: '10:31:44', site: 'Bangalore Thermal', asset: 'ID Fan 3', event: 'Motor winding temp high', severity: 'Warning' },
  { id: 'a4', time: '10:27:12', site: 'Pune Power Station', asset: 'HRSG Unit 1', event: 'Steam drum level deviating', severity: 'Warning' },
  { id: 'a5', time: '10:19:56', site: 'Bangalore Thermal', asset: 'Coal Mill 2', event: 'Outlet temperature high', severity: 'Warning' },
  { id: 'a6', time: '10:14:03', site: 'Chennai Process Hub', asset: 'Caustic Cooler', event: 'Approach temp drift', severity: 'Info' },
  { id: 'a7', time: '10:08:41', site: 'Kota Complex', asset: 'Ash Conveyor', event: 'Belt misalignment detected', severity: 'Warning' },
  { id: 'a8', time: '09:58:27', site: 'Pune Power Station', asset: 'BFP-2', event: 'Vibration band-2 warn', severity: 'Warning' },
  { id: 'a9', time: '09:51:15', site: 'Chennai Process Hub', asset: 'Evaporator E-201', event: 'Fouling index rising', severity: 'Info' },
  { id: 'a10', time: '09:44:38', site: 'Bangalore Thermal', asset: 'Boiler B-1', event: 'Flue gas O₂ deviation', severity: 'Warning' },
  { id: 'a11', time: '09:36:52', site: 'Kota Complex', asset: 'CT Fan 5', event: 'Gearbox oil pressure low', severity: 'Critical' },
  { id: 'a12', time: '09:29:04', site: 'Pune Power Station', asset: 'TG Aux System', event: 'Hydrogen purity below band', severity: 'Info' },
]

export type PlantStatus = 'Running' | 'Attention'

export type UnitStatus = 'Running' | 'Warning' | 'Stopped'

export type PlantMetric = {
  label: string
  value: string
  delta: number | null
  invert?: boolean
}

export type PlantCardData = {
  id: string
  name: string
  status: PlantStatus
  metrics: PlantMetric[]
  graphLabel: string
  trend: number[]
  units: { name: string; status: UnitStatus; image?: string }[]
  tasks: number
  incidents: number
  image?: string
  map: { x: number; y: number }
}

export const plantCards: PlantCardData[] = [
  {
    id: 'pvc',
    name: 'PVC Plant',
    status: 'Running',
    metrics: [
      { label: 'Production', value: '612 t/day', delta: 3 },
      { label: 'Specific Energy', value: '2,320 kWh/t', delta: -5, invert: true },
      { label: 'Availability', value: '94.8%', delta: 1.1 },
    ],
    graphLabel: 'Production (t/day)',
    trend: [560, 548, 542, 535, 538, 556, 585, 610, 632, 648, 655, 660, 652, 664, 670, 666, 658, 649, 638, 622, 600, 585, 572, 566, 560],
    units: [
      { name: 'PVC-1 Reactor', status: 'Running', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=120&h=80&fit=crop' },
      { name: 'PVC-2 Reactor', status: 'Running', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=120&h=80&fit=crop' },
      { name: 'VCM Feed', status: 'Running', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&h=80&fit=crop' },
      { name: 'Paste Dryer', status: 'Running' },
      { name: 'Resin Dryer', status: 'Warning' },
      { name: 'Bagging Line', status: 'Running' },
    ],
    tasks: 12,
    incidents: 3,
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=400&q=60',
    map: { x: 44, y: 34 },
  },
  {
    id: 'carbide',
    name: 'Carbide Plant',
    status: 'Attention',
    metrics: [
      { label: 'Production', value: '278 t/day', delta: -2 },
      { label: 'Specific Energy', value: '12,480 kWh/t', delta: 6, invert: true },
      { label: 'Availability', value: '91.2%', delta: -3.4 },
    ],
    graphLabel: 'Furnace Load (MW)',
    trend: [52, 50, 49, 48, 47, 49, 53, 57, 60, 58, 55, 52, 49, 46, 44, 45, 47, 50, 52, 53, 52, 51, 50, 51, 52],
    units: [
      { name: 'Furnace 1', status: 'Running', image: 'https://images.unsplash.com/photo-1533227268428-f4e56c7a1193?w=120&h=80&fit=crop' },
      { name: 'Furnace 2', status: 'Stopped', image: 'https://images.unsplash.com/photo-1504307969947-7a6f1f9e4c6e?w=120&h=80&fit=crop' },
      { name: 'Furnace 3', status: 'Warning', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=120&h=80&fit=crop' },
      { name: 'Lime Kiln', status: 'Running' },
      { name: 'Screening', status: 'Running' },
      { name: 'Charcoal Handling', status: 'Running' },
    ],
    tasks: 8,
    incidents: 5,
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=400&q=60',
    map: { x: 58, y: 44 },
  },
  {
    id: 'caustic',
    name: 'Caustic Plant',
    status: 'Running',
    metrics: [
      { label: 'Production', value: '520 t/day', delta: 1 },
      { label: 'Specific Energy', value: '2,180 kWh/t', delta: -4, invert: true },
      { label: 'Availability', value: '96.1%', delta: 0.8 },
    ],
    graphLabel: 'Cell Current (kA)',
    trend: [108, 106, 105, 104, 105, 110, 116, 121, 124, 126, 127, 128, 127, 129, 130, 129, 128, 126, 124, 120, 116, 112, 110, 109, 108],
    units: [
      { name: 'Cell-1', status: 'Running', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120&h=80&fit=crop' },
      { name: 'Cell-2', status: 'Running', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop' },
      { name: 'Cell-3', status: 'Running', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=120&h=80&fit=crop' },
      { name: 'Chlor-alkali Unit', status: 'Running' },
      { name: 'Evaporator', status: 'Running' },
      { name: 'HCl Synthesis', status: 'Running' },
    ],
    tasks: 6,
    incidents: 2,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=60',
    map: { x: 36, y: 52 },
  },
  {
    id: 'utilities',
    name: 'Utilities & Offsites',
    status: 'Running',
    metrics: [
      { label: 'Power Generation', value: '65.0 MW', delta: 2 },
      { label: 'Steam Generation', value: '122 t/h', delta: 0 },
      { label: 'Water Recycle', value: '82%', delta: 3 },
    ],
    graphLabel: 'Total Site Load (MW)',
    trend: [58, 57, 56, 55, 55, 58, 62, 66, 69, 71, 72, 73, 72, 74, 75, 74, 72, 70, 68, 64, 61, 59, 58, 58, 58],
    units: [
      { name: 'TG-1', status: 'Running', image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=120&h=80&fit=crop' },
      { name: 'TG-2', status: 'Warning', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&h=80&fit=crop' },
      { name: 'Boiler-1', status: 'Running', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=120&h=80&fit=crop' },
      { name: 'Boiler-2', status: 'Running' },
      { name: 'WTP', status: 'Running' },
      { name: 'Cooling Tower', status: 'Running' },
    ],
    tasks: 10,
    incidents: 4,
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=400&q=60',
    map: { x: 50, y: 64 },
  },
]

export const assetsHealth = {
  total: 90,
  healthy: 72,
  attention: 12,
  review: 6,
  availability: 96.3,
  availabilityDelta: 1.2,
}

export const healthLegend = [
  { label: 'Healthy', value: 72, color: '#10B981' },
  { label: 'At Risk', value: 12, color: '#EF4444' },
  { label: 'In Review', value: 6, color: '#F59E0B' },
]

export const energyMix = [
  { label: 'Carbide', value: 52, color: '#2563EB' },
  { label: 'PVC', value: 28, color: '#10B981' },
  { label: 'Caustic', value: 20, color: '#F59E0B' },
]

export const energyTrends: Record<'power' | 'specific', number[]> = {
  power: [54, 55, 53, 56, 57, 55, 58, 60, 59, 58, 57, 58, 59, 61, 60, 58, 57, 56, 58, 59, 58, 57, 58, 58],
  specific: [2460, 2452, 2448, 2455, 2450, 2440, 2438, 2445, 2452, 2448, 2440, 2436, 2430, 2428, 2432, 2438, 2442, 2440, 2436, 2432, 2428, 2424, 2420, 2418],
}

export type UptimeRange = 'Daily' | 'Weekly' | 'Monthly'

export const uptimeData: Record<UptimeRange, { site: string; uptime: number }[]> = {
  Daily: [
    { site: 'BLR', uptime: 94.8 },
    { site: 'KOTA', uptime: 88.2 },
    { site: 'PUNE', uptime: 96.1 },
    { site: 'CHN', uptime: 91.5 },
  ],
  Weekly: [
    { site: 'BLR', uptime: 93.4 },
    { site: 'KOTA', uptime: 86.9 },
    { site: 'PUNE', uptime: 95.2 },
    { site: 'CHN', uptime: 90.1 },
  ],
  Monthly: [
    { site: 'BLR', uptime: 92.7 },
    { site: 'KOTA', uptime: 84.5 },
    { site: 'PUNE', uptime: 94.6 },
    { site: 'CHN', uptime: 89.3 },
  ],
}

export const siteKpis = {
  power: { value: '58.4', unit: 'MW', delta: '3%', dir: 'down' as const, note: 'vs last week' },
  production: { value: '1,842', unit: 't/day', delta: '2%', dir: 'up' as const, note: 'vs plan' },
  specificEnergy: { value: '2,418', unit: 'kWh/t', delta: '1.4%', dir: 'down' as const, note: 'vs last week' },
  freshWater: { value: '1,240', unit: 'm³/h' },
  effluentRecycle: { value: '82', unit: '%' },
  co2: { value: '186', unit: 't/day', delta: '2.1%', dir: 'down' as const },
}

export const timeRanges = ['Live', '24H', '7D', '30D', 'Custom'] as const

export function sparkPath(values: number[], w: number, h: number, pad = 2): string {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  return values
    .map((v, i) => {
      const x = pad + (i / (values.length - 1)) * (w - pad * 2)
      const y = h - pad - ((v - min) / span) * (h - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}
