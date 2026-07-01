import {
  Box,
  Typography,
  Toolbar,
  Chip,
  Avatar,
  Button,
  Modal,
  Fade,
  Backdrop,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../SideBar";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import AddAppointment from "./AddAppointment";
import MyAppointments from "./MyAppointments";
import AppointmentsContext from "../../AppointmentsContext";
import AuthContext from "../../authContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { Oval } from "react-loader-spinner";
import DashCard from "../DashCard";

const modalStyle = {
  position: "absolute",
  top: 40,
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "#fff",
  borderRadius: "24px",
  boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
  outline: "none",
  mb: 8,
};

const PatientDash = () => {
  const [btnState, setBtnState] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const context2 = useContext(AppointmentsContext);
  const { fetchPatAppointments, specificAppointments } = context2;

  const contextAuth = useContext(AuthContext);
  const { fetchCurrentUser, currentUser, fetchUsers, allUsers } = contextAuth;

  const todayDate = new Date().toLocaleDateString("en-GB");
  const todayApp = specificAppointments.filter((item) => item.bookedDate === todayDate);
  const completedApp = specificAppointments.filter((item) => item.status === "completed");
  const pendingApp = specificAppointments.filter((item) => item.status === "pending");
  const recentAppointments = [...specificAppointments]
    .sort((a, b) => new Date(b.bookedDate?.split("/").reverse().join("-")) - new Date(a.bookedDate?.split("/").reverse().join("-")))
    .slice(0, 4);

  const userInitials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  useEffect(() => {
    fetchPatAppointments();
    if (fetchCurrentUser) fetchCurrentUser();
    if (fetchUsers) fetchUsers();
    // eslint-disable-next-line
  }, []);

  /* ---------- INACTIVE ACCOUNT ---------- */
  if (currentUser?.status === "inactive") {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8faff" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Box
            sx={{
              maxWidth: 500,
              mx: "auto",
              mt: 10,
              p: 5,
              borderRadius: "24px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <CloseIcon sx={{ fontSize: 32, color: "#ef4444" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1a1a2e", mb: 1 }}>
              Account Inactive
            </Typography>
            <Typography sx={{ color: "#64748b", mb: 0.5 }}>
              Reason: {currentUser?.inactiveReason || "No reason provided"}
            </Typography>
            <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>
              Please contact the admin to reactivate your account.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  /* ---------- ACTIVE DASHBOARD ---------- */
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8faff" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />

          <Box sx={{ maxWidth: 1100, mx: "auto", mt: 1 }}>
            {/* ===== WELCOME BANNER ===== */}
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "24px",
                background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a7a 50%, #1e3a5f 100%)",
                boxShadow: "0 20px 48px rgba(30,58,95,0.25)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 3,
                mb: 4,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative blobs */}
              <Box
                sx={{
                  position: "absolute",
                  top: -60,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.03)",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -50,
                  left: "30%",
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.03)",
                  pointerEvents: "none",
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, position: "relative" }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    border: "3px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  {userInitials}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: { xs: "1.2rem", md: "1.5rem" },
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Welcome back, {currentUser?.name || "Patient"}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                    {todayApp.length > 0
                      ? `You have ${todayApp.length} appointment${todayApp.length > 1 ? "s" : ""} today`
                      : "No appointments scheduled for today"}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                onClick={() => {
                  handleOpen();
                  setBtnState("Book Appointment");
                }}
                startIcon={<AddIcon />}
                sx={{
                  position: "relative",
                  py: 1.5,
                  px: 3,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  background:
                    "linear-gradient(135deg, #fff 0%, #e8edff 50%, #fff 100%)",
                  backgroundSize: "200% 200%",
                  backgroundPosition: "0% 0%",
                  color: "#1e3a5f",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundPosition: "100% 100%",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                  },
                }}
              >
                Book Appointment
              </Button>
            </Box>

            {/* ===== STAT CARDS ===== */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                mb: 5,
              }}
            >
              <DashCard
                title="Today's Appointments"
                desc={todayApp.length}
                icon={<CalendarMonthIcon sx={{ fontSize: 32, color: "#527dc7" }} />}
                gradient="radial-gradient(circle, rgba(82,125,199,0.08) 0%, transparent 70%)"
              />
              <DashCard
                title="Total Appointments"
                desc={specificAppointments.length}
                icon={<ListAltIcon sx={{ fontSize: 32, color: "#6c63ff" }} />}
                gradient="radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)"
              />
              <DashCard
                title="Pending"
                desc={pendingApp.length}
                icon={<PendingActionsIcon sx={{ fontSize: 32, color: "#f59e0b" }} />}
                gradient="radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)"
              />
              <DashCard
                title="Completed"
                desc={completedApp.length}
                icon={<OfflinePinIcon sx={{ fontSize: 32, color: "#16a34a" }} />}
                gradient="radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)"
              />
            </Box>

            {/* ===== QUICK ACTIONS + RECENT ===== */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" },
                gap: 3,
                mb: 5,
              }}
            >
              {/* Quick Actions */}
              <Box
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, color: "#1a1a2e", mb: 3, fontSize: "1.1rem" }}
                >
                  Quick Actions
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <QuickActionButton
                    icon={<CalendarMonthIcon />}
                    label="Book New Appointment"
                    onClick={() => {
                      handleOpen();
                      setBtnState("Book Appointment");
                    }}
                  />
                  <QuickActionButton
                    icon={<ListAltIcon />}
                    label="View My Appointments"
                    onClick={() => {
                      handleOpen();
                      setBtnState("My Appointments");
                    }}
                  />
                  <QuickActionButton
                    icon={<PersonOutlineIcon />}
                    label="Update My Profile"
                    onClick={() => window.location.assign("/patient/profile")}
                  />
                  <QuickActionButton
                    icon={<FavoriteIcon />}
                    label="Browse Doctors"
                    onClick={() => window.location.assign("/patient/doctors")}
                  />
                </Box>
              </Box>

              {/* Recent Appointments Preview */}
              <Box
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.1rem" }}
                  >
                    Recent Appointments
                  </Typography>
                  <Button
                    size="small"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                    onClick={() => {
                      handleOpen();
                      setBtnState("My Appointments");
                    }}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#527dc7",
                      fontSize: "0.82rem",
                    }}
                  >
                    View All
                  </Button>
                </Box>

                {!specificAppointments ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <Oval height="48" width="48" color="#527dc7" visible={true} secondaryColor="#a5b4fc" strokeWidth={3} />
                  </Box>
                ) : recentAppointments.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <CalendarMonthIcon sx={{ color: "#94a3b8", fontSize: 28 }} />
                    </Box>
                    <Typography sx={{ color: "#94a3b8", fontWeight: 500 }}>
                      No appointments yet
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        handleOpen();
                        setBtnState("Book Appointment");
                      }}
                      sx={{
                        mt: 1,
                        color: "#527dc7",
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      Book your first appointment
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {recentAppointments.map((item) => {
                      const doc = allUsers?.filter((u) => u._id === item.doctorId) || [];
                      console.log(doc)
                      return (
                        <Box
                          key={item.receiptNum || item._id}
                          onClick={() => {
                            handleOpen();
                            setBtnState("My Appointments");
                          }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2,
                            borderRadius: "14px",
                            border: "1px solid rgba(0,0,0,0.04)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            "&:hover": {
                              background: "rgba(82,125,199,0.04)",
                              borderColor: "rgba(82,125,199,0.15)",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                            <Avatar
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: "10px",
                                background: "linear-gradient(135deg, #527dc7, #6c63ff)",
                                fontWeight: 700,
                                fontSize: "0.75rem",
                              }}
                            >
                              {(item.hospitalName || "A")[0]}
                            </Avatar>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                sx={{ fontWeight: 600, color: "#1a1a2e", fontSize: "0.85rem" }}
                                noWrap
                              >
                                {item.hospitalName}
                              </Typography>
                              <Typography sx={{ color: "#94a3b8", fontSize: "0.72rem" }}>
                                {item.bookedDate} · {item.bookedSlot}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            label={item.status}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.65rem",
                              height: 22,
                              textTransform: "capitalize",
                              background:
                                item.status === "completed"
                                  ? "linear-gradient(135deg, #f0fdf4, #ecfdf5)"
                                  : item.status === "rejected"
                                  ? "linear-gradient(135deg, #fef2f2, #fee2e2)"
                                  : item.status === "approved"
                                  ? "linear-gradient(135deg, #eef2ff, #e0e7ff)"
                                  : "linear-gradient(135deg, #fefce8, #fef9c3)",
                              color:
                                item.status === "completed"
                                  ? "#16a34a"
                                  : item.status === "rejected"
                                  ? "#ef4444"
                                  : item.status === "approved"
                                  ? "#527dc7"
                                  : "#ca8a04",
                              border:
                                item.status === "completed"
                                  ? "1px solid rgba(22,163,74,0.2)"
                                  : item.status === "rejected"
                                  ? "1px solid rgba(239,68,68,0.2)"
                                  : item.status === "approved"
                                  ? "1px solid rgba(82,125,199,0.2)"
                                  : "1px solid rgba(202,138,4,0.2)",
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </Box>

            {/* ===== MODAL ===== */}
            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{ backdrop: { timeout: 400 } }}
            >
              <Fade in={open}>
                <Box sx={modalStyle}>
                  {btnState === "Book Appointment" ? (
                    <AddAppointment close={() => setOpen(false)} modal="modal" />
                  ) : (
                    <Box sx={{ p: 4 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: "#1a1a2e" }}>
                          My Appointments
                        </Typography>
                        <IconButton onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <MyAppointments />
                    </Box>
                  )}
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Box>
      </Box>
    </>
  );
};

/* ---------- Quick Action Button ---------- */
const QuickActionButton = ({ icon, label, onClick }) => (
  <Button
    onClick={onClick}
    fullWidth
    startIcon={React.cloneElement(icon, { sx: { fontSize: 20 } })}
    endIcon={<ArrowForwardIcon sx={{ fontSize: 16, color: "#94a3b8" }} />}
    sx={{
      justifyContent: "space-between",
      py: 1.6,
      px: 2.5,
      borderRadius: "14px",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.9rem",
      color: "#334155",
      border: "1px solid rgba(0,0,0,0.08)",
      background: "#fff",
      transition: "all 0.3s",
      "&:hover": {
        background: "rgba(82,125,199,0.04)",
        borderColor: "rgba(82,125,199,0.25)",
        color: "#527dc7",
        "& .MuiSvgIcon-root:last-child": { color: "#527dc7", transform: "translateX(2px)" },
      },
    }}
  >
    {label}
  </Button>
);

export default PatientDash;