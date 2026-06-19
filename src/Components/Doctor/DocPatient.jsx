import { Box, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from "../SideBar"
import AppointmentsContext from '../../AppointmentsContext'
import AuthContext from '../../authContext'
import { Oval } from 'react-loader-spinner'

const DocPatients = () => {


  const context = useContext(AppointmentsContext)
  const {fetchDocAppointments,specificAppointments} = context

  const context2 = useContext(AuthContext)
  const {fetchUsers , allUsers } = context2

  const [loading,setLoading] = useState(true)


  const completedAppointments = specificAppointments.filter((item)=> item.status === "completed")


  useEffect(()=>{
    fetchUsers()
    fetchDocAppointments()
    setLoading(false)
    //eslint-disable-next-line
  },[])

  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Box>
               
              <Card sx={{ borderRadius: 3, boxShadow: 3  }}>
                <CardContent >
                  <Typography variant="h5" sx={{fontWeight:"bold",mt:4,mb:2}} color="initial">Patients You Have Consulted</Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100", "& th": { fontWeight: 600, fontSize: 13, textTransform: "uppercase", color: "text.secondary" }}}>
                          <TableCell>Appointment No.</TableCell>
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Time Slot</TableCell>
                          <TableCell>Fees</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {loading ? (
                        <Box sx={{width:"100%",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                          <Oval  height="14vh" width="14vw" color="#1976d2" visible={true} ariaLabel="oval-loading" secondaryColor="#1976d2" strokeWidth={2} strokeWidthSecondary={2} />
                        </Box>
                      ) :  completedAppointments.length === 0 ? (
                          <Typography sx={{ p:4}}>No patients consulted yet.</Typography>
                      ) : (completedAppointments.map((item, index) => {
                        const patient = allUsers.find((user) => user._id === item.patientId);
                        return (
                          <TableRow key={index} hover sx={{ cursor: "pointer",transition:"0.3s", "&:last-child td": { borderBottom: 0 } }}  >
                            <TableCell><Typography fontWeight={600}>#{item.receiptNum}</Typography></TableCell>
                            <TableCell>
                              <Typography fontWeight={500}>{patient?.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{patient?.contact}</Typography>
                            </TableCell>
                            <TableCell><Typography>{item.bookedDate}</Typography></TableCell>
                            <TableCell><Typography>{item.bookedSlot}</Typography></TableCell>
                            <TableCell>
                              <Chip size="small" label={item.status.toUpperCase()} color={ item.status === "pending" ? "warning" : item.status === "approved" ? "success" : item.status === "rejected" ? "error" : "primary"} sx={{ fontWeight: 600 }}/>
                            </TableCell>
                          </TableRow>
                          
                        );
                      }))}
                      </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
            </Box>
          </Box>
      </Box>
      </Box>
    </>
  )
}

export default DocPatients