import React, { useContext, useEffect, useRef, useState } from 'react'
import DashboardSidebar from './SideBar'
import { Box, Button, Card, CardContent, Fade, Modal, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AuthContext from '../authContext'
import Backdrop from '@mui/material/Backdrop';


const PatDoctors = () => {
  
  const context = useContext(AuthContext)
  const {fetchUsers , allUsers} = context    

  const doctors = allUsers.filter((user)=>(user.role === "doctor"))

  const detailRef = useRef(null);
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "35%",
    bgcolor: 'background.paper',
    borderRadius:"20px",
    boxShadow: 24,
    p:2
  };
  
    
    
    const firstCapital =(word)=>{
      if(!word) return ""
      let newWord =  word.charAt(0).toUpperCase() + word.slice(1)
      return newWord
    }

    const [clickedUser, setClickedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [])    

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <Box>
            {doctors.map((user)=>{
              return(
                <Box key={user?._id} style={{border:"1px solid black", margin:"10px", padding:"10px", borderRadius:"5px"}}>
                  <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Box component="h3">Dr {user?.name}</Box>
                    <Button sx={{fontSize:"8px"}} variant="contained" onClick={()=>{setClickedUser(user); detailRef.current.click()}}>View Details</Button>
                  </Box>
                  <Typography component="p"><strong>Specialization:</strong> {user?.speciality}</Typography>
                  <Typography component="p"><strong>Experience:</strong> {user?.experience}</Typography>
                  <Typography component="p"><strong>Fee range:</strong> {user?.fee}</Typography>
                </Box>
              )
            })}
          </Box>
          <Box>
            <Button onClick={handleOpen} sx={{display:"none"}} ref={detailRef}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          
            <Card sx={style}>
              <CardContent >
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                  <Typography variant="body1" sx={{fontWeight:"bold",fontSize:"15px"}}>Doctor Details</Typography>
                  <Typography variant="body1">0001</Typography>
                </Box><br />
                <Box sx={{display:"flex",alignItems:"center",gap:"10px"}}>
                  <Typography variant="h6" sx={{fontWeight:"bold"}}>{firstCapital(clickedUser?.name)}</Typography>
                  <Typography variant="body1" sx={clickedUser?.status === "active" ? {backgroundColor:"#1da224ff",color:"white",fontSize:"8px",p:"2px 4px",borderRadius:"5px" } : {backgroundColor:"#a21d1dff",color:"white",fontSize:"8px",p:"2px 4px",borderRadius:"5px"  }}>{firstCapital(clickedUser?.status)}</Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                  <Typography variant="body1" sx={{  color:"#9f9c9cff",fontSize:"12px"}}>Age: { clickedUser?.age} |</Typography>
                  <Typography variant="body1" sx={{  color:"#9f9c9cff",fontSize:"12px"}}>&nbsp;Gender:  { clickedUser?.gender}</Typography>
                </Box><hr />
                <Box sx={{display:"flex"}}>
                  <Box>
                    <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Contact:  { clickedUser?.contact}</Typography>
                    <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Email:  { clickedUser?.email}</Typography>
                    <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Address: { clickedUser?.address}</Typography>
                  </Box>
                </Box>
              </CardContent>
              
            </Card>
          
        </Fade>
      </Modal>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PatDoctors