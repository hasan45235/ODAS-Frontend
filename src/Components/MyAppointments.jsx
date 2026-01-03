import React, { useContext, useEffect } from 'react'
import AppointmentsContext from '../AppointmentsContext'
import { Box } from '@mui/material'
import AppointmentCard from './AppointmentCard'
import AuthContext from '../authContext'

const MyAppointments = () => {
  
  const context = useContext(AppointmentsContext)
  const {fetchPatAppointments , patAppointments} = context

  const context2 = useContext(AuthContext)
  const {} = context2 

  useEffect(()=>{
    fetchPatAppointments()
  },[])

  return (
    <>
      <Box>
        {patAppointments.map((item)=>{
          return (
            <>
              <AppointmentCard appointment={item} /><br /><br />
            </>
          )
        })}
      </Box>
    </>
  )
}

export default MyAppointments