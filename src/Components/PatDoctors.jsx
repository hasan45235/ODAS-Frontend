import React, { useContext, useEffect } from 'react'
import DashboardSidebar from './SideBar'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AuthContext from '../authContext'
import AddAppointment from './AddAppointment'

const PatDoctors = () => {
  
  const context = useContext(AuthContext)
  const {fetchUsers , allUsers} = context    

  const doctors = allUsers.filter((user)=>(user.role === "doctor"))

  

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [])    

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <Box>
            {doctors.map((user)=>{
              return(
                <Box key={user?._id} style={{border:"1px solid black", margin:"10px", padding:"10px", borderRadius:"5px"}}>
                  <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Box component="h3">Dr {user?.name}</Box>
                    <Button sx={{fontSize:"8px"}} variant="contained">View Details</Button>
                  </Box>
                  <Typography component="p"><strong>Specialization:</strong> {user?.speciality}</Typography>
                  <Typography component="p"><strong>Experience:</strong> {user?.experience}</Typography>
                  <Typography component="p"><strong>Fee range:</strong> {user?.fee}</Typography>
                </Box>
              )
            })}
          </Box>
          <AddAppointment  />
        </Box>
      </Box>
    </>
  )
}

export default PatDoctors