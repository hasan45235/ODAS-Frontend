import { Box, Toolbar, Card, CardContent,  Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../SideBar'
import Modal from '../Modal';
import AuthContext from '../../authContext';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BlockFlippedIcon from '@mui/icons-material/BlockFlipped';
import LoadingSpinner from '../../LoadingSpinner'




const InfoRow = ({ user , setUser ,type, ref }) => {

  function capitalizeFirstLetter(string) {
    if (!string) return ""; 
    return string.charAt(0).toUpperCase() + string.slice(1);
    
  }
  

  
  // const context = useContext(AppointmentsContext)
  // const {updateAppointment} = context

  // const handleUpdate = (status , id) => {
  //   updateAppointment(status , id)
  // }

  return (<Box onClick={()=>{setUser(user),ref.current.click()}}>
      {type === "data" ? 
      (
      <Box sx={{ display: "flex", justifyContent:"space-between", alignItems:"center", p: 1.5, borderRadius: 2, bgcolor: "background.paper", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", '&:hover':{boxShadow:"0px 0px 5px grey",transition:"0.5s",transform:'translateY(-1px)',cursor:"pointer"}}}>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">#0001</Typography>
        <Box sx={{ flex: 2 }}>
          <Typography variant="body1" color="initial">{capitalizeFirstLetter(user?.name)}</Typography>
          <Typography variant="body1" sx={{fontSize:"12px"}} color="text.secondary">{user?.contact}</Typography>
        </Box>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">{user?.age}</Typography>
        <Typography variant="body1" sx={{ flex: 2 }} color="initial">{user?.contact}</Typography>
        <Box sx={{ flex: 1 }}>
          {user?.status == "active" ? (<TaskAltIcon color='success'/>) : (<BlockFlippedIcon color='error'/>)}
        </Box>
      </Box>
      )
      : (<Box sx={{display:"flex",justifyContent:"space-between",pt:2,pb:2}}>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Patient Id</Typography>
        <Typography variant="body1" sx={{ flex: 2 }} color="initial">Name</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Age</Typography>
        <Typography variant="body1" sx={{ flex: 2 }} color="initial">Contact</Typography>
        <Typography variant="body1" sx={{ flex: 1 }} color="initial">Status</Typography>
        </Box>)}
  </Box>
  );
};




const Patients = () => {
  
  const patRef = useRef()

  const context = useContext(AuthContext)
  const {fetchUsers , allUsers, loading} = context


  const [clickedUser,setClickedUser] = useState({})
  
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
          <Card sx={{ borderRadius: 3, boxShadow: 3  }}>
            <CardContent >
                <InfoRow type="heading"/>
                {loading ? (
                    <LoadingSpinner />
                ) : allPatients.map((user)=>{
                  
                  return (
                    <InfoRow user={user} key={user._id} setUser={setClickedUser} type="data" ref={patRef}/>                    
                    )
                  })}              
          </CardContent>
          </Card>
          <Modal refs={patRef} clickedUser={clickedUser} type="Patient" />
        </Box>
      </Box>
    </>
  )
}

export default Patients