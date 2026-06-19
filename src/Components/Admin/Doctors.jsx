import { Box,  Toolbar, Typography, CardContent, Card } from '@mui/material'
import React, {useContext, useEffect, useRef, useState} from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../SideBar'
import Modal from '../Modal';
import AuthContext from '../../authContext';
// import AddDoctorModal from '../AddDoctorModal';
import {Oval} from 'react-loader-spinner'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BlockFlippedIcon from '@mui/icons-material/BlockFlipped';




const InfoRow = ({ user , type, ref, settingClickedUser }) => {

  function capitalizeFirstLetter(string) {
    if (!string) return ""; 
    return string.charAt(0).toUpperCase() + string.slice(1);
    
  }
  

  
  // const context = useContext(AppointmentsContext)
  // const {updateAppointment} = context

  // const handleUpdate = (status , id) => {
  //   updateAppointment(status , id)
  // }

  return (<>
      {type === "data" ? 
      (
      <Box onClick={()=> {ref.current.click(),settingClickedUser(user)}} sx={{ display: "flex", justifyContent:"space-between", alignItems:"center", p:1.5, borderRadius: 2, bgcolor: "background.paper", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", '&:hover':{boxShadow:"0px 0px 5px grey",transition:"0.5s",transform:'translateY(-1px)',cursor:"pointer"}}}>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">#0001</Typography>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" color="initial">Dr. {capitalizeFirstLetter(user?.name)}</Typography>
          <Typography variant="body1" sx={{fontSize:"12px"}} color="text.secondary">{user?.contact}</Typography>
        </Box>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">{user?.speciality}</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">{user?.age}</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">{user?.gender}</Typography>
        <Box sx={{ flex: 1,pl:2 }}>
          {user?.status == "active" ? (<TaskAltIcon color='success'/>) : (<BlockFlippedIcon color='error'/>)}
        </Box>
      </Box>
      )
      : (<Box sx={{display:"flex",justifyContent:"space-between",pt:2,pb:2}}>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Doctor Id</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Name</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Speciality</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Age</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Gender</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Status</Typography>
        </Box>)}
  </>
  );
};




const Doctors = () => {

  const context = useContext(AuthContext)
  // eslint-disable-next-line
  const { addDoctor , fetchUsers , allUsers, loading} = context

  const docRef = useRef()

  const checkUserDoctor = (user) => {return user.role === "doctor"}

  const allDoctors = allUsers.filter((user)=>(checkUserDoctor(user)))

  const [clickedUser,setClickedUser] = useState({})

  

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
          {/* <AddDoctorModal docRef={addDocRef} /> */}
          <Box>
            <Card>
              <CardContent>
                <InfoRow type="heading" />
                {loading ? (
                  <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                    <Oval  height="14vh" width="14vw" color="#1976d2" visible={true} ariaLabel="oval-loading" secondaryColor="#1976d2" strokeWidth={2} strokeWidthSecondary={2} />
                  </Box>
                ) : allDoctors.map((user)=>{
                  return (
                    <InfoRow key={user._id} ref={docRef} settingClickedUser={setClickedUser}  user={user} type="data" /> 
                  )})}
              </CardContent>
            </Card>
          </Box>
          <Modal refs={docRef} type="Doctor" clickedUser={clickedUser}/>
        </Box>
      </Box>
    </>

  )
}

export default Doctors