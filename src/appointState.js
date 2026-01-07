import { useState } from "react";
import AppointmentsContext from "./AppointmentsContext";

const AppointmentsState = ({children}) => {
  
  const [appointments, setAppointments] = useState([]);
  const [specificAppointments,setSpecificAppointments] = useState([])

  const API = "http://localhost:5000/appointments"
  const API_PAT = "http://localhost:5000/appointments/PatAppointments"
  const API_DOC = "http://localhost:5000/appointments/DocAppointments"

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
    const response = await fetch(API_PAT, {
      method: 'GET',    
        headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
        },
    });
    const json = await response.json();
    console.log(json);
    setSpecificAppointments(json);
  }

  const fetchDocAppointments = async () => {
    const response = await fetch(API_DOC, {
      method: 'GET',    
        headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
        },
    });
    const json = await response.json();
    console.log(json);
    setSpecificAppointments(json);
  }

  const updateAppointment = async(data , id) => {
    const response = await fetch(`${API}/${id}`,{
      method:"PUT",
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
      body:JSON.stringify({status:data})
    })
    const json = await response.json()
    console.log(json)
    fetchDocAppointments();
  }

  
  return (
    <AppointmentsContext.Provider value={{addAppointment, fetchAllApointments , appointments , fetchPatAppointments , specificAppointments , fetchDocAppointments , updateAppointment}}>
        {children}
    </AppointmentsContext.Provider>
  )
}




export default AppointmentsState;