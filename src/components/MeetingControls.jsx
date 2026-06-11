import { useMeeting } from '../hooks/useMeeting'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function MeetingControls() {
  const { state, dispatch } = useMeeting()
  const { isRunning, attendees } = state

  const handleToggle = () => {
    if (attendees.length === 0 && !isRunning) {
      alert('Please add at least one attendee to start the meeting cost clock.')
      return
    }
    dispatch({ type: 'SET_RUNNING', value: !isRunning })
  }

  const handleReset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <div className="flex justify-center items-center gap-4 py-4 px-6 bg-bg-card/10 border-t border-line/40">
      {/* Start / Pause Button */}
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold select-none shadow-md
                   transition-all duration-300 cursor-pointer hover:shadow-lg active:scale-[0.97]
                   ${isRunning 
                     ? 'bg-bg-secondary text-text-base hover:bg-bg-secondary/80 border border-line' 
                     : 'bg-brand text-text-on-primary hover:bg-brand/90 hover:scale-[1.02] shadow-brand/10'
                   }`}
      >
        {isRunning ? (
          <>
            <Pause className="w-4 h-4" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            Start
          </>
        )}
      </button>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold select-none
                   border border-line/80 text-text-muted hover:text-text-base hover:bg-bg-secondary/60 hover:border-brand/40
                   active:scale-[0.97] transition-all duration-300 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  )
}
