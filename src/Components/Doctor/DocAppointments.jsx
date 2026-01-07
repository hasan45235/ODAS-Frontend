import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from "../SideBar"

const DocAppointment = () => {

  

  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Box>
                Doctor Appointments
            </Box>
          </Box>
      </Box>
      </Box>
    </>
  )
}

export default DocAppointment