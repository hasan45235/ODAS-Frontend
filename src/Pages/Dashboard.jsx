import { Box, Toolbar } from '@mui/material'
import React from 'react'
import SideBar from '../Components/SideBar'
import { Outlet } from 'react-router-dom'
import Card from '../Components/Card'
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Dashboard = () => {
    

  return (
    <>
      <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
          <Card title='Total Patients' desc='data' icon={<PersonIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
          <Card title='Total Doctors' desc='data' icon={<i className="fa-solid fa-user-doctor fa-2xl" style={{fontSize:"40px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}} ></i>} />
          <Card title='Total Appointments' desc='data' icon={<ListAltIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
          <Card title='Pending Approvals' desc='data' icon={<PendingActionsIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Pending Appointments</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                  <TableRow
                    key="name"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">name</TableCell>
                    <TableCell align="right">calories</TableCell>
                    <TableCell align="right">fat</TableCell>
                    <TableCell align="right">carbs</TableCell>
                    <TableCell align="right">protein</TableCell>
                  </TableRow>
                
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default Dashboard