import { Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import SideBar from '../Components/SideBar'
import { Outlet } from 'react-router-dom'
import Card from '../Components/Card'
import PersonIcon from '@mui/icons-material/Person';

const Dashboard = () => {
    

  return (
    <>
      <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
        <Box>
          <Card title='Total Patients' desc='data' icon={<PersonIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px"}}/>} />
          <Card title='Total Doctors' desc='data' icon={<PersonIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px"}}/>} />
          <Card title='Total Appointments' desc='data' icon={<PersonIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px"}}/>} />
          <Card title='Pending Approvals' desc='data' icon={<PersonIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px"}}/>} />
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default Dashboard