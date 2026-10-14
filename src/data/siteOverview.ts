export const SITE_PALETTE = {
  green: '#28A745',
  red: '#DC3545',
  orange: '#FD7E14',
  yellow: '#FFC008',
  redDeep: '#C62828',
  grey: '#4F4F4F',
  blocked: '#D1D5DB',
  info: '#005EDB',
} as const

export type KpiListItem = {
  name: string
  count: number
}

export const siteKpiTotals = { total: 81, unhealthy: 5, healthy: 76 }

export const siteKpiList: KpiListItem[] = [
  { name: 'Reactor Temperature Deviation', count: 1 },
  { name: 'Pump Flow low', count: 1 },
  { name: 'Effluent pH Drift', count: 1 },
  { name: 'Cooling Water Header Pressure', count: 1 },
  { name: 'Furnace Load Imbalance', count: 1 },
  { name: 'Steam Header Pressure', count: 0 },
  { name: 'Caustic Cell Voltage', count: 0 },
  { name: 'Compressor Output', count: 0 },
  { name: 'Boiler Feedwater Flow', count: 0 },
  { name: 'Chiller Load', count: 0 },
]

export type KpiPoint = 'critical' | 'pinned' | 'healthy' | 'blocked'

export type UnitKpiStatus = {
  unit: string
  points: KpiPoint[]
}

export const unitKpiStatus: UnitKpiStatus[] = [
  {
    unit: 'PVC Plant',
    points: ['pinned', 'critical', 'healthy', 'healthy', 'healthy', 'critical', 'healthy', 'healthy', 'blocked', 'healthy'],
  },
  {
    unit: 'Carbide Plant',
    points: ['healthy', 'critical', 'critical', 'healthy', 'healthy', 'healthy', 'blocked', 'healthy', 'healthy', 'healthy'],
  },
  {
    unit: 'Caustic Plant',
    points: ['healthy', 'healthy', 'healthy', 'critical', 'healthy', 'healthy', 'healthy', 'healthy', 'blocked'],
  },
  {
    unit: 'Utilities & Offsites',
    points: ['critical', 'healthy', 'healthy', 'blocked', 'healthy', 'critical', 'healthy', 'critical', 'healthy', 'healthy'],
  },
]

export const siteIncidentSummary = { total: 6, critical: 6, warning: 0, deviation: 0 }

export const incidentChart = {
  label: 'Incidents',
  days: ['Oct 8', 'Oct 9', 'Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14'],
  values: [0, 0, 1, 2, 2, 3, 6],
  max: 6,
}

export type SiteIncidentSeverity = 'Critical' | 'Warning' | 'Deviation'

export type SiteIncident = {
  id: string
  time: string
  severity: SiteIncidentSeverity
  title: string
  unit: string
  asset: string
  tag: string
  value: string
}

export const siteIncidents: SiteIncident[] = [
  {
    id: 'i1',
    time: '10:42:18',
    severity: 'Critical',
    title: 'High pressure trip on VCM feed',
    unit: 'PVC Plant',
    asset: 'PVC-1 Reactor',
    tag: 'Pump Flow',
    value: '12 m³/h',
  },
  {
    id: 'i2',
    time: '10:31:07',
    severity: 'Critical',
    title: 'Furnace 2 temperature excursion',
    unit: 'Carbide Plant',
    asset: 'Furnace 2',
    tag: 'Furnace Temp',
    value: '1,840 °C',
  },
  {
    id: 'i3',
    time: '10:18:52',
    severity: 'Critical',
    title: 'Cell-3 voltage spike detected',
    unit: 'Caustic Plant',
    asset: 'Cell-3',
    tag: 'Cell Voltage',
    value: '3.42 V',
  },
  {
    id: 'i4',
    time: '09:57:33',
    severity: 'Critical',
    title: 'TG-2 turbine vibration high',
    unit: 'Utilities & Offsites',
    asset: 'TG-2',
    tag: 'Vibration',
    value: '7.8 mm/s',
  },
  {
    id: 'i5',
    time: '09:41:10',
    severity: 'Critical',
    title: 'Resin dryer outlet temp high',
    unit: 'PVC Plant',
    asset: 'Resin Dryer',
    tag: 'Outlet Temp',
    value: '92 °C',
  },
  {
    id: 'i6',
    time: '09:22:45',
    severity: 'Critical',
    title: 'Boiler-1 drum level deviation',
    unit: 'Utilities & Offsites',
    asset: 'Boiler-1',
    tag: 'Drum Level',
    value: '68 %',
  },
]

export const siteTaskSummary = { total: 37, notStarted: 5, completed: 32 }

export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW'

export type SiteTask = {
  id: string
  date: string
  priority: TaskPriority
  title: string
  initials: string
  activity: string
  unit: string
}

export const siteTasks: SiteTask[] = [
  {
    id: 't1',
    date: 'Oct 14',
    priority: 'HIGH',
    title: 'Replace VCM feed pump seal',
    initials: 'KD',
    activity: 'Assigned to you',
    unit: 'PVC Plant',
  },
  {
    id: 't2',
    date: 'Oct 13',
    priority: 'MEDIUM',
    title: 'Inspect Furnace 2 refractory lining',
    initials: 'AR',
    activity: 'Scheduled for today',
    unit: 'Carbide Plant',
  },
  {
    id: 't3',
    date: 'Oct 13',
    priority: 'LOW',
    title: 'Cell-3 voltage calibration',
    initials: 'SM',
    activity: 'Awaiting parts',
    unit: 'Caustic Plant',
  },
  {
    id: 't4',
    date: 'Oct 12',
    priority: 'HIGH',
    title: 'TG-2 vibration analysis',
    initials: 'RP',
    activity: 'Comment added by R. Prasad',
    unit: 'Utilities & Offsites',
  },
  {
    id: 't5',
    date: 'Oct 12',
    priority: 'MEDIUM',
    title: 'Resin dryer thermal audit',
    initials: 'KD',
    activity: 'Evidence uploaded',
    unit: 'PVC Plant',
  },
  {
    id: 't6',
    date: 'Oct 11',
    priority: 'LOW',
    title: 'Boiler-1 drum level sensor check',
    initials: 'NV',
    activity: 'Plan submitted',
    unit: 'Utilities & Offsites',
  },
]
