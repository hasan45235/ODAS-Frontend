import { Box, Toolbar, Typography } from '@mui/material'
import React , {useContext, useEffect} from 'react'
import SideBar from '../SideBar'
import { Outlet } from 'react-router-dom'
import Card from '../Card'
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
import LoadingSpinner from '../../LoadingSpinner'
import AuthContext from '../../authContext'
import AppointmentsContext from '../../AppointmentsContext'

const Dashboard = () => {

  const context = useContext(AuthContext)
  const {fetchUsers , allUsers} = context

    
  const context2 = useContext(AppointmentsContext)
  const {fetchAllApointments,appointments } = context2


    
  const checkUserPatient = (user) =>{
    return user.role === "patient"
  }

  const checkUserDoctor = (user) =>{
    return user.role === "doctor"
  }

  const checkPendingAppointments = (item) =>{
    return item.status === "pending"
  }

  const allPatients = allUsers ? allUsers.filter((user)=>(checkUserPatient(user))) : []

  const allDoctors = allUsers ? allUsers.filter((user)=>(checkUserDoctor(user))) : []

  const pendingApp = appointments ? appointments.filter((item)=>(checkPendingAppointments(item))) : []

    useEffect(()=>{
        fetchUsers()
        fetchAllApointments()
      // eslint-disable-next-line
    },[])
  

  return (
    <>
      <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
        <Typography variant="body1" color="initial">{}</Typography>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
          <Card title='Total Patients' desc={allPatients.length} icon={<PersonIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
          <Card title='Total Doctors' desc={allDoctors.length} icon={<i className="fa-solid fa-user-doctor fa-2xl" style={{fontSize:"40px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}} ></i>} />
          <Card title='Total Appointments' desc={appointments.length} icon={<ListAltIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
          <Card title='Pending Approvals' desc={pendingApp.length} icon={<PendingActionsIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
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
        <Box>
          <LoadingSpinner />
        </Box>
      </Box>
    </Box>

    </>
  )
}

export default Dashboard