import React, { useContext, useEffect } from 'react'
import AppointmentsContext from '../../AppointmentsContext'
import { Box, Typography } from '@mui/material'
import AppointmentCard from './AppointmentCard'
import AuthContext from '../../authContext'
import { Oval } from 'react-loader-spinner'


const MyAppointments = () => {
  

  const context = useContext(AppointmentsContext)
  const { 
    fetchPatAppointments, 
    specificAppointments

  } = context

  const context2 = useContext(AuthContext)
  const {currentUser , fetchCurrentUser , fetchUsers , allUsers} = context2 

  // const [loadState, setLoadState] = useState(true)

  useEffect(()=>{
    fetchPatAppointments();
    fetchCurrentUser();
    fetchUsers();
    // setLoadState(false);
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Box sx={{p:4}}>
        <Typography variant="h5" sx={{fontWeight:"bold",textAlign:"center",p:2}} color="initial">{specificAppointments.length !== 0 ? "My Appointments" : ""}</Typography>

        {specificAppointments.length === 0 || !specificAppointments ? (
          <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
            <Oval  height="14vh" width="14vw" color="#1976d2" visible={true} ariaLabel="oval-loading" secondaryColor="#1976d2" strokeWidth={2} strokeWidthSecondary={2} />
          </Box>
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