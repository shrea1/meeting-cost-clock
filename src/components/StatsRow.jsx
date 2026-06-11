import { useMeeting } from '../hooks/useMeeting'
import { Users, Coins, Clock } from 'lucide-react'

export default function StatsRow() {
  const { state } = useMeeting()
  const { attendees } = state

  const totalSalary = attendees.reduce((sum, a) => sum + a.salary, 0)
  
  // Based on 160 working hours/month (576,000 seconds) to match mockup metrics exactly
  const costPerSec = totalSalary / (160 * 3600)
  const costPerMin = costPerSec * 60

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Attendees Card */}
      <div className="relative p-5 rounded-3xl bg-bg-card border border-line shadow-card transition-all duration-300 hover:border-brand/40 hover:scale-[1.02] hover:shadow-md">
        <div className="absolute top-4 right-4 p-1.5 rounded-lg bg-bg-secondary/40 border border-line/50 text-text-muted">
          <Users className="w-4 h-4" />
        </div>
        <p className="text-3xl font-serif font-bold text-text-base leading-tight">
          {attendees.length}
        </p>
        <p className="text-[10px] tracking-wider text-text-muted font-bold uppercase mt-2">
          Attendees
        </p>
      </div>

      {/* Combined Monthly Salary Card */}
      <div className="relative p-5 rounded-3xl bg-bg-card border border-line shadow-card transition-all duration-300 hover:border-brand/40 hover:scale-[1.02] hover:shadow-md">
        <div className="absolute top-4 right-4 p-1.5 rounded-lg bg-bg-secondary/40 border border-line/50 text-text-muted">
          <Coins className="w-4 h-4" />
        </div>
        <p className="text-3xl font-serif font-bold text-text-base leading-tight truncate pr-6">
          {totalSalary.toLocaleString('en-IN')}
        </p>
        <p className="text-[10px] tracking-wider text-text-muted font-bold uppercase mt-2">
          Combined / Month
        </p>
      </div>

      {/* Cost per Minute Card */}
      <div className="relative p-5 rounded-3xl bg-bg-card border border-line shadow-card transition-all duration-300 hover:border-brand/40 hover:scale-[1.02] hover:shadow-md">
        <div className="absolute top-4 right-4 p-1.5 rounded-lg bg-bg-secondary/40 border border-line/50 text-text-muted">
          <Clock className="w-4 h-4" />
        </div>
        <p className="text-3xl font-serif font-bold text-text-base leading-tight truncate pr-6">
          NPR {costPerMin.toFixed(2)}
        </p>
        <p className="text-[10px] tracking-wider text-text-muted font-bold uppercase mt-2">
          Cost / Minute
        </p>
      </div>
    </div>
  )
}
