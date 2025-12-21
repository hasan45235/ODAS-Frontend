import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../authContext";

const expandedWidth = 240;
const collapsedWidth = 70;

const DashboardSidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  

  const context = useContext(AuthContext)
  const {logout , authToken} = context

  const navItems = {
    admin:[
      { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
      { text: "Patients", icon: <PersonIcon />, path: "/dashboard/patient" },
      { text: "Doctors", icon: <i className="fa-solid fa-user-doctor fa-lg" ></i>, path: "/dashboard/doctor" },
      { text: "Controls", icon: <SettingsIcon />, path: "/dashboard/settings" },
    ],
    doctor:[
      { text: "Dashboard", icon: <DashboardIcon />, path: "/doctor/dashboard" },
      { text: "Profile", icon: <PersonIcon />, path: "/dashboard/profile" },
      { text: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
    ],
    patient:[
      { text: "Dashboard", icon: <DashboardIcon />, path: "/patient/dashboard" },
      { text: "Profile", icon: <PersonIcon />, path: "/dashboard/profile" },
      { text: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
    ]
  } 

  const navIcons = navItems[authToken.role]

  return (
    <Drawer variant="permanent" sx={{ width: open ? expandedWidth : collapsedWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: open ? expandedWidth : collapsedWidth, transition: "width 0.3s ease", overflowX: "hidden", backgroundColor: "#0f172a", color: "#fff", }, }}>
      <Toolbar sx={{ display: "flex", justifyContent: open ? "space-between" : "center", }}>
        {open && <Box sx={{ fontWeight: "bold" }}>Dashboard</Box>}
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "#fff" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <List>
        {navIcons.map((item) => (
          <Tooltip key={item.text} title={!open ? item.text : ""} placement="right">
            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)} sx={{ justifyContent: open ? "initial" : "center", "&.Mui-selected": { backgroundColor: "#1e293b", }, "&:hover": { backgroundColor: "#1e293b", }, }}>
              <ListItemIcon sx={{ color: "#fff", minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}

        {/* LOGOUT */}
        <Tooltip title={!open ? "Logout" : ""} placement="right">
          <ListItemButton onClick={() => { logout(); }} sx={{ mt: 4, justifyContent: open ? "initial" : "center", }}>
            <ListItemIcon sx={{ color: "#ef4444", minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", }}>
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default DashboardSidebar;
