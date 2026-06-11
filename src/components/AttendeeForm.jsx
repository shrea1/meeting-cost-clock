import {useState} from 'react'
import { useMeeting } from '../hooks/useMeeting'

export default function AttendeeForm(){
    const {dispatch} = useMeeting();
    const [name , setName] = useState('');
    const [salary , setSalary] = useState('');
    const [error , setError] = useState('');
    const parsedSalary = parseFloat(salary);

    function handleAdd(){
        if(!name.trim()){
            setError('Please enter a name.');
            return;
        }

        if(!salary.trim()){
            setError('Please enter a salary.');
            return;
        }

        if (isNaN(parsedSalary) || parsedSalary <= 0) {
            alert("Please enter a valid salary amount");
            return;
        }

        dispatch({
            type : 'ADD_ATTENDEE',
            name : name.trim(),
            salary : parsedSalary,
        });

        setName('');
        setSalary('');
        setError('');
    }

    function handleKeyDown(event){
        if(event.key === 'Enter'){
            handleAdd();
        }
    }
    
    return (
        <div className="p-6 bg-bg-card/30">
            {error && (
                <p className="text-xs font-semibold mb-3 text-danger animate-pulse">{error}</p>
            )}
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-3.5 py-2 rounded-xl text-sm outline-none
                               bg-bg-input text-text-base border border-line/80
                               hover:border-brand hover:border-[1.5px] focus:border-brand focus:shadow-[0_0_12px_rgba(125,155,118,0.2)]
                               transition-all duration-200"
                />
                <input
                    type="number"
                    placeholder="Monthly salary (NPR)"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-3.5 py-2 rounded-xl text-sm outline-none
                               bg-bg-input text-text-base border border-line/80
                               hover:border-brand hover:border-[1.5px] focus:border-brand focus:shadow-[0_0_12px_rgba(125,155,118,0.2)]
                               transition-all duration-200"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap
                               bg-brand text-text-on-primary shadow-md shadow-brand/10
                               hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20
                               hover:scale-[1.02] active:scale-[0.98]
                               transition-all duration-300 cursor-pointer"
                >
                    + Add
                </button>
            </div>
        </div>
    )
}    
