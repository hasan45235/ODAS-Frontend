import { useState } from "react";
import AppointContext from "./availibilityContext";

const AppointState = ({children}) => {
  

    const API = 'http://localhost:5000/availability';
    const API_2 = 'http://localhost:5000/availability/doctorAvailability';

    const [availability, setAvailability] = useState([])

    const [specificAvailability, setSpecificAvailability] = useState([])


    const fetchAvailability = async () => {
        const response = await fetch(API , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
        });
        const json = await response.json();
        setAvailability(json)
        
        
    }

    const addAvailability = async (data,doctorId) => {
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
        fetchSpecificAvailability();
        console.log("Schedule Added Successfully",json);
    }

    const fetchSpecificAvailability = async () => {
        const response = await fetch(API_2 , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
        });
        const json = await response.json();
        setSpecificAvailability(json)
        
        
    }


    return (
    <AppointContext.Provider value={{ fetchAvailability , availability , addAvailability, fetchSpecificAvailability , specificAvailability}}>
      {children}
    </AppointContext.Provider>
  )
}
export default AppointState;