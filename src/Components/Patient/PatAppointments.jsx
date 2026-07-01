import React, { useState } from "react";
import DashboardSidebar from "../SideBar";
import { Box, Toolbar, Typography} from "@mui/material";
import { Outlet } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddAppointment from "./AddAppointment";
import MyAppointments from "./MyAppointments";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";

const PatAppointments = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8faff" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />

          <Box sx={{ maxWidth: 1100, mx: "auto", mt: 2 }}>
            {/* Page Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: "-0.5px",
                    mb: 0.5,
                  }}
                >
                  Appointments
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b" }}>
                  Book and manage your healthcare appointments
                </Typography>
              </Box>
            </Box>

            {/* Styled Tabs Card */}
            <Box
              sx={{
                background: "#fff",
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <Box
                sx={{
                  height: 4,
                  background: "linear-gradient(90deg, #527dc7, #6c63ff)",
                }}
              />

              {/* Tabs */}
              <Tabs
                onChange={handleChange}
                value={value}
                aria-label="appointment tabs"
                selectionFollowsFocus
                sx={{
                  px: 3,
                  pt: 2,
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#64748b",
                    minHeight: 48,
                    borderRadius: "12px 12px 0 0",
                    mr: 1,
                    transition: "all 0.25s",
                    "&:hover": { color: "#527dc7", background: "rgba(82,125,199,0.04)" },
                  },
                  "& .Mui-selected": {
                    color: "#527dc7 !important",
                    fontWeight: 700,
                  },
                  "& .MuiTabs-indicator": {
                    height: 3,
                    borderRadius: "3px 3px 0 0",
                    background: "linear-gradient(90deg, #527dc7, #6c63ff)",
                  },
                }}
              >
                <Tab
                  icon={<CalendarMonthIcon sx={{ fontSize: 20 }} />}
                  iconPosition="start"
                  label="Book Appointment"
                />
                <Tab
                  icon={<HistoryIcon sx={{ fontSize: 20 }} />}
                  iconPosition="start"
                  label="My Appointments"
                />
              </Tabs>

              {/* Tab Content */}
              <Box sx={{ p: { xs: 2, md: 4 }, pt: 3 }}>
                {value === 0 ? <AddAppointment /> : <MyAppointments />}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PatAppointments;