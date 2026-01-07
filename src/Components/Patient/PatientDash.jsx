import { Backdrop, Box, Card, CardContent, Divider, Fade, Modal, Toolbar, Typography } from '@mui/material'
import React, {  useContext, useEffect, useState } from 'react'
import {  Outlet} from 'react-router-dom'
import DashboardSidebar from '../SideBar'
import DashCard from '../Card'
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Avatar, Chip, Button } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import AddAppointment from './AddAppointment'
import MyAppointments from './MyAppointments'
import AppointmentsContext from '../../AppointmentsContext'



const Style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  overflow: "hidden"
};


const activityIconMap = {
  booked: <EventAvailableIcon fontSize="small" />,
  cancelled: <CancelIcon fontSize="small" />,
  updated: <EditIcon fontSize="small" />,
};

const activityColorMap = {
  booked: "success.main",
  cancelled: "error.main",
  updated: "info.main",
};

const InfoRow = ({ type, title, subtitle, time }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.5,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        '&:hover':{boxShadow:"0px 0px 5px grey",transition:"0.5s",transform:'translateY(-1px)',cursor:"pointer"}
      }}
    >
      <Avatar sx={{ bgcolor: activityColorMap[type], width: 36, height: 36}}>{activityIconMap[type]}</Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={600} fontSize={14}>{title}</Typography>
        <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
      </Box>
      <Chip label={time} size="small" sx={{ fontSize: 11 }} variant="outlined"/>
    </Box>
  );
};




const PatientDash = () => {

  const [ btnState, setBtnState ] = useState("")

  const [open,setOpen] = useState(false)
  const handleClose = ()=> setOpen(false)
  const handleOpen = ()=> setOpen(true)

  const context2 = useContext(AppointmentsContext)
  const {fetchPatAppointments , specificAppointments} = context2

  const completedApp = specificAppointments.filter((item)=>item.status === "completed")

  useEffect(()=>{
    fetchPatAppointments()
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <Box sx={{display:"flex",justifyContent:"space-around"}}>
            <DashCard title='Upcoming Appointments' desc="data" icon={<PendingActionsIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
            <DashCard title='Total Appointments' desc={specificAppointments.length} icon={<ListAltIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
            <DashCard title='Completed Appointments' desc={!completedApp ? 0 : completedApp.length} icon={<OfflinePinIcon sx={{fontSize:"50px",color:"#527dc7",padding:"0px 15px",margin:"auto 0px"}}/>} />
          </Box>
          <Card sx={{p:2,m:5,borderRadius:3,boxShadow:3,bgcolor: "background.paper",}}>
            <CardContent>
              <Typography variant="h5" sx={{fontWeight:"bold"}} color="initial">Recent Activity</Typography>
              <Divider sx={{mb:3,mt:3}}/>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <InfoRow type="booked" title="Appointment Booked" subtitle="Dr Sania • Abc Hospital" time="5 mins ago"/>
                <InfoRow type="updated" title="Profile Updated" subtitle="Contact information changed" time="2 hours ago"/>
                <InfoRow type="cancelled" title="Appointment Cancelled" subtitle="Dr Hasan • City Clinic" time="Yesterday"/>
              </Box>
            </CardContent>
          </Card>
          <Box sx={{display:"flex",justifyContent:"flex-end",gap:"10px"}}>
            <Button variant="contained" color="primary" onClick={()=>{handleOpen();setBtnState("Book Appointment")}}>Book New Appointment</Button>
            <Button variant="contained" color="primary" onClick={()=>{handleOpen();setBtnState("My Appointments")}}>View My Appointments</Button>
          </Box>
        </Box>
        <Box>
          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 400 } }}>
            <Fade in={open}>
              <Box sx={Style}>
                <Box sx={{maxHeight:"80vh",overflowY:"scroll",p:3}}>
                  {btnState === "Book Appointment" ? <AddAppointment /> : <MyAppointments btnState={btnState}/>}
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box >    
    </>
  )
}

export default PatientDash