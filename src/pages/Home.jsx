import AttendeeForm from "@/components/AttendeeForm";
import AttendeeList from "@/components/AttendeeList";
import CostDisplay from "@/components/CostDisplay";
import WeatherBar from "@/components/WeatherBar";
import MeetingControls from "@/components/MeetingControls";
import StatsRow from "@/components/StatsRow";
import Navbar from "@/components/Navbar";
import { useInterval } from "../hooks/useInterval";
import { useMeeting } from "../hooks/useMeeting";

export default function Home() {
    const { state, dispatch } = useMeeting();

    // Hook to drive the timer ticking, with catch-up logic for tab inactivity
    useInterval((amount) => {
        dispatch({ type: 'TICK', amount });
    }, state.isRunning);

    return(
       <div className="min-h-screen p-6 bg-bg-page transition-colors duration-500">
            <div className="max-w-2xl mx-auto space-y-5">
                
                {/* Navbar Header */}
                <Navbar />

                {/* Weather Bar */}
                <WeatherBar />

                {/* Cost Display & Controls */}
                <div className="rounded-3xl overflow-hidden clock-card shadow-card border border-line">
                    <CostDisplay />
                    <MeetingControls />
                </div>

                {/* StatsRow */}
                <StatsRow />

                {/* Attendee card */}
                <div className="rounded-3xl shadow-card overflow-hidden bg-bg-card border border-line transition-all duration-400 hover:border-brand/20 hover:shadow-xl">
                    {/* Attendee List */}
                    <AttendeeList />
                    {/* Attendee Form */}
                    <AttendeeForm />
                </div>
            </div>
       </div>              
    )
}