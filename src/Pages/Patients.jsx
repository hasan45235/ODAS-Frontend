import { Box, Toolbar } from '@mui/material'
import React, { useContext, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../Components/SideBar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '../Components/Modal';
import AuthContext from '../authContext';

const Patients = () => {
  
  const patRef = useRef()

  const context = useContext(AuthContext)
  const {fetchUsers , allUsers} = context

  
  const checkUserPatient = (user) =>{
    
    return user.role === "patient"
  }
  const allPatients = allUsers.filter((user)=>(checkUserPatient(user)))

  useEffect(()=>{
    fetchUsers()
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />

          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >Patients Id</TableCell>
                    <TableCell >Name</TableCell>
                    <TableCell >Age</TableCell>
                    <TableCell >Contact</TableCell>
                    <TableCell >Status</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {allPatients.map((user)=>{
                  return (
                    <TableRow
                    onClick={()=>{patRef.current.click()}}
                    key={user._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">0001</TableCell>
                    <TableCell >{user.name}</TableCell>
                      <TableCell >{user.age}</TableCell>
                      <TableCell >{user.contact}</TableCell>
                      <TableCell >{user.status}</TableCell>
                    </TableRow>
                    
                    )
                  })}
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Modal refs={patRef}/>
        </Box>
      </Box>
    </>
  )
}

export default Patients