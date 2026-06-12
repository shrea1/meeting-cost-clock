import { useReducer, useEffect } from 'react'
import { MeetingContext } from './MeetingContext'

const initialState = {
    attendees : [],
    elapsed : 0,
    isRunning : false,
    history : [],
}

function reducer(state , action){
    switch(action.type){
        case 'ADD_ATTENDEE':
            return {
                ...state,
                attendees : [
                    ...state.attendees,
                    {
                        id : Date.now(),
                        name : action.name,
                        salary : action.salary,
                    },
                ],
            }
        
        case 'REMOVE_ATTENDEE':
            return {
                ...state,
                attendees : state.attendees.filter((attendee) => attendee.id !== action.id),
            } 
        
        case 'TICK' :
            return {
                ...state,
                elapsed : state.elapsed + (action.amount || 1),
            }   
         
        case 'SET_RUNNING' :
            return {
                ...state,
                isRunning : action.value,
            }
            
        case 'RESET' :
            return{
                ...state,
                elapsed : 0,
                isRunning : false,
            }  

        case 'SAVE_TO_HISTORY':
            return {
                ...state,
                history: [action.entry, ...state.history],
                elapsed: 0,
                isRunning: false,
            }    
            
        default :
            return state    
    }
}

export function MeetingProvider({children}){
    const [state , dispatch] = useReducer(reducer , initialState, () => {
        try {
            const saved = localStorage.getItem('meeting_cost_clock_state')
            if (saved) {
                const parsed = JSON.parse(saved)
                return {
                    attendees: parsed.attendees || [],
                    elapsed: typeof parsed.elapsed === 'number' ? parsed.elapsed : 0,
                    isRunning: false, // Pause on initial load for safety
                }
            }
        } catch (e) {
            console.error('Failed to parse meeting state from localStorage', e)
        }
        return initialState
    });

    useEffect(() => {
        try {
            localStorage.setItem('meeting_cost_clock_state', JSON.stringify({
                attendees: state.attendees,
                elapsed: state.elapsed,
                isRunning: state.isRunning,
            }))
        } catch (e) {
            console.error('Failed to save meeting state to localStorage', e)
        }
    }, [state])

    return (
        <MeetingContext.Provider value={{state , dispatch}}>
            {children}
        </MeetingContext.Provider>
    )
}
