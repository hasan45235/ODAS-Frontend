import {
  Box,
  Typography,
  Avatar,
  Chip,
  Toolbar,
  Divider,
  Button,
  Paper,
  TextField,
  Autocomplete,
  Card,

} from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../SideBar";
import { useContext, useEffect } from "react";
import AuthContext from "../../authContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from '@mui/material/Modal';
import {useState} from "react"


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


const PatProfile = () => {

  const context = useContext(AuthContext)
  const { currentUser , fetchCurrentUser} = context

  const [error, setError] = useState({state:false,text:""})
  const [open, setOpen] = useState(false);
  const handleOpen = () =>{
    setOpen(true);
    setError({state:false,text:""})
    console.log(dataArr)

  } 
  const handleClose = () => setOpen(false);

  const genderArr = ['Male', 'Female', 'Other'];
  const [ dataArr, setDataArr] = useState({name:"", email:"",  age:"", contact:"", gender:"", address:"",role:"patient"});

  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
        <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
  
          <Card component="form" autoComplete="off" sx={{width:"100%",display:"flex",justifyContent:"space-between" }} onSubmit={(e) => {e.preventDefault();}} >

          <Box sx={{width:"100%", p:4,pt:6}}>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic name" value={currentUser?.name || ""} label="Name"  name='name' variant="outlined"  required/>
            <TextField id="outlined-basic email" disabled={true} value={currentUser?.email || ""} label="Email" error={error.state && error.text === "Sorry a user with this email already exists" ? Boolean(error.state) : ""} helperText={error.state && error.text === "Sorry a user with this email already exists" ? error.text : ""} type='email' name='email' variant="outlined"  required/>
            <TextField id="outlined-basic age" value={currentUser?.age || ""} label="Age" type='number' name='age'  variant="outlined" required/>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic contact" value={currentUser?.contact || ""} inputProps={{maxLength: 11,}} label="Contact" name='contact'  variant="outlined"  required/>
            <Autocomplete disablePortal options={genderArr} value={currentUser?.gender || ""} onChange={(event, newValue) => {setDataArr((prev) => ({...prev,gender: newValue ? newValue : "" }));}} sx={{ width: "30ch" }} renderInput={(params) => <TextField {...params} label="Gender" name='gender' />}/>
            <TextField id="outlined-basic address" value={currentUser?.address || ""} label="Address" name='address' variant="outlined"   required  />
          </Box>
          <Button variant="contained" color="primary" type="submit">Update</Button>
          </Box>
        </Card>
        </Box>
      </Modal>
    </div>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <Paper sx={{ p: 4, borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)", maxWidth: 900, mx: "auto", }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar sx={{ width: 80, height: 80 }}>{currentUser?.name?.[0]}</Avatar>
                <Box>
                  <Typography fontSize={22} fontWeight={600}>{currentUser?.name}</Typography>
                  <Typography color="text.secondary">{currentUser?.email}</Typography>
                  <Typography color="text.secondary">{currentUser?.contact}</Typography>
                </Box>
                <Chip  label={currentUser?.status} color={currentUser?.status === "active" ? "success" : "default"} />
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Button variant="contained" onClick={handleOpen} startIcon={<EditOutlinedIcon />}> Edit Profile</Button>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box>
              <Typography fontWeight={600} fontSize={18} mb={2}>Personal Information</Typography>
             <InfoRow label="Age" value={currentUser?.age} />
             <InfoRow label="Gender" value={currentUser?.gender} />
             <InfoRow label="Address" value={currentUser?.address} />
            </Box>
          </Paper>
        </Box>
    </Box>      
  );
};

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight={500}>{value || "-"}</Typography>
  </Box>
);

export default PatProfile;


