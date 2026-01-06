import React, { useContext, useEffect } from 'react'
import AppointmentsContext from '../../AppointmentsContext'
import { Box, Typography } from '@mui/material'
import AppointmentCard from './AppointmentCard'
import AuthContext from '../../authContext'

const MyAppointments = (props) => {
  
  const {btnState} = props

  const context = useContext(AppointmentsContext)
  const {fetchPatAppointments , patAppointments} = context

  const context2 = useContext(AuthContext)
  const {currentUser , fetchCurrentUser , fetchUsers , allUsers} = context2 

  

  useEffect(()=>{
    fetchPatAppointments();
    fetchCurrentUser();
    fetchUsers();
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Box sx={{p:4}}>
        <Typography variant="h5" sx={{fontWeight:"bold",textAlign:"center",p:2}} color="initial">{btnState === "My Appointments" ? "My Appointments" : ""}</Typography>
        {patAppointments.map((item)=>{
          
          const doctor = allUsers.filter((user)=>user._id === item.doctorId)
          
          return (
            <Box key={item.receiptNum} >
              <AppointmentCard  appointment={item} patient={currentUser} doctor={doctor}/><br /><br />
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default MyAppointments