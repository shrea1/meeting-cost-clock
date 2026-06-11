import { useMeeting } from '../hooks/useMeeting'
import { X } from 'lucide-react'

const AVATAR_COLORS = [
    { bg: '#2d3a2f', text: '#a8c0a0' },
    { bg: '#2d3a3a', text: '#a0c0bc' },
    { bg: '#3a2d3a', text: '#c0a0bc' },
    { bg: '#3a3a2d', text: '#c0bca0' },
]

function getInitials(name){
    return name
        .split(' ')
        .map((part) => part[0].toUpperCase())
        .join('')
        .slice(0,2);

}

function getShareCost(salary, totalSalary, totalCost) {
    if (totalSalary === 0) return 0;
    return (salary / totalSalary) * totalCost;
}

export default function AttendeeList(){
    const {state, dispatch} = useMeeting();
    const {attendees, elapsed} = state;

    const totalSalary = attendees.reduce((sum, attendee) => sum + attendee.salary, 0);
    const costPerSecond = totalSalary / (160 * 3600);
    const totalCost = costPerSecond * elapsed; // Keep as a number

    if(attendees.length === 0){
        return (
            <div className="p-8 text-center text-text-muted text-sm border-b border-line/50">
                No attendees added yet. Add one below to start.
            </div>
        )
    }

    return(
        <div className="px-6 pt-5 pb-2 border-b border-line/50">
            {/* header */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-text-muted">
                    Attendees
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-bg-secondary text-text-muted">
                    {attendees.length} {attendees.length === 1 ? 'person' : 'people'}
                </span>
            </div>

            {/* Attendee */}
            <div className="flex flex-col gap-1">
                {attendees.map((attendee, index) => {
                    const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
                    const share = getShareCost(attendee.salary, totalSalary, totalCost)

                    return (
                        <div
                            key={attendee.id}
                            className="group flex items-center gap-4 py-3 px-3 -mx-3 rounded-2xl transition-all duration-300 hover:bg-bg-secondary/40 border border-transparent hover:border-line/30"
                        >
                            {/* Avatar */}
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-inner"
                                style={{ background: color.bg, color: color.text }}
                              >
                                {getInitials(attendee.name)}
                            </div>

                            {/* Name + salary */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate text-text-base transition-colors duration-200 group-hover:text-brand">
                                    {attendee.name}
                                </p>
                                <p className="text-xs text-text-muted">
                                    NPR {attendee.salary.toLocaleString('en-IN')}/mo
                                </p>
                            </div>

                            {/* Share cost */}
                            <div className="text-right mr-1">
                                <p className="text-[10px] uppercase tracking-wider text-text-muted font-medium">
                                    share
                                </p>
                                <p className="text-sm font-mono font-semibold text-text-base">
                                    NPR {share.toFixed(2)}
                                </p>
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => dispatch({ type: 'REMOVE_ATTENDEE', id: attendee.id })}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-danger 
                                           bg-transparent hover:bg-danger/10 active:bg-danger/25
                                           transition-all duration-300 cursor-pointer
                                           opacity-0 group-hover:opacity-100
                                           scale-90 group-hover:scale-100"
                                title="Remove attendee"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}