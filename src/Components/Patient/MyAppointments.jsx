import React, { useContext, useEffect } from 'react'
import AppointmentsContext from '../../AppointmentsContext'
import { Box, Typography } from '@mui/material'
import AppointmentCard from './AppointmentCard'
import AuthContext from '../../authContext'

const MyAppointments = () => {
  

  const context = useContext(AppointmentsContext)
  const {fetchPatAppointments , specificAppointments} = context

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
        <Typography variant="h5" sx={{fontWeight:"bold",textAlign:"center",p:2}} color="initial">{specificAppointments.length !== 0 ? "My Appointments" : ""}</Typography>

        {specificAppointments.length === 0 ? (
          <Typography variant="body1" sx={{textAlign:"center",p:2}}>No appointments found.</Typography>
        ) : (
          specificAppointments.map((item)=>{
          
          const doctor = allUsers.filter((user)=>user._id === item.doctorId)
          
          return (
            <Box key={item.receiptNum} >
              <AppointmentCard  appointment={item} patient={currentUser} doctor={doctor}/><br /><br />
            </Box>
          )
        }))}
      </Box>
    </>
  )
}

export default MyAppointments