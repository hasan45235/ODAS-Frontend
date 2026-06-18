import { Box,  Card, Tab, Tabs, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from "../SideBar"
import MySchedules from './MySchedules'
import AddAvaibility from './AddSchedule'

const DocSchedule = () => {
  
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    

  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Box>
              <Card sx={{p:2,boxShadow:3,borderRadius:1}}>
                <Box>
                  <Tabs onChange={handleChange} value={value} aria-label="Tabs" selectionFollowsFocus>
                    <Tab label="Add Schedule"/>
                    <Tab label="My Schedules"/>
                  </Tabs><br />
                  <Box>
                    {value === 0 ? <AddAvaibility/> : <MySchedules />}  
                  </Box>
                </Box>
              </Card>
            </Box>
            
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DocSchedule