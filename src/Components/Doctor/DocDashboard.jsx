import {  Box, Card, CardContent,  Divider, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from "../SideBar"
import DashCard from "../Card"
import PersonalInjuryIcon from '@mui/icons-material/PersonalInjury';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AppointmentsContext from '../../AppointmentsContext'
import AuthContext from '../../authContext'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Oval } from 'react-loader-spinner'



const InfoRow = ({ appointment , patient , type }) => {

  function capitalizeFirstLetter(string) {
    if (!string) return ""; 
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  const context = useContext(AppointmentsContext)
  const {updateAppointment} = context

  const handleUpdate = (status , id) => {
    updateAppointment(status , id)
  }

  return (
    <Box sx={{ display: "flex", justifyContent:"space-between", alignItems:"center", p: 1.5, borderRadius: 2, bgcolor: "background.paper", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", '&:hover':{boxShadow:"0px 0px 5px grey",transition:"0.5s",transform:'translateY(-1px)',cursor:"pointer"}}}>
      <Typography variant="body1" color="initial">#{appointment?.receiptNum}</Typography>
      <Box>
        <Typography variant="body1" color="initial">{capitalizeFirstLetter(patient[0]?.name)}</Typography>
        <Typography variant="body1" sx={{fontSize:"12px"}} color="text.secondary">{patient[0]?.contact}</Typography>
      </Box>
      <Typography variant="body1" color="initial">{appointment?.bookedDate}</Typography>
      <Typography variant="body1" color="initial">{appointment?.bookedSlot}</Typography>
      {type && type === "Pending" ?  
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="fingerprint" color="success"><CheckCircleIcon onClick={()=>{handleUpdate("approve",appointment?._id)}}/></IconButton>
        <IconButton aria-label="fingerprint" color="error"><CancelIcon onClick={()=>{handleUpdate("rejected",appointment?._id)}}/></IconButton>
      </Stack> : null}
    </Box>
  );
};




const DocDashboard = () => {

  const context = useContext(AppointmentsContext)
  const {fetchDocAppointments,specificAppointments} = context

  const context2 = useContext(AuthContext)
  const {fetchUsers , allUsers} = context2

  const pendingApp = specificAppointments.filter((item)=> item.status === "pending")

  const todayDate = new Date().toLocaleDateString("en-GB");
  const todayApp = specificAppointments.filter((item)=> item.bookedDate === todayDate)

  useEffect(()=>{
    fetchDocAppointments()
    fetchUsers()
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Box >
              <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <DashCard title="Today's Appointments" desc="data" icon={<ListAltIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
                <DashCard title="Pending Requests" desc="data" icon={<PendingActionsIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
                <DashCard title="Completed Appointments" desc="data" icon={<OfflinePinIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
                <DashCard title="Patients Consulted" desc="data" icon={<PersonalInjuryIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
              </Box>
              <Card sx={{p:2,width:"95%",margin:"20px auto",borderRadius:3,boxShadow:3,bgcolor: "background.paper",}}>
                <CardContent>
                  <Typography variant="h5" sx={{fontWeight:"bold"}} color="initial">Pending Requests</Typography>
                  <Divider sx={{mb:3,mt:3}}/>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {pendingApp == 0 || pendingApp == null ? (
                      <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                        <Oval  height="14vh" width="14vw" color="#1976d2" visible={true} ariaLabel="oval-loading" secondaryColor="#1976d2" strokeWidth={2} strokeWidthSecondary={2} />
                      </Box>
                    ) : (
                      pendingApp.map((appointment)=>{
                        const patient = allUsers.filter((item)=> item._id === appointment.patientId)
                        return (
                          <InfoRow appointment={appointment} patient={patient} type="Pending"/>
                        )
                      }))}
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{p:2,width:"95%",margin:"20px auto",borderRadius:3,boxShadow:3,bgcolor: "background.paper",}}>
                <CardContent>
                  <Typography variant="h5" sx={{fontWeight:"bold"}} color="initial">Today's Schedule</Typography>
                  <Divider sx={{mb:3,mt:3}}/>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {todayApp == 0 || todayApp == null ? (
                      <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                        <Oval  height="14vh" width="14vw" color="#1976d2" visible={true} ariaLabel="oval-loading" secondaryColor="#1976d2" strokeWidth={2} strokeWidthSecondary={2} />
                      </Box>
                    ) : (
                    todayApp.map((appointment)=>{
                      const patient = allUsers.filter((item)=> item._id === appointment.patientId)
                      return (
                        <InfoRow appointment={appointment} patient={patient} type="Today"/>
                      )
                    }))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
      </Box>
      </Box>
    </>
  )
}

export default DocDashboard