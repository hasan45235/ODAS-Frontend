import {
  Box,
  Typography,
  Avatar,
  Chip,
  Toolbar,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../SideBar";
import { useContext, useEffect } from "react";
import AuthContext from "../../authContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const PatProfile = () => {

  const context = useContext(AuthContext)
  const { currentUser , fetchCurrentUser} = context


  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
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
                <Button variant="contained" startIcon={<EditOutlinedIcon />}> Edit Profile</Button>
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


