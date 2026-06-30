import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import backimage from "../sign.png";
import Footer from "../Components/Footer";
import AuthContext from "../authContext";
import AddDoctorModal from "../Components/AddDoctorModal";

const Signup = () => {
  const context = useContext(AuthContext);
  const { createUser, fetchUsers } = context;

  const [dataArr, setDataArr] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    contact: "",
    gender: "",
    address: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ state: false, text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const genderArr = ["Male", "Female", "Other"];
  const docRef = useRef(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataArr({ ...dataArr, [name]: value });
  };

  const addUser = async () => {
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
    } catch (error) {
      console.log("Error in Signup: ", error);
      setError({ state: true, text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f7ff 100%)",
        }}
      >
        {/* Main content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 4, md: 6 },
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Split container */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: 1100,
              minHeight: 640,
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.08)",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ============ LEFT — HERO PANEL ============ */}
            <Box
              sx={{
                flex: 1,
                background: `linear-gradient(rgba(20, 35, 70, 0.55), rgba(10, 20, 40, 0.65)), url(${backimage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 6,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Overlay decorative elements */}
              <Box
                sx={{
                  position: "absolute",
                  top: -80,
                  right: -60,
                  width: 250,
                  height: 250,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -40,
                  left: -40,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "24px",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 4,
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <FavoriteIcon sx={{ fontSize: 38, color: "#fff" }} />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                  mb: 2,
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                Join
                <br />
                HealthLink Today
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  lineHeight: 1.8,
                  mb: 4,
                  fontSize: "0.95rem",
                  maxWidth: 320,
                }}
              >
                Create your free account and take control of your healthcare journey
                with verified doctors at your fingertips.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  maxWidth: 280,
                }}
              >
                {[
                  "Free account — no hidden charges",
                  "Book appointments in seconds",
                  "Access your medical records 24/7",
                ].map((text, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        minWidth: 8,
                        borderRadius: "50%",
                        background: "#6c63ff",
                        boxShadow: "0 0 10px rgba(108,99,255,0.5)",
                      }}
                    />
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem" }}
                    >
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ============ RIGHT — FORM ============ */}
            <Box
              sx={{
                flex: 1.2,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 3, md: 5 },
              }}
            >
              {/* Logo */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(82,125,199,0.3)",
                  }}
                >
                  <FavoriteIcon sx={{ fontSize: 18, color: "#fff" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #1e3a5f 0%, #527dc7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.5px",
                  }}
                >
                  HealthLink
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.5px",
                  mb: 0.5,
                }}
              >
                Create your account
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#64748b", mb: 3.5, fontSize: "0.9rem" }}
              >
                Start your healthcare journey today
              </Typography>

              {/* Form */}
              <Box
                component="form"
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  addUser();
                }}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {/* Row 1 — Name + Email */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
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
                    sx={inputStyle}
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
                    sx={inputStyle}
                  />
                </Box>

                {/* Row 2 — Age + Contact + Gender */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
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
                    sx={inputStyle}
                  />
                  <TextField
                    name="contact"
                    label="Contact"
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
                    sx={inputStyle}
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
                      <TextField {...params} label="Gender" name="gender" sx={inputStyle} />
                    )}
                  />
                </Box>

                {/* Address */}
                <TextField
                  name="address"
                  label="Address"
                  value={dataArr.address}
                  onChange={onChangeHandler}
                  required
                  fullWidth
                  multiline
                  rows={2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#94a3b8", fontSize: 20, mt: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    ...inputStyle,
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

                {/* Password */}
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={
                    error.state &&
                    error.text === "Password must be at least 6 characters long."
                  }
                  sx={inputStyle}
                >
                  <InputLabel htmlFor="signup-password">Password</InputLabel>
                  <OutlinedInput
                    id="signup-password"
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
                  <FormHelperText sx={{ fontSize: "10px" }}>
                    {error.state &&
                      error.text === "Password must be at least 6 characters long."
                      ? error.text
                      : ""}
                  </FormHelperText>
                </FormControl>

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
                      }}
                    >
                      {error.text}
                    </Typography>
                  )}

                {/* Buttons Row */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
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
                      py: 1.5,
                      px: 4,
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
                    {loading ? "Creating Account..." : "Sign Up"}
                  </Button>

                  <Typography
                    variant="body2"
                    onClick={() => {
                      docRef.current.click();
                    }}
                    sx={{
                      color: "#527dc7",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      transition: "all 0.25s",
                      "&:hover": {
                        color: "#6c63ff",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign up as doctor?
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Footer />
        <AddDoctorModal docRef={docRef} />
      </Box>
    </>
  );
};

/* Shared input styling */
const inputStyle = {
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

export default Signup;