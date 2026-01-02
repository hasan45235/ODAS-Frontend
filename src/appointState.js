import { useState } from "react";
import AppointmentsContext from "./AppointmentsContext";

const AppointmentsState = ({children}) => {
  const [appointments, setAppointments] = useState([]);

  const API = "http://localhost:5000/appointments"

  const addAppointment = async ()=>{
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
    });
    const json = await response.json();
    console.log(json);
  }
    
  const fetchAllApointments = async () => {
    const response = await fetch(API, {
      method: 'GET',    
        headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
        },
    });
    const json = await response.json();
    console.log(json);
    setAppointments(json);
  }
  
  return (
    <AppointmentsContext.Provider value={{addAppointment, fetchAllApointments , appointments}}>
        {children}
    </AppointmentsContext.Provider>
  )
}




export default AppointmentsState;