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
  InputAdornment,
  CircularProgress,
  IconButton,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../SideBar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../authContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ShieldIcon from "@mui/icons-material/Shield";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";

/* ---------- Modal Style ---------- */
const modalStyle = {
  position: "absolute",
  top: 40,
  left: "50%",
  transform: "translateX(-50%)",
  width: "70%",
  bgcolor: "#fff",
  borderRadius: "24px",
  boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
  outline: "none",
  mb: 8,
};

/* ---------- Info Row ---------- */
const InfoRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      py: 1.5,
      px: 2,
      borderRadius: "12px",
      transition: "background 0.2s",
      alignItems: "center",
      "&:hover": { background: "rgba(82,125,199,0.04)" },
    }}
  >
    <Typography sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.9rem" }}>
      {label}
    </Typography>
    <Typography sx={{ fontWeight: 600, color: "#1a1a2e", fontSize: "0.9rem" }}>
      {value || "—"}
    </Typography>
  </Box>
);

/* ---------- Shared Input Style ---------- */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(82,125,199,0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#527dc7",
      borderWidth: "2px",
    },
  },
};

const PatProfile = () => {
  const context = useContext(AuthContext);
  const { currentUser, fetchCurrentUser, updateUser } = context;

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const genderArr = ["Male", "Female", "Other"];
  const [updatedDataArr, setUpdatedDataArr] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    age: currentUser?.age || "",
    contact: currentUser?.contact || "",
    gender: currentUser?.gender || "",
    address: currentUser?.address || "",
  });

  useEffect(() => {
    if (currentUser) {
      setUpdatedDataArr({
        name: currentUser.name || "",
        email: currentUser.email || "",
        age: currentUser.age || "",
        contact: currentUser.contact || "",
        gender: currentUser.gender || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser]);

  const updatingUser = async () => {
    setSaving(true);
    await updateUser({ ...updatedDataArr, id: currentUser._id });
    setSaving(false);
    handleClose();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Profile has been updated",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedDataArr({ ...updatedDataArr, [name]: value });
  };

  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line
  }, []);

  const isActive = currentUser?.status === "active";
  const initials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8faff" }}>
      {/* ===== EDIT PROFILE MODAL ===== */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 400 } }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            {/* Modal Header */}
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EditOutlinedIcon sx={{ fontSize: 18, color: "#fff" }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px" }}
                >
                  Edit Profile
                </Typography>
              </Box>
              <IconButton onClick={handleClose} sx={{ color: "#94a3b8" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Modal Form */}
            <Card
              component="form"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                updatingUser();
              }}
              sx={{ width: "80%", p: 3, boxShadow: "none",m:"0px auto" }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2.5,
                  mb: 2.5,
                }}
              >
                <TextField
                  name="name"
                  label="Full Name"
                  value={updatedDataArr.name}
                  onChange={onChangeHandler}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
                <TextField
                  name="email"
                  label="Email"
                  value={updatedDataArr.email}
                  disabled
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
                <TextField
                  name="age"
                  type="number"
                  label="Age"
                  value={updatedDataArr.age}
                  onChange={onChangeHandler}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
                <TextField
                  name="contact"
                  label="Contact"
                  value={updatedDataArr.contact}
                  onChange={onChangeHandler}
                  required
                  fullWidth
                  inputProps={{ maxLength: 11 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
                <Autocomplete
                  disablePortal
                  options={genderArr}
                  value={updatedDataArr.gender || null}
                  onChange={(event, newValue) => {
                    setUpdatedDataArr((prev) => ({
                      ...prev,
                      gender: newValue || "",
                    }));
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Gender" name="gender" sx={inputSx} />
                  )}
                />
                <TextField
                  name="address"
                  label="Address"
                  value={updatedDataArr.address}
                  onChange={onChangeHandler}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 1 }}>
                <Button
                  onClick={handleClose}
                  sx={{
                    px: 3,
                    py: 1.3,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#64748b",
                    "&:hover": { background: "rgba(0,0,0,0.04)" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  startIcon={
                    saving ? (
                      <CircularProgress size={18} sx={{ color: "#fff" }} />
                    ) : (
                      <SaveOutlinedIcon />
                    )
                  }
                  sx={{
                    px: 4,
                    py: 1.3,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    background:
                      "linear-gradient(135deg, #527dc7 0%, #6c63ff 50%, #527dc7 100%)",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "0% 0%",
                    boxShadow: "0 4px 16px rgba(82,125,199,0.35)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundPosition: "100% 100%",
                      boxShadow: "0 8px 28px rgba(82,125,199,0.5)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Card>
          </Box>
        </Fade>
      </Modal>

      <DashboardSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />

        {!currentUser || Object.keys(currentUser).length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
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
        ) : (
          <Box sx={{ maxWidth: 900, mx: "auto", mt: 2 }}>
            {/* ===== PROFILE CARD ===== */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative accent */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: isActive
                    ? "linear-gradient(90deg, #527dc7, #6c63ff, #527dc7)"
                    : "linear-gradient(90deg, #cbd5e1, #94a3b8)",
                }}
              />

              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 3,
                  mb: 4,
                  pt: 1,
                }}
              >
                {/* Avatar + Info */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background:
                        "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                      fontWeight: 700,
                      fontSize: "1.6rem",
                      border: "4px solid #fff",
                      boxShadow: "0 8px 24px rgba(82,125,199,0.25)",
                    }}
                  >
                    {initials}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.3 }}>
                      <Typography
                        sx={{
                          fontSize: "1.4rem",
                          fontWeight: 700,
                          color: "#1a1a2e",
                        }}
                      >
                        {currentUser?.name}
                      </Typography>
                      <VerifiedRoundedIcon sx={{ color: "#527dc7", fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ color: "#64748b", fontSize: "0.9rem", mb: 0.5 }}>
                      {currentUser?.email}
                    </Typography>
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                      {currentUser?.contact}
                    </Typography>
                  </Box>
                </Box>

                {/* Status + Edit */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1.5 }}>
                  <Chip
                    label={isActive ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      background: isActive
                        ? "linear-gradient(135deg, #f0fdf4, #ecfdf5)"
                        : "linear-gradient(135deg, #fef2f2, #fee2e2)",
                      color: isActive ? "#16a34a" : "#ef4444",
                      border: isActive
                        ? "1px solid rgba(22,163,74,0.2)"
                        : "1px solid rgba(239,68,68,0.2)",
                    }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<EditOutlinedIcon />}
                    onClick={handleOpen}
                    sx={{
                      py: 1.2,
                      px: 3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      background:
                        "linear-gradient(135deg, #527dc7 0%, #6c63ff 50%, #527dc7 100%)",
                      backgroundSize: "200% 200%",
                      backgroundPosition: "0% 0%",
                      boxShadow: "0 4px 16px rgba(82,125,199,0.3)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        backgroundPosition: "100% 100%",
                        boxShadow: "0 8px 28px rgba(82,125,199,0.45)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.06)" }} />

              {/* Personal Information */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BadgeOutlinedIcon sx={{ fontSize: 16, color: "#527dc7" }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.05rem" }}>
                    Personal Information
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "rgba(248,250,255,0.6)",
                    borderRadius: "16px",
                    p: 1,
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  <InfoRow label="Age" value={currentUser?.age} />
                  <Divider sx={{ borderColor: "rgba(0,0,0,0.04)", mx: 2 }} />
                  <InfoRow label="Gender" value={currentUser?.gender} />
                  <Divider sx={{ borderColor: "rgba(0,0,0,0.04)", mx: 2 }} />
                  <InfoRow label="Address" value={currentUser?.address} />
                </Box>
              </Box>

              {/* Security note */}
              <Box
                sx={{
                  mt: 4,
                  p: 2.5,
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <ShieldIcon sx={{ color: "#527dc7", fontSize: 24 }} />
                <Typography sx={{ color: "#475569", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  Your personal information is encrypted and secure. Only you and authorized
                  medical professionals can access your data.
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PatProfile;