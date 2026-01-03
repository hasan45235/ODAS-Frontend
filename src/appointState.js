import { useState } from "react";
import AppointmentsContext from "./AppointmentsContext";

const AppointmentsState = ({children}) => {
  
  const [appointments, setAppointments] = useState([]);
  const [patAppointments,setPatAppointments] = useState([])

  const API = "http://localhost:5000/appointments"
  const API_2 = "http://localhost:5000/appointments/fetchPatSpecApp"

  const addAppointment = async (data , id)=>{
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
      body:JSON.stringify({...data,patientId:id})
    });
    const json = await response.json();
    console.log(json)
    fetchAllApointments()
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

  
  const fetchPatAppointments = async () => {
    const response = await fetch(API_2, {
      method: 'GET',    
        headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
        },
    });
    const json = await response.json();
    console.log(json);
    setPatAppointments(json);
  }

  
  return (
    <AppointmentsContext.Provider value={{addAppointment, fetchAllApointments , appointments , fetchPatAppointments , patAppointments}}>
        {children}
    </AppointmentsContext.Provider>
  )
}




export default AppointmentsState;