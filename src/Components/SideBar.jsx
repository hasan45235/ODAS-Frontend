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
  Avatar,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../authContext";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonalInjuryIcon from "@mui/icons-material/PersonalInjury";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const expandedWidth = 250;
const collapsedWidth = 72;

const DashboardSidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(AuthContext);
  const { logout, authToken } = context;

  const navItems = {
    admin: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/admin/dashboard",
      },
      {
        text: "Doctors",
        icon: <i className="fa-solid fa-user-doctor fa-lg"></i>,
        path: "/admin/doctors",
      },
      {
        text: "Patients",
        icon: <PersonIcon />,
        path: "/admin/patients",
      },
      {
        text: "Appointments",
        icon: <AppRegistrationIcon />,
        path: "/admin/appointments",
      },
      {
        text: "Controls",
        icon: <SettingsIcon />,
        path: "/admin/settings",
      },
    ],
    doctor: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/doctor/dashboard",
      },
      {
        text: "Profile",
        icon: <PersonIcon />,
        path: "/doctor/profile",
      },
      {
        text: "Schedule",
        icon: <ListAltIcon />,
        path: "/doctor/schedule",
      },
      {
        text: "Appointments",
        icon: <AppRegistrationIcon />,
        path: "/doctor/appointment",
      },
      {
        text: "Patients",
        icon: <PersonalInjuryIcon />,
        path: "/doctor/patient",
      },
      {
        text: "Settings",
        icon: <SettingsIcon />,
        path: "/doctor/settings",
      },
    ],
    patient: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/patient/dashboard",
      },
      {
        text: "Profile",
        icon: <PersonIcon />,
        path: "/patient/profile",
      },
      {
        text: "Appointments",
        icon: <AppRegistrationIcon />,
        path: "/patient/appointment",
      },
      {
        text: "Doctors",
        icon: <i className="fa-solid fa-user-doctor fa-lg"></i>,
        path: "/patient/doctors",
      },
      {
        text: "Settings",
        icon: <SettingsIcon />,
        path: "/patient/settings",
      },
    ],
  };

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const role = authToken.role || (user ? user.role : null);
  const navIcons = role && navItems[role] ? navItems[role] : [];

  const isInactive = user && user.status === "inactive";
  const filteredNavIcons = isInactive
    ? navIcons.filter((item) =>
        ["Dashboard", "Profile", "Settings", "Controls"].includes(item.text)
      )
    : navIcons;

  // Get initials for avatar fallback
  const userName = user?.name || "User";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? expandedWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? expandedWidth : collapsedWidth,
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
          background: "#0f172a",
          color: "#fff",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* ========== HEADER ========== */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "space-between" : "center",
          alignItems: "center",
          px: open ? 2 : 1.5,
          py: 1.5,
          minHeight: "72px !important",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {open && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {/* Logo icon */}
            <Box
              sx={{
                width: 34,
                height: 34,
                minWidth: 34,
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(82,125,199,0.3)",
              }}
            >
              <FavoriteIcon sx={{ fontSize: 16, color: "#fff" }} />
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.5px",
                fontSize: "1.1rem",
                background:
                  "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HealthLink
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            color: "rgba(255,255,255,0.6)",
            "&:hover": {
              color: "#fff",
              background: "rgba(255,255,255,0.08)",
            },
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>

      {/* ========== USER PROFILE ========== */}
      <Box
        sx={{
          p: 2,
          pt: 2.5,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Avatar
          src={user?.img || ""}
          sx={{
            width: open ? 56 : 40,
            height: open ? 56 : 40,
            mb: open ? 1.5 : 0,
            background:
              "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
            fontWeight: 700,
            fontSize: open ? "1.2rem" : "0.85rem",
            border: "3px solid rgba(255,255,255,0.1)",
            transition: "all 0.3s",
          }}
        >
          {initials}
        </Avatar>

        {open && (
          <>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#fff",
                textAlign: "center",
                mb: 0.2,
              }}
              noWrap
            >
              {userName}
            </Typography>
            <Chip
              label={role || "Patient"}
              size="small"
              sx={{
                mt: 0.5,
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "capitalize",
                background:
                  role === "admin"
                    ? "linear-gradient(135deg, #f59e0b20, #f59e0b08)"
                    : role === "doctor"
                    ? "linear-gradient(135deg, #10b98120, #10b98108)"
                    : "linear-gradient(135deg, #527dc720, #6c63ff08)",
                color:
                  role === "admin"
                    ? "#f59e0b"
                    : role === "doctor"
                    ? "#10b981"
                    : "#a5b4fc",
                border:
                  role === "admin"
                    ? "1px solid rgba(245,158,11,0.25)"
                    : role === "doctor"
                    ? "1px solid rgba(16,185,129,0.25)"
                    : "1px solid rgba(165,180,252,0.25)",
              }}
            />
            {isInactive && (
              <Chip
                label="Inactive"
                size="small"
                sx={{
                  mt: 0.5,
                  height: 20,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #ef444420, #ef444408)",
                  color: "#f87171",
                  border: "1px solid rgba(239,68,68,0.25)",
                }}
              />
            )}
          </>
        )}
      </Box>

      {/* ========== NAV LINKS ========== */}
      <List sx={{ flex: 1, px: open ? 1.5 : 1, pt: 2 }}>
        {/* Section label */}
        {open && (
          <Typography
            sx={{
              px: 2,
              pt: 0.5,
              pb: 1,
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Menu
          </Typography>
        )}

        {filteredNavIcons.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Tooltip
              key={item.text}
              title={!open ? item.text : ""}
              placement="right"
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  borderRadius: "12px",
                  mb: 0.6,
                  py: open ? 1.2 : 1,
                  px: open ? 2 : 1,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(82,125,199,0.25) 0%, rgba(108,99,255,0.15) 100%)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(82,125,199,0.2)"
                    : "1px solid transparent",
                  transition: "all 0.25s",
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(135deg, rgba(82,125,199,0.3) 0%, rgba(108,99,255,0.2) 100%)"
                      : "rgba(255,255,255,0.06)",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive
                      ? "#a5b4fc"
                      : "rgba(255,255,255,0.45)",
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    transition: "color 0.25s",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "0.85rem",
                    }}
                  />
                )}
                {/* Active indicator dot */}
                {!open && isActive && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 24,
                      borderRadius: "0 4px 4px 0",
                      background:
                        "linear-gradient(180deg, #527dc7, #6c63ff)",
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* ========== FOOTER ========== */}
      <Box sx={{ mt: "auto", px: open ? 2 : 1, pb: 3 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />

        <Tooltip title={!open ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={() => logout()}
            sx={{
              borderRadius: "12px",
              py: 1.2,
              px: open ? 2 : 1,
              justifyContent: open ? "initial" : "center",
              color: "rgba(255,255,255,0.5)",
              transition: "all 0.25s",
              "&:hover": {
                background: "rgba(239,68,68,0.1)",
                color: "#f87171",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#f87171",
                minWidth: 0,
                mr: open ? 2 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>

        {/* Subtle version text */}
        {open && (
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.65rem",
              mt: 2,
            }}
          >
            HealthLink v1.0
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;