import { Box, Toolbar, Modal, Card, TextField, Autocomplete,} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from "../SideBar"
import AuthContext from '../../authContext'
import { Typography, Avatar, Paper, Divider, Chip, Button,} from "@mui/material";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import Badge from '@mui/material/Badge';
import {Oval} from 'react-loader-spinner'
import Swal from 'sweetalert2';

const InfoRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      py: 1.8,
    }}
  >
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight={500}>{value || "-"}</Typography>
  </Box>
);


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};



const DocProfile = () => {

  const context = useContext(AuthContext)
  const {fetchCurrentUser, currentUser, updateUser} = context

  const genderArr = ['Male', 'Female', 'Other'];

  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false);
  
  const [ updatedDataArr, setUpdatedDataArr] = useState({name:currentUser?.name || "", email:currentUser?.email || "", age:currentUser?.age || "", contact:currentUser?.contact || "", gender:currentUser?.gender || "", address:currentUser?.address || "", qualification:currentUser?.qualification || "", speciality:currentUser?.speciality || "", experience:currentUser?.experience || ""});
  
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedDataArr({ ...updatedDataArr, [name]: value });
    
  }

  const updatingUser = async () => {
      updateUser({...updatedDataArr, id: currentUser._id})
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Profile has been updated",
        showConfirmButton: false,
        timer: 2000
      });
    }
    

  useEffect(()=>{
    fetchCurrentUser();
    // eslint-disable-next-line
  },[currentUser])

  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card component="form" autoComplete="off" sx={{width:"100%",display:"flex",justifyContent:"space-between" }} onSubmit={(e) => {e.preventDefault();updatingUser();handleClose();}} >
          <Box sx={{width:"100%", p:4,pt:2}}>
          <Typography variant="h5" sx={{fontWeight:"bold",pt:2,pb:4,ml:-1}} color="primary">Edit your Profile</Typography>  
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic name" value={updatedDataArr.name || ""} label="Name"  name='name' variant="outlined" onChange={(e)=> onChangeHandler(e)} required/>
            <TextField id="outlined-basic email" disabled={true} value={updatedDataArr?.email || ""} label="Email" type='email' name='email' variant="outlined"  required/>
            <TextField id="outlined-basic age" value={updatedDataArr.age || ""} label="Age" type='number' name='age' onChange={(e)=> onChangeHandler(e)}  variant="outlined" required/>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic contact" value={updatedDataArr?.contact || ""} inputProps={{maxLength: 11,}} label="Contact" name='contact' onChange={(e)=> onChangeHandler(e)} variant="outlined"  required/>
            <Autocomplete disablePortal options={genderArr} value={updatedDataArr.gender || ""} onChange={(event, newValue) => {setUpdatedDataArr((prev) => ({...prev,gender: newValue ? newValue : "" }));}} sx={{ width: "18vw" }} renderInput={(params) => <TextField {...params} label="Gender" name='gender' />}/>
            <TextField id="outlined-basic address" value={updatedDataArr.address || ""} label="Address" name='address' variant="outlined" onChange={(e)=> onChangeHandler(e)}  required  />
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic qualification" value={updatedDataArr.qualification || ""} label="Qualification" name='qualification'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}}/>
            <TextField id="outlined-basic speciality" value={updatedDataArr.speciality || ""} label="Speciality" name='speciality'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}}/>
            <TextField id="outlined-basic experience" value={updatedDataArr.experience || ""} label="Experience" name='experience'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}}/>
          </Box>
                          
          <Button variant="contained" color="primary" type="submit">Update</Button>
          </Box>
        </Card>
        </Box>
      </Modal>
            <Paper sx={{ p: 4.5, borderRadius: 4, boxShadow: "0 14px 36px rgba(0,0,0,0.08)", maxWidth: 1000, mx: "auto"}}>
              {currentUser?.length === 0 || !currentUser ? (
                <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                  <Oval  height="14vh" width="14vw" color="#1976d2" visible={true} ariaLabel="oval-loading" secondaryColor="#1976d2" strokeWidth={2} strokeWidthSecondary={2} />
                </Box>
              ) : (<>

                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4, mb: 4 }} >
                <Badge overlap="circular" badgeContent=" " sx={{"@keyframes pulse": {"0%": { boxShadow: "0 0 0 0 rgba(64,223,98,0.7)" },"70%": { boxShadow: "0 0 0 6px rgba(64,223,98,0)" },"100%": { boxShadow: "0 0 0 0 rgba(64,223,98,0)" }}, "& .MuiBadge-badge": { display:currentUser?.status === "active" ? "inline-block" : "none",backgroundColor: "#40df62ff",  color: "#40df62ff", minWidth: 12, height: 12, borderRadius: "50%",boxShadow: "0 0 0 2px white", animation: "pulse 1.8s infinite"}}}  anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}  >
                  <Avatar sx={{ width: 96, height: 96, bgcolor: "primary.main", fontSize: 32}}>{currentUser?.name?.[0]}</Avatar>
                </Badge>
                <Box sx={{ flex: 1 }}>
                  <Typography fontSize={26} fontWeight={600}>Dr. {currentUser?.name}</Typography>
                  <Typography color="text.secondary" mb={1}>{currentUser?.qualification}</Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Chip icon={<LocalHospitalOutlinedIcon />} label={currentUser?.speciality} color="primary" variant="outlined"/>
                    <Chip label={`${currentUser?.experience} Experience`} variant="outlined"/>
                  </Box>
                </Box>
                <Button variant="contained" onClick={()=> handleOpen()}  color="primary">Edit Profile</Button>
              </Box>
              <Divider sx={{ mb: 4 }} />
              <Box sx={{ mb: 4 }}>
                <Typography fontWeight={600} fontSize={18} mb={2}> Professional Details </Typography>
                <InfoRow label="Specialization" value={currentUser?.speciality} />
                <InfoRow label="Experience" value={currentUser?.experience} />
                <InfoRow label="Hospital / Clinic" value={currentUser?.hospitalName || "—"} />
                <InfoRow label="Consultation Fee" value={`Rs ${currentUser?.fee}`}/>
              </Box>
              <Divider sx={{ mb: 4 }} />      
              <Box sx={{ mb: 4 }}>
                <Typography fontWeight={600} fontSize={18} mb={2}>Personal Details</Typography>
                <InfoRow label="Email" value={currentUser?.email } />
                <InfoRow label="Age" value={currentUser?.age} />
                <InfoRow label="Gender" value={currentUser?.gender} />
                <InfoRow label="Address" value={currentUser?.address}/>
              </Box>
              <Divider sx={{ mb: 4 }} />
              </>)}
            </Paper>
          </Box>
      </Box>
      </Box>
    </>
  )
}

export default DocProfile




          