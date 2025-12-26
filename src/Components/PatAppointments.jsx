import React from 'react'
import DashboardSidebar from './SideBar'
import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'

const PatAppointments = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <Box>
            
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PatAppointments