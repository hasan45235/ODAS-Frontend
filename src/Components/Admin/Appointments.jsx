// eslint-disable-next-line
import React , {useState , useEffect, useRef, useContext} from 'react'
import SideBar from '../SideBar'
import { Autocomplete, Box, Card, CardContent, Chip, TextField, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AuthContext from '../../authContext'
import AppointmentsContext from '../../AppointmentsContext'
import DoctorAppointmentCard from '../Doctor/DocAppointmentCard'
import LoadingSpinner from '../../LoadingSpinner'


const InfoRow = ({ user , type, ref, appointment, settingClickedUser }) => {

  function capitalizeFirstLetter(string) {
    if (!string) return ""; 
    return string.charAt(0).toUpperCase() + string.slice(1);
    
  }
  
  return (<>
      {type === "data" ? 
      (
      <Box onClick={()=> {ref.current.click(),settingClickedUser(appointment)}} sx={{ display: "flex", alignItems:"center", pt:1.5,pb:1.5,pr:1, borderRadius: 2, bgcolor: "background.paper", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", '&:hover':{boxShadow:"0px 0px 5px grey",transition:"0.5s",transform:'translateY(-1px)',cursor:"pointer"}}}>
        <Typography variant="body1" sx={{ flex: 1,maxWidth:"20%"}} color="initial">{appointment.receiptNum}</Typography>
        <span style={{ flex: 1 ,maxWidth:"20%"}}>
          <Typography variant="body1" color="initial">{capitalizeFirstLetter(user?.name)}</Typography>
          <Typography variant="body1" sx={{fontSize:"12px"}} color="text.secondary">{user?.contact}</Typography>
        </span>
        <Typography variant="body1" sx={{ flex: 1,maxWidth:"20%" }} color="initial">{appointment?.bookedDate}</Typography>
        <Typography variant="body1" sx={{ flex: 2 ,maxWidth:"20%"}} color="initial">{appointment?.bookedSlot}</Typography>
        <Box sx={{flex:1 , maxWidth:"20%"}}>
          <Chip size="small" label={appointment.status.toUpperCase()} color={ appointment.status === "pending" ? "warning" : appointment.status === "approved" ? "success" : appointment.status === "rejected" ? "error" : "primary"} sx={{ fontWeight: 600 }}/>
        </Box>  
      </Box>
      )
      : (<Box sx={{display:"flex",pt:2,pb:2}}>
        <Typography variant="body1" sx={{ flex: 1 , maxWidth:"20%"}} color="initial">Receipt</Typography>
        <Typography variant="body1" sx={{ flex: 1 , maxWidth:"20%"}} color="initial">Patient</Typography>
        <Typography variant="body1" sx={{ flex: 1 , maxWidth:"20%"}} color="initial">Date</Typography>
        <Typography variant="body1" sx={{ flex: 2 , maxWidth:"20%"}} color="initial">Time Slot</Typography>
        <Typography variant="body1" sx={{ flex: 1 , maxWidth:"20%"}} color="initial">Status</Typography>
        </Box>)}
  </>
  );
};



const Appointments = () => {
  

  const context = useContext(AppointmentsContext)
  const {fetchAllApointments,appointments, loading } = context

  const context2 = useContext(AuthContext)
  const {fetchUsers , allUsers } = context2

  const [selectedAppointment,setSelectedAppointment] = useState({})
  const showRef = useRef(null)
  const status = ["All","pending","approved","rejected","completed"]


  const [filterStatus, setFilterStatus] = useState("")

  const filteredAppointments = appointments.filter((item)=>item.status === filterStatus)


  useEffect(()=>{
    fetchAllApointments()
    fetchUsers()
    //eslint-disable-next-line
  },[appointments])

  
    return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <Box>
            <Card sx={{ borderRadius: 3, boxShadow: 3  }}>
              <CardContent >
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <Typography variant="h5" sx={{fontWeight:"bold",mt:4,mb:2}} color="initial">Your Appointments</Typography>
                  <Autocomplete disablePortal   onChange={(event,newValue)=>{setFilterStatus(newValue)}} options={status} sx={{ width: "20%" }} renderInput={(params) => <TextField {...params} label="Filter" />}/>
                </Box>
                    <InfoRow type="heading" />
                    {loading ? (
                      <LoadingSpinner />
                    )
                     : appointments.length === 0 ? (
                      <Typography sx={{ p:4 }}>No appointments found.</Typography>
                    ) 
                    : (
                    ((filterStatus === "All" || filterStatus === "")  ? appointments : filteredAppointments).map((item, index) => {
                      const patient = allUsers.find((user) => user._id === item.patientId);
                      return (
                        <InfoRow key={index}  type="data" settingClickedUser={setSelectedAppointment} user={patient} appointment={item} />
                      );
                    }))}
              </CardContent>
            </Card>
            <DoctorAppointmentCard ref={showRef} appointment={selectedAppointment.appointment} patient={selectedAppointment.patient}/>
          </Box>        
        </Box>
      </Box>  
    </>
  )
}

export default Appointments