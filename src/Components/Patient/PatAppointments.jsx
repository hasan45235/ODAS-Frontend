import React, {useState} from 'react'
import DashboardSidebar from '../SideBar'
import { Box,  Card, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddAppointment from './AddAppointment'
import MyAppointments from './MyAppointments'

const PatAppointments = () => {
  
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
        

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Card sx={{p:2}}>
              <Box>
                <Tabs onChange={handleChange} value={value} aria-label="Tabs where selection follows focus" selectionFollowsFocus>
                  <Tab label="Book Appointment"/>
                  <Tab label="My Appointments"/>
                </Tabs><br />
                <Box>
                  {value === 0 ? <AddAppointment/> : <MyAppointments/>}  
                </Box>
              </Box>
            </Card>

          </Box>
      </Box>
    </>
  )
}
export default PatAppointments