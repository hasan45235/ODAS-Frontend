import React, { useContext, useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AuthContext from "../authContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: "85%", lg: "75%" },
  maxWidth: 900,
  maxHeight: "90vh",
  bgcolor: "#fff",
  borderRadius: "24px",
  boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
  overflow: "auto",
  outline: "none",
};

const AddDoctorModal = ({ docRef }) => {
  const context = useContext(AuthContext);
  const { createUser } = context;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  const genderArr = ["Male", "Female", "Other"];

  const [dataArr, setDataArr] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    contact: "",
    gender: "",
    address: "",
    bio: "",
    speciality: "",
    experience: "",
    fee: 0,
    qualification: "",
    role: "doctor",
  });

  const [error, setError] = useState({ state: false, text: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataArr({ ...dataArr, [name]: value });
  };

  const creatingUser = async () => {
    setLoading(true);
    setError({ state: false, text: "" });

    if (dataArr.password.length <= 6) {
      setError({ state: true, text: "Password must be at least 6 characters long." });
      setLoading(false);
      return;
    }

    try {
      let result = await createUser(dataArr);
      if (result.error) {
        setError({ state: true, text: result.error });
        setLoading(false);
        return;
      }
      handleClose();
    } catch (error) {
      console.log("Error in Doctor Signup: ", error);
      setError({ state: true, text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <>
      <Button onClick={handleOpen} ref={docRef} sx={{ display: "none" }}>
        Open modal
      </Button>

      <Modal
        aria-labelledby="doctor-registration-modal"
        aria-describedby="doctor-registration-form"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: { timeout: 500 },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* Header */}
            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a7a 100%)",
                p: 3,
                px: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "24px 24px 0 0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "14px",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <MedicalServicesOutlinedIcon sx={{ fontSize: 24, color: "#fff" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}
                  >
                    Doctor Registration
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>
                    Join HealthLink as a verified medical professional
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={handleClose}
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { color: "#fff", background: "rgba(255,255,255,0.1)" },
                }}
              >
                <Close sx={{ fontSize: 24 }} />
              </IconButton>
            </Box>

            {/* Form */}
            <Box
              component="form"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                creatingUser();
              }}
              sx={{ p: { xs: 3, md: 5 } }}
            >
              {/* Section: Personal Info */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <PersonOutlineIcon sx={{ color: "#527dc7", fontSize: 22 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#1a1a2e" }}
                  >
                    Personal Information
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <TextField
                    name="name"
                    label="Full Name"
                    value={dataArr.name}
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
                    sx={fieldSx}
                  />
                  <TextField
                    name="email"
                    type="email"
                    label="Email"
                    value={dataArr.email}
                    onChange={onChangeHandler}
                    required
                    fullWidth
                    error={
                      error.state &&
                      error.text === "Sorry a user with this email already exists"
                    }
                    helperText={
                      error.state &&
                        error.text === "Sorry a user with this email already exists"
                        ? error.text
                        : ""
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldSx}
                  />
                  <TextField
                    name="age"
                    type="number"
                    label="Age"
                    value={dataArr.age}
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
                    sx={fieldSx}
                  />
                  <Autocomplete
                    disablePortal
                    options={genderArr}
                    onChange={(event, newValue) => {
                      setDataArr((prev) => ({
                        ...prev,
                        gender: newValue ? newValue : "",
                      }));
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Gender" name="gender" sx={fieldSx} />
                    )}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.06)" }} />

              {/* Section: Contact Info */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <PhoneIcon sx={{ color: "#527dc7", fontSize: 22 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#1a1a2e" }}
                  >
                    Contact Details
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <TextField
                    name="contact"
                    label="Contact Number"
                    value={dataArr.contact}
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
                    sx={fieldSx}
                  />

                  <TextField
                    name="address"
                    label="Clinic / Hospital Address"
                    value={dataArr.address}
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
                    sx={fieldSx}
                  />

                  {/* Password */}
                  <FormControl fullWidth variant="outlined" sx={fieldSx}>
                    <InputLabel htmlFor="doc-password">Password</InputLabel>
                    <OutlinedInput
                      id="doc-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={dataArr.password}
                      onChange={onChangeHandler}
                      required
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{ color: "#94a3b8" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      sx={{
                        borderRadius: "12px",
                        "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(82,125,199,0.4)",
                        },
                      }}
                    />
                  </FormControl>
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.06)" }} />

              {/* Section: Professional Info */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <WorkOutlineIcon sx={{ color: "#527dc7", fontSize: 22 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#1a1a2e" }}
                  >
                    Professional Details
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <TextField
                    name="qualification"
                    label="Qualification"
                    value={dataArr.qualification}
                    onChange={onChangeHandler}
                    required
                    fullWidth
                    placeholder="e.g. MBBS, FCPS"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SchoolOutlinedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldSx}
                  />
                  <TextField
                    name="speciality"
                    label="Speciality"
                    value={dataArr.speciality}
                    onChange={onChangeHandler}
                    required
                    fullWidth
                    placeholder="e.g. Cardiologist"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MedicalServicesOutlinedIcon
                            sx={{ color: "#94a3b8", fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldSx}
                  />
                  <TextField
                    name="experience"
                    label="Experience (years)"
                    value={dataArr.experience}
                    onChange={onChangeHandler}
                    required
                    fullWidth
                    placeholder="e.g. 5"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkOutlineIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldSx}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <TextField
                    name="bio"
                    label="Bio"
                    value={dataArr.bio}
                    onChange={onChangeHandler}
                    required
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Brief introduction about your practice..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InfoOutlinedIcon
                            sx={{ color: "#94a3b8", fontSize: 20, mt: 1 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      ...fieldSx,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(82,125,199,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#527dc7",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                  <TextField
                    name="fee"
                    type="number"
                    label="Consultation Fee (PKR)"
                    value={dataArr.fee}
                    onChange={onChangeHandler}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldSx}
                  />
                </Box>
              </Box>

              {/* Password error */}
              {error.state &&
                error.text === "Password must be at least 6 characters long." && (
                  <Typography
                    sx={{
                      color: "#ef4444",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      background: "rgba(239,68,68,0.06)",
                      py: 1,
                      borderRadius: "8px",
                      mb: 2,
                    }}
                  >
                    {error.text}
                  </Typography>
                )}

              {/* General error */}
              {error.state &&
                error.text !== "Password must be at least 6 characters long." &&
                error.text !== "Sorry a user with this email already exists" && (
                  <Typography
                    sx={{
                      color: "#ef4444",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      background: "rgba(239,68,68,0.06)",
                      py: 1,
                      borderRadius: "8px",
                      mb: 2,
                    }}
                  >
                    {error.text}
                  </Typography>
                )}

              {/* Submit */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 3,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  pt: 3,
                }}
              >
                <Button
                  onClick={handleClose}
                  sx={{
                    px: 4,
                    py: 1.4,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#64748b",
                    transition: "all 0.25s",
                    "&:hover": { background: "rgba(0,0,0,0.04)", color: "#334155" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  endIcon={
                    loading ? (
                      <CircularProgress size={20} sx={{ color: "#fff" }} />
                    ) : (
                      <ArrowForwardIcon />
                    )
                  }
                  sx={{
                    px: 5,
                    py: 1.4,
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
                  {loading ? "Registering..." : "Register as Doctor"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

/* Shared field styling */
const fieldSx = {
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

export default AddDoctorModal;