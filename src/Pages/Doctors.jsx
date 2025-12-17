import { Box, Button, Toolbar } from '@mui/material'
import React, {useContext, useEffect, useRef, useState} from 'react'
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
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../authContext';
import AddDoctorModal from '../Components/AddDoctorModal';

const Doctors = () => {

  const context = useContext(AuthContext)
  // eslint-disable-next-line
  const { addDoctor , fetchUsers , allUsers} = context

  const docRef = useRef()
  const addDocRef = useRef()
  

  const checkUserDoctor = (user) =>{
    
    return user.role == "doctor"
  }
  const allDoctors = allUsers.filter((user)=>(checkUserDoctor(user)))

  const doctorcheck = () => {
    console.log(allDoctors)
  }

  useEffect(()=>{
    fetchUsers();
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <AddDoctorModal docRef={addDocRef} />
          <Button variant="contained" onClick={()=>{addDocRef.current.click()}} endIcon={<AddIcon />}>Add a Doctor</Button>
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >Doctor Id</TableCell>
                    <TableCell >Name</TableCell>
                    <TableCell >Age</TableCell>
                    <TableCell >Contact</TableCell>
                    <TableCell >Status</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {allDoctors.map((user)=>{
                  return (
                    
                    <TableRow

                    onClick={()=>{docRef.current.click()}}
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
          <Button onClick={()=>{doctorcheck()}}>click me</Button>     
          <Modal refs={docRef}/>
        </Box>
      </Box>
    </>

  )
}

export default Doctors