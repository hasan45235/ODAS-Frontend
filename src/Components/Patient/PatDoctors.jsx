import React, { useContext, useEffect, useState } from "react";
import DashboardSidebar from "../SideBar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  IconButton,
  Modal,
  Toolbar,
  Typography,
  Chip,
  Divider,
  Avatar,
  InputAdornment,
  TextField,
  Backdrop,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import AuthContext from "../../authContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddAppointments from "./AddAppointment";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Oval } from "react-loader-spinner";

/* ---------- Modal Styles ---------- */
const appointmentModalStyle = {
  position: "absolute",
  top: 40,
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  maxWidth: 700,
  bgcolor: "#fff",
  borderRadius: "24px",
  boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
  outline: "none",
  mb: 8,
};

const detailModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 520,
  bgcolor: "#fff",
  borderRadius: "24px",
  boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
  outline: "none",
};

/* ---------- Info Row ---------- */
function InfoRow({ label, value }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 1.2 }}>
      <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 600, color: "#1a1a2e" }}>{value ?? "—"}</Typography>
    </Box>
  );
}

const PatDoctors = () => {
  const context = useContext(AuthContext);
  const { fetchUsers, allUsers } = context;

  const doctors = allUsers.filter((user) => user.role === "doctor");
  const [searchTerm, setSearchTerm] = useState("");

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

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
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const term = searchTerm.toLowerCase();
    return (
      doc.name?.toLowerCase().includes(term) ||
      doc.speciality?.toLowerCase().includes(term) ||
      doc.hospital?.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8faff" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />

          <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: "auto" }}>
            {/* ===== HEADER ===== */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
                mt: 1,
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
                  Available Doctors
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b" }}>
                  {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} found
                </Typography>
              </Box>

              {/* Search */}
              <TextField
                placeholder="Search by name, specialty, or hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  minWidth: 280,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    background: "#fff",
                    "& fieldset": { borderColor: "rgba(0,0,0,0.08)" },
                    "&:hover fieldset": { borderColor: "rgba(82,125,199,0.4)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#527dc7",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
            </Box>

            <Divider sx={{ mb: 4, borderColor: "rgba(0,0,0,0.06)" }} />

            {/* ===== DOCTORS GRID ===== */}
            {doctors.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60vh",
                }}
              >
                <Oval
                  height="80"
                  width="80"
                  color="#527dc7"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#a5b4fc"
                  strokeWidth={3}
                  strokeWidthSecondary={3}
                />
              </Box>
            ) : filteredDoctors.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 10,
                  background: "#fff",
                  borderRadius: "24px",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <MedicalServicesOutlinedIcon
                  sx={{ fontSize: 60, color: "#cbd5e1", mb: 2 }}
                />
                <Typography variant="h6" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                  No doctors match your search
                </Typography>
                <Button
                  onClick={() => setSearchTerm("")}
                  sx={{ mt: 1, color: "#527dc7", fontWeight: 600, textTransform: "none" }}
                >
                  Clear search
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "repeat(auto-fill, minmax(320px, 1fr))",
                  },
                  gap: 3,
                }}
              >
                {filteredDoctors.map((doctor) => {
                  const initials = doctor?.name?.[0]?.toUpperCase() || "D";
                  const isActive = doctor?.status === "active";

                  return (
                    <Card
                      key={doctor._id}
                      elevation={0}
                      sx={{
                        borderRadius: "20px",
                        border: "1px solid rgba(0,0,0,0.06)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                        overflow: "visible",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 20px 40px rgba(82,125,199,0.12)",
                          borderColor: "rgba(82,125,199,0.25)",
                        },
                      }}
                    >
                      {/* Top accent bar */}
                      <Box
                        sx={{
                          height: 4,
                          background: isActive
                            ? "linear-gradient(90deg, #527dc7, #6c63ff)"
                            : "linear-gradient(90deg, #cbd5e1, #94a3b8)",
                          borderRadius: "20px 20px 0 0",
                        }}
                      />

                      <CardContent sx={{ p: 3, pt: 4, position: "relative" }}>
                        {/* Avatar */}
                        <Box sx={{ display: "flex", justifyContent: "center", mb: -3 }}>
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              mt: -7,
                              border: "4px solid #fff",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                              background: isActive
                                ? "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)"
                                : "linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)",
                              fontWeight: 700,
                              fontSize: "1.3rem",
                            }}
                          >
                            {initials}
                          </Avatar>
                        </Box>

                        {/* Name + Verified */}
                        <Box
                          sx={{
                            textAlign: "center",
                            mt: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1rem" }}
                              noWrap
                            >
                              Dr. {doctor?.name}
                            </Typography>
                            <VerifiedRoundedIcon
                              sx={{
                                color: isActive ? "#527dc7" : "#94a3b8",
                                fontSize: 18,
                              }}
                            />
                          </Box>

                          {/* Status + Specialty */}
                          <Box sx={{ display: "flex", gap: 0.8, mb: 2 }}>
                            <Chip
                              label={doctor?.speciality || "General"}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                background:
                                  "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                                color: "#527dc7",
                              }}
                            />
                            <Chip
                              label={isActive ? "Active" : "Inactive"}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                background: isActive
                                  ? "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)"
                                  : "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
                                color: isActive ? "#16a34a" : "#ef4444",
                                border: isActive
                                  ? "1px solid rgba(22,163,74,0.2)"
                                  : "1px solid rgba(239,68,68,0.2)",
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Details */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.2,
                            mb: 2.5,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LocationOnIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
                            <Typography sx={{ color: "#64748b", fontSize: "0.82rem" }}>
                              {doctor?.hospital || "N/A"}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AccessTimeIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
                            <Typography sx={{ color: "#64748b", fontSize: "0.82rem" }}>
                              {doctor?.experience || "N/A"} yrs experience
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AttachMoneyIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
                            <Typography
                              sx={{
                                color: "#64748b",
                                fontSize: "0.82rem",
                                fontWeight: 600,
                              }}
                            >
                              Rs. {doctor?.fee || "N/A"} / visit
                            </Typography>
                          </Box>
                        </Box>

                        {/* Action buttons */}
                        <Box sx={{ display: "flex", gap: 1.5 }}>
                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleOpen(doctor)}
                            sx={{
                              py: 1.2,
                              borderRadius: "12px",
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: "0.82rem",
                              color: "#527dc7",
                              borderColor: "rgba(82,125,199,0.25)",
                              transition: "all 0.25s",
                              "&:hover": {
                                borderColor: "#527dc7",
                                background: "rgba(82,125,199,0.06)",
                              },
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            )}

            {/* ===== DETAIL MODAL ===== */}
            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{ backdrop: { timeout: 400 } }}
            >
              <Fade in={open}>
                <Box sx={detailModalStyle}>
                  {selectedDoctor && (
                    <>
                      {/* Header */}
                      <Box
                        sx={{
                          p: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background:
                                "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                              fontWeight: 700,
                              fontSize: "1.2rem",
                            }}
                          >
                            {selectedDoctor?.name?.[0]}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, color: "#1a1a2e", mb: 0.3 }}
                            >
                              Dr. {selectedDoctor?.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#64748b" }}>
                              {selectedDoctor?.speciality}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1, flexDirection: "column", alignItems: "flex-end" }}>
                          <IconButton
                            onClick={handleClose}
                            size="small"
                            sx={{ color: "#94a3b8" }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                          <Chip
                            label={selectedDoctor?.status}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              background:
                                selectedDoctor?.status === "active"
                                  ? "linear-gradient(135deg, #f0fdf4, #ecfdf5)"
                                  : "linear-gradient(135deg, #fef2f2, #fee2e2)",
                              color:
                                selectedDoctor?.status === "active"
                                  ? "#16a34a"
                                  : "#ef4444",
                              border:
                                selectedDoctor?.status === "active"
                                  ? "1px solid rgba(22,163,74,0.2)"
                                  : "1px solid rgba(239,68,68,0.2)",
                            }}
                          />
                        </Box>
                      </Box>

                      <Divider sx={{ borderColor: "rgba(0,0,0,0.06)" }} />

                      <Box sx={{ p: 3, pt: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                          <InfoRow label="Hospital" value={selectedDoctor?.hospital} />
                          <InfoRow
                            label="Qualification"
                            value={selectedDoctor?.qualification}
                          />
                          <InfoRow
                            label="Experience"
                            value={`${selectedDoctor?.experience} years`}
                          />
                          <InfoRow label="Gender" value={selectedDoctor?.gender} />
                          <InfoRow
                            label="Consultation Fee"
                            value={`Rs. ${selectedDoctor?.fee}`}
                          />
                        </Box>

                        <Button
                          fullWidth
                          variant="contained"
                          disabled={selectedDoctor?.status !== "active"}
                          onClick={handleOpen2}
                          endIcon={<CalendarMonthIcon />}
                          sx={{
                            mt: 3,
                            py: 1.6,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            background:
                              "linear-gradient(135deg, #527dc7 0%, #6c63ff 50%, #527dc7 100%)",
                            backgroundSize: "200% 200%",
                            backgroundPosition: "0% 0%",
                            boxShadow: "0 6px 24px rgba(82,125,199,0.35)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              backgroundPosition: "100% 100%",
                              boxShadow: "0 10px 32px rgba(82,125,199,0.5)",
                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          Book Appointment
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Fade>
            </Modal>

            {/* ===== APPOINTMENT MODAL ===== */}
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="appointment-modal"
              aria-describedby="appointment-form"
            >
              <Box sx={appointmentModalStyle}>
                <AddAppointments
                  doctor={selectedDoctor}
                  closeDoc={() => handleClose2()}
                  closeDocAdd={() => handleClose()}
                />
              </Box>
            </Modal>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PatDoctors;