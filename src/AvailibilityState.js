import { useState } from "react";
import AppointContext from "./availibilityContext";
import userEvent from "@testing-library/user-event";

const AppointState = ({children}) => {
  

    const API = 'http://localhost:5000/availability';

    const [avaibility, setAvaibility] = useState([])

    const fetchAvailibity = async () => {
        const response = await fetch(API , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
        });
        const json = await response.json();
        setAvaibility(json)
        // setAppointments(json)    
        
    }

    const addAvaibility = async (data,userId) => {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
            body: JSON.stringify({data,userId})
        });
        const json = await response.json();
        console.log("Schedule Added Successfully",json);
    }


    return (
    <AppointContext.Provider value={{ fetchAvailibity , avaibility , addAvaibility}}>
      {children}
    </AppointContext.Provider>
  )
}
export default AppointState;