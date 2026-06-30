import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Footer from "../Components/Footer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AuthContext from "../authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const context = useContext(AuthContext);
  const { loginUser } = context;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ state: false, text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [dataArr, setDataArr] = useState({ email: "", password: "" });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataArr({ ...dataArr, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError({ state: false, text: "" });
    try {
      const result = await loginUser(dataArr);
      if (result.error) {
        setError({ state: true, text: result.error });
      }
    } catch (error) {
      setError({ state: true, text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

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
            py: { xs: 4, md: 8 },
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Split container */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: 1000,
              minHeight: 580,
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.08)",
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            {/* ============ LEFT — FORM ============ */}
            <Box
              sx={{
                flex: 1,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 4, md: 6 },
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
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
                    background: "linear-gradient(135deg, #1e3a5f 0%, #527dc7 100%)",
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
                Welcome back
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#64748b", mb: 4, fontSize: "0.9rem" }}
              >
                Sign in to access your health dashboard
              </Typography>

              {/* Form */}
              <Box
                component="form"
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
              >
                {/* Email */}
                <TextField
                  name="email"
                  type="email"
                  label="Email Address"
                  value={dataArr.email}
                  onChange={onChangeHandler}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                      "&:hover fieldset": { borderColor: "rgba(82,125,199,0.4)" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#527dc7",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />

                {/* Password */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="login-password">Password</InputLabel>
                  <OutlinedInput
                    id="login-password"
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
                      "&:hover fieldset": { borderColor: "rgba(82,125,199,0.4)" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#527dc7",
                        borderWidth: "2px",
                      },
                    }}
                  />
                </FormControl>

                {/* Remember me + Forgot */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{
                          color: "#94a3b8",
                          "&.Mui-checked": { color: "#527dc7" },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "0.82rem", color: "#64748b" }}>
                        Remember me
                      </Typography>
                    }
                  />
                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      color: "#527dc7",
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline", color: "#6c63ff" },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Box>

                {/* Error */}
                {error.state && (
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

                {/* Submit */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  endIcon={
                    loading ? (
                      <CircularProgress size={20} sx={{ color: "#fff" }} />
                    ) : (
                      <ArrowForwardIcon />
                    )
                  }
                  sx={{
                    py: 1.6,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
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
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                {/* Divider */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    my: 1,
                  }}
                >
                  <Divider sx={{ flex: 1, borderColor: "rgba(0,0,0,0.08)" }} />
                  <Typography
                    sx={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500 }}
                  >
                    or continue with
                  </Typography>
                  <Divider sx={{ flex: 1, borderColor: "rgba(0,0,0,0.08)" }} />
                </Box>

                {/* Social Buttons */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    sx={{
                      py: 1.3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "#334155",
                      borderColor: "rgba(0,0,0,0.12)",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "#527dc7",
                        background: "rgba(82,125,199,0.04)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GitHubIcon />}
                    sx={{
                      py: 1.3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "#334155",
                      borderColor: "rgba(0,0,0,0.12)",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "#527dc7",
                        background: "rgba(82,125,199,0.04)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    GitHub
                  </Button>
                </Box>

                {/* Signup link */}
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", color: "#64748b", mt: 1, fontSize: "0.85rem" }}
                >
                  Don't have an account?{" "}
                  <Box
                    component="span"
                    onClick={() => navigate("/signup")}
                    sx={{
                      color: "#527dc7",
                      fontWeight: 700,
                      cursor: "pointer",
                      "&:hover": { color: "#6c63ff", textDecoration: "underline" },
                    }}
                  >
                    Sign Up
                  </Box>
                </Typography>
              </Box>
            </Box>

            {/* ============ RIGHT — HERO PANEL ============ */}
            <Box
              sx={{
                flex: 1,
                background: "linear-gradient(160deg, #1e3a5f 0%, #2d4a7a 50%, #1a2744 100%)",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 6,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
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

              {/* Icon */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
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
                Your Health,
                <br />
                Your Way
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
                Book appointments, consult specialists, and manage your medical
                records — all from one secure platform.
              </Typography>

              {/* Feature bullets */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 280 }}>
                {[
                  "Verified doctors at your fingertips",
                  "Instant online appointment booking",
                  "Secure & encrypted medical records",
                ].map((text, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default Login;