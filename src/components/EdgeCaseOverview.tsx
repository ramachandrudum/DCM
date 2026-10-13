const ICON_COLOR = '#6C757D'
const COUNT_COLOR = 'rgb(84, 95, 113)'

function CountRow({
  items,
  align = 'center',
  className = '',
}: {
  items: { label: string; value: number }[]
  align?: 'center' | 'baseline'
  className?: string
}) {
  return (
    <div className={`flex text-center text-sm justify-around ${align === 'baseline' ? 'items-baseline' : 'items-center'} ${className}`}>
      {items.map((c, i) => (
        <div key={c.label} className={`cursor-pointer ${align === 'baseline' && i === 0 ? 'mt-2' : ''}`}>
          <div className="flex flex-col items-center" style={{ width: 60 }}>
            <span className="font-bold" style={{ color: COUNT_COLOR, fontSize: 25 }}>{c.value}</span>
            <span style={{ color: COUNT_COLOR, fontSize: 16, fontWeight: i === 0 ? 700 : 400 }}>{c.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function IncidentsTrendFrame() {
  return (
    <div className="flex-1 min-h-0 relative mt-3 max-h-[200px] mx-[25px]">
      <svg viewBox="0 0 460 210" preserveAspectRatio="none" className="w-full h-full block">
        <line x1="30" y1="14" x2="456" y2="14" stroke="var(--bd)" strokeWidth="1" />
        <line x1="30" y1="99" x2="456" y2="99" stroke="var(--bd)" strokeWidth="1" />
        <line x1="30" y1="184" x2="456" y2="184" stroke="var(--bd)" strokeWidth="1" />
      </svg>
      <div className="absolute left-[6.5%] right-[0.5%] bottom-0 flex justify-between text-[11px] text-gray-400 pointer-events-none">
        <span>27/08</span>
        <span>28/08</span>
        <span>29/08</span>
        <span>30/08</span>
        <span>31/08</span>
        <span>01/09</span>
      </div>
      <span className="absolute left-0 text-[11px] text-gray-400 -translate-y-1/2 pointer-events-none" style={{ top: '6.67%' }}>7</span>
      <span className="absolute left-0 text-[11px] text-gray-400 -translate-y-1/2 pointer-events-none" style={{ top: '47.14%' }}>4</span>
      <span className="absolute left-0 text-[11px] text-gray-400 -translate-y-1/2 pointer-events-none" style={{ top: '87.62%' }}>0</span>
    </div>
  )
}

function TasksDonut() {
  return (
    <div className="w-full flex items-center justify-center gap-4">
      <div className="shrink-0" style={{ width: 150, height: 150 }}>
        <svg viewBox="56.5 10 98 98" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path
            d="M105.5,24.7a34.3,34.3 0 1 0 4.2005385210754214e-15,68.6a34.3,34.3 0 1 0 -4.2005385210754214e-15,-68.6ZM105.5,10a49,49 0 1 1 6.000769315822031e-15,98a49,49 0 1 1 -6.000769315822031e-15,-98Z"
            fill="rgb(79, 79, 79)"
            stroke="rgb(255, 255, 255)"
            strokeWidth="1"
          />
          <text x="105.5" y="59.5" textAnchor="middle" fontSize="20" fontWeight="bold" fill="rgb(82, 82, 82)">0</text>
          <text x="105.5" y="76" textAnchor="middle" fontSize="8" fill="rgb(82, 82, 82)">Tasks</text>
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex items-center cursor-pointer mb-1 font-bold">
          <span className="mr-2 shrink-0" style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgb(0, 0, 0)' }} />
          <span className="text-xs whitespace-nowrap">Total (0)</span>
        </div>
        <div className="flex items-center cursor-pointer mb-1">
          <span className="mr-2 shrink-0" style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgb(79, 79, 79)' }} />
          <span className="text-xs whitespace-nowrap">Not started (0)</span>
        </div>
      </div>
    </div>
  )
}

const kpiCounts = [
  { label: 'Total', value: 0 },
  { label: 'Unhealthy', value: 0 },
  { label: 'Healthy', value: 0 },
]

const incidentCounts = [
  { label: 'Total', value: 0 },
  { label: 'Critical', value: 0 },
  { label: 'Warning', value: 0 },
  { label: 'Deviation', value: 0 },
]


function TargetFilledIcon() {
  return (
    <svg className="w-11 h-11" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={ICON_COLOR}
        d="M46 24A22 22 0 1 1 2 24A22 22 0 1 1 46 24ZM40.5 24A16.5 16.5 0 1 1 7.5 24A16.5 16.5 0 1 1 40.5 24ZM35 24A11 11 0 1 1 13 24A11 11 0 1 1 35 24Z"
      />
    </svg>
  )
}

function IncidentsIcon() {
  return (
    <svg className="h-11 w-auto" viewBox="0 0 21 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={ICON_COLOR}
        d="M19.6528 9.01222e-05L1.3471 0C0.6062 0 0 0.60336 0 1.34117V18.2244C0 18.962 0.6062 19.5656 1.3471 19.5656L15.83 19.5657L21 24.0001L20.9997 1.34132C20.9997 0.60372 20.3937 9.01222e-05 19.6528 9.01222e-05ZM10.5188 16.2998C9.6623 16.2998 8.968 15.6086 8.968 14.756C8.968 13.9033 9.6625 13.2121 10.5188 13.2121C11.3753 13.2121 12.0695 13.9033 12.0695 14.756C12.0695 15.6086 11.3753 16.2998 10.5188 16.2998ZM10.5188 12.0682C9.3479 12.0682 8.3899 4.9794 8.3899 4.9794C8.3899 4.57562 9.3479 4.2454 10.5188 4.2454C11.6897 4.2454 12.6477 4.57564 12.6477 4.9794C12.6477 4.9794 11.6897 12.0682 10.5188 12.0682Z"
      />
    </svg>
  )
}

function TasksIcon() {
  return (
    <svg className="w-11 h-11" viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <path
        fill={ICON_COLOR}
        d="M7.875 0H21V5.25H7.875V0ZM7.875 7.875H21V13.125H7.875V7.875ZM7.875 15.75H21V21H7.875V15.75ZM3.9375 1.3125V3.9375H1.3125V1.3125H3.9375ZM5.25 0H0V5.25H5.25V0ZM3.9375 17.0625V19.6875H1.3125V17.0625H3.9375ZM5.25 15.75H0V21H5.25V15.75ZM6.9562 7.74375L6.1687 6.69375L4.9875 7.875H0V13.125H5.25V9.45L6.9562 7.74375ZM3.54375 9.1875L2.625 10.1062L1.575 9.1875H3.54375ZM1.3125 10.7625L2.49375 11.8125H1.3125V10.7625ZM3.9375 11.8125H2.75625L3.9375 10.6312V11.8125Z"
      />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg className="w-11 h-11" viewBox="0 0 24 24" fill={ICON_COLOR} aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
    </svg>
  )
}

export default function EdgeCaseOverview() {
  return (
    <div className="w-full grow flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch grow">
        {/* Left panel - KPI Status */}
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col h-full">
          <div className="px-4 py-3">
            <div className="text-base font-bold text-gray-900">KPI Status</div>
          </div>
          <CountRow items={kpiCounts} align="baseline" className="mb-3 mt-0" />
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
            <TargetFilledIcon />
            <div className="mt-3.5 text-[15px] font-bold text-gray-900">No KPIs Found</div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-500 max-w-[280px]">
              Set up key performance indicators for EMS to monitor real-time operational metrics.
            </p>
          </div>
          <div className="flex-1 border-t border-gray-100 flex flex-col">
            <div className="px-4 pt-3.5 pb-1">
              <span className="text-[12.5px] font-bold text-gray-800">Equipment wise status of KPIs</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-5">
              <WrenchIcon />
              <div className="mt-2.5 text-[13.5px] font-semibold text-gray-600">No equipment linked</div>
            </div>
          </div>
        </div>

        {/* Middle panel - Incidents */}
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col h-full">
          <div className="px-4 py-3">
            <div className="text-base font-bold text-gray-900">Incidents</div>
          </div>
          <div className="flex-1 flex flex-col min-h-0">
            <CountRow items={incidentCounts} align="center" className="mb-3 mt-2" />
            <IncidentsTrendFrame />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-6">
            <IncidentsIcon />
            <div className="mt-3.5 text-[15px] font-bold text-gray-900">No Active Incidents</div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-500 max-w-[240px]">
              No incidents reported for this asset today.
            </p>
          </div>
        </div>

        {/* Right panel - Tasks Summary */}
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col h-full">
          <div className="px-4 py-3">
            <div className="text-base font-bold text-gray-900">Tasks Summary</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
            <TasksDonut />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-4">
            <TasksIcon />
            <div className="mt-3.5 text-[15px] font-bold text-gray-900">No Active Tasks</div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-500 max-w-[250px]">
              Tasks created for or assigned to this unit will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
