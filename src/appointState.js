import { useState } from "react";
import AppointmentsContext from "./AppointmentsContext";

const AppointmentsState = ({children}) => {
  
  const [appointments, setAppointments] = useState([]);
  const [specificAppointments,setSpecificAppointments] = useState([])

  const [loading, setLoading] = useState(true)

  const API = "https://odas-backend.vercel.app/appointments"
  const API_PAT = "https://odas-backend.vercel.app/appointments/PatAppointments"
  const API_DOC = "https://odas-backend.vercel.app/appointments/DocAppointments"

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
    fetchPatAppointments()
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
    if (response.ok){
      setLoading(false)
    }
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
    <AppointmentsContext.Provider value={{addAppointment, fetchAllApointments , appointments , fetchPatAppointments , specificAppointments , fetchDocAppointments , updateAppointment, loading}}>
        {children}
    </AppointmentsContext.Provider>
  )
}




export default AppointmentsState;