import { useMeeting } from '../hooks/useMeeting'
import { useExchangeRate } from '../hooks/useExchangeRate'

export default function CostDisplay() {
  const { state } = useMeeting()
  const { convert, loading: ratesLoading } = useExchangeRate()

  const totalSalary = state.attendees.reduce((sum, a) => sum + a.salary, 0)
  const costPerSec = totalSalary / (160 * 3600)
  const totalCost = costPerSec * state.elapsed

  const converted = convert(totalCost)

  const showRate = state.isRunning || state.elapsed > 0
  const rateDisplay = showRate ? `NPR ${(costPerSec * 60).toFixed(2)}/min` : 'NPR 0/min'

  return (
    <div className="flex flex-col items-center py-10 px-4">

      {/* Main cost number */}
      <div className="flex items-baseline gap-2 select-none transition-transform duration-300 hover:scale-[1.02]">
        <span className="text-xl font-serif font-semibold text-text-muted">NPR</span>
        <span className="text-7xl font-serif font-semibold tracking-tight text-gradient-cost">
          {totalCost.toFixed(2)}
        </span>
      </div>

      {/* Timer */}
      <p className="text-xl font-mono font-medium text-text-base mt-2 tracking-wider">
        {formatTime(state.elapsed)}
      </p>

      {/* Rate */}
      <p className="text-xs text-text-muted mt-1 font-medium">
        total meeting cost · {rateDisplay}
      </p>

      {/* Currency conversions */}
      {!ratesLoading && converted && (
        <div className="flex gap-6 mt-6 bg-bg-secondary/35 px-6 py-3 rounded-2xl border border-line/30 transition-all duration-300 hover:border-brand/30">
          <div className="text-center transition-transform duration-300 hover:scale-105">
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">USD</p>
            <p className="text-sm font-mono font-semibold text-text-base">
              ${converted.usd}
            </p>
          </div>
          <div className="h-8 w-px bg-line/60" />
          <div className="text-center transition-transform duration-300 hover:scale-105">
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">EUR</p>
            <p className="text-sm font-mono font-semibold text-text-base">
              €{converted.eur}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}