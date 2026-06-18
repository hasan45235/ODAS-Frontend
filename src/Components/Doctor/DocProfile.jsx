import { Box, Toolbar } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from "../SideBar"
import AuthContext from '../../authContext'
import { Typography, Avatar, Paper, Divider, Chip, Button,} from "@mui/material";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import Badge from '@mui/material/Badge';
import {Oval} from 'react-loader-spinner'

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




const DocProfile = () => {

  const context = useContext(AuthContext)
  const {fetchCurrentUser, currentUser} = context

  console.log(currentUser)

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
                <Button variant="contained" color="primary">Edit Profile</Button>
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
              <Box>
                <Typography fontWeight={600} fontSize={18} mb={1.5}>About Doctor</Typography>
                <Typography color="text.secondary" lineHeight={1.8}>{currentUser?.bio || "No bio available."}</Typography>
              </Box>
              </>)}
            </Paper>
          </Box>
      </Box>
      </Box>
    </>
  )
}

export default DocProfile




          