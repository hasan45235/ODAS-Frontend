import { useState } from "react";
import ScheduleContext from "./scheduleContext";

const ScheduleState = ({children}) => {
  
    const API = 'https://odas-backend.vercel.app/availability';
    const API_2 = 'https://odas-backend.vercel.app/availability/doctorAvailability';

    const [schedule, setSchedule] = useState([])

    const [specificSchedule, setSpecificSchedule] = useState([])


    const fetchSchedule = async () => {
        const response = await fetch(API , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
        });
        const json = await response.json();
        setSchedule(json)
        
        
    }

    const addSchedule = async (data,doctorId) => {
        console.log("Adding schedule for user:", doctorId,data);
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
            body: JSON.stringify({...data,doctorId})
        });
        const json = await response.json();
        fetchSpecificSchedule();
        console.log("Schedule Added Successfully",json);
    }

    const fetchSpecificSchedule = async () => {
        const response = await fetch(API_2 , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
        });
        const json = await response.json();
        setSpecificSchedule(json)
        
        
    }

    const updateSchedule = async(data , id) => {
        const response = await fetch(`${API}/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
            body: JSON.stringify({...data})
        })
        const json = await response.json()
        console.log(json)
        fetchSpecificSchedule();
    }


    return (
    <ScheduleContext.Provider value={{ fetchSchedule , schedule , addSchedule, fetchSpecificSchedule , specificSchedule, updateSchedule}}>
      {children}
    </ScheduleContext.Provider>
  )
}
export default ScheduleState;