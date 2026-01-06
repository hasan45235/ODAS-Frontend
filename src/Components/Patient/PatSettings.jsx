import { Box, Toolbar } from '@mui/material'
import React from 'react'
import DashboardSidebar from '../SideBar'
import { Outlet } from 'react-router-dom'

const PatSettings = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Box>
                heh
            </Box>
          </Box>
      </Box>
    </>
  )
}

export default PatSettings