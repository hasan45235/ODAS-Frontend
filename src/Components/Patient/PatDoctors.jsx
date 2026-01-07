import React, { useContext, useEffect,  useState } from 'react'
import DashboardSidebar from '../SideBar'
import {  Box, Button, Card, CardContent, Fade, IconButton, Modal, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AuthContext from '../../authContext'
import Backdrop from '@mui/material/Backdrop';
import {
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

function InfoRow({ label, value }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={500}>{value}</Typography>
    </Box>
  );
}


const PatDoctors = () => {
  
  const context = useContext(AuthContext)
  const {fetchUsers , allUsers} = context    


  const doctors = allUsers.filter((user)=>(user.role === "doctor"))


  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

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
            <Box sx={{ p: 3 }}>
              <Box sx={{display:"flex",justifyContent:"space-between",m:2,alignItems:"center"}}>
                <Typography variant="h5" fontWeight={600} >Available Doctors</Typography>
              </Box>
              <Divider sx={{mb:5}}/>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
                {doctors.map((doctor) => (
                  <Card key={doctor._id} sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar>{doctor?.name[0]}</Avatar>
                          <Box>
                            <Typography fontWeight={600}>Dr. {doctor?.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{doctor?.speciality}</Typography>
                          </Box>
                        </Box>
                        <IconButton aria-label="view"  onClick={() => handleOpen(doctor)} color="primary"><VisibilityIcon /></IconButton>
                      </Box>
                      <Divider sx={{ my: 1.5 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">Experience</Typography>
                        <Typography fontWeight={500}>{doctor?.experience} yrs</Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">Fee</Typography>
                        <Typography fontWeight={600}>Rs. {doctor?.fee}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 400 } }}
                >
                <Fade in={open}>
                  <Box sx={modalStyle}>
                    {selectedDoctor && (
                    <>
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                      <Box>
                        <Typography variant="h6" fontWeight={600} mb={0.5}>Dr. {selectedDoctor?.name}</Typography>
                        <Typography color="text.secondary" mb={2}>{selectedDoctor?.speciality}</Typography>
                      </Box>
                      <Chip label={selectedDoctor?.status} color={selectedDoctor?.status === "active" ? "success" : "error"} variant="outlined" />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                      <InfoRow label="Hospital" value={selectedDoctor?.hospital} />
                      <InfoRow label="Qualification" value={`${selectedDoctor?.qualification}`} />
                      <InfoRow label="Experience" value={`${selectedDoctor?.experience} years`} />
                      <InfoRow label="Gender" value={selectedDoctor?.gender} />
                      <InfoRow label="Consultation Fee" value={`Rs. ${selectedDoctor?.fee}`} />
                    </Box>
                    <Button fullWidth variant="contained" sx={{ mt: 3 }} disabled={selectedDoctor?.status === "in-active" ? true : false}> Book Appointment</Button>
                    </>
                    )}
                  </Box>
                </Fade>
              </Modal>
            </Box>
          </Box>
      </Box>
    </>
  )
}

export default PatDoctors



