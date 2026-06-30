import { Box, Typography, IconButton, TextField, Button, Divider } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Footer() {
  const FooterLink = ({ label }) => (
    <Typography
      sx={{
        color: "rgba(255,255,255,0.7)",
        fontSize: "0.9rem",
        mb: 1.4,
        cursor: "pointer",
        transition: "all 0.25s",
        "&:hover": {
          color: "#ffffff",
          transform: "translateX(6px)",
        },
      }}
    >
      {label}
    </Typography>
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0f1d35 0%, #132543 50%, #0a1628 100%)",
        color: "#ffffff",
        pt: { xs: 6, md: 10 },
        pb: 3,
        px: { xs: 3, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -80,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(82,125,199,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -60,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Wave Divider */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #527dc7 0%, #6c63ff 50%, #527dc7 100%)" }} />

      {/* Main Footer Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand Column */}
        <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            HealthLink
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.8, mb: 3 }}>
            Your trusted online platform for booking doctors, consulting specialists, and managing your medical records — anytime, anywhere.
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {[LinkedInIcon, InstagramIcon, TwitterIcon, FacebookIcon].map((IconComp, i) => (
              <IconButton
                key={i}
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  transition: "all 0.3s",
                  "&:hover": {
                    color: "#fff",
                    background: "rgba(255,255,255,0.08)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <IconComp sx={{ fontSize: 20 }} />
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Quick Links */}
        <Box sx={{ flex: { xs: "1 1 45%", sm: "1 1 45%", md: "1 1 15%" } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, fontSize: "1rem", letterSpacing: "0.5px" }}>
            Services
          </Typography>
          <FooterLink label="Book Appointment" />
          <FooterLink label="Online Consultation" />
          <FooterLink label="Health Check" />
          <FooterLink label="Medical Records" />
          <FooterLink label="Lab Reports" />
        </Box>

        <Box sx={{ flex: { xs: "1 1 45%", sm: "1 1 45%", md: "1 1 15%" } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, fontSize: "1rem", letterSpacing: "0.5px" }}>
            Company
          </Typography>
          <FooterLink label="About Us" />
          <FooterLink label="Careers" />
          <FooterLink label="Blog" />
          <FooterLink label="Contact" />
          <FooterLink label="Press Kit" />
        </Box>

        {/* Contact Column */}
        <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, fontSize: "1rem", letterSpacing: "0.5px" }}>
            Contact
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(82,125,199,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a5b4fc" }}>
              <LocationOnIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
              1234 Street Name, Karachi, Pakistan
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(82,125,199,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a5b4fc" }}>
              <PhoneIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
              +92 300 0000000
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(82,125,199,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a5b4fc" }}>
              <EmailIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
              support@healthlink.com
            </Typography>
          </Box>

          {/* Newsletter */}
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: "rgba(255,255,255,0.9)" }}>
            Subscribe to our newsletter
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              placeholder="Your email"
              size="small"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
                  "&.Mui-focused fieldset": { borderColor: "#527dc7" },
                },
                "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.4)" },
              }}
            />
            <Button
              variant="contained"
              sx={{
                minWidth: 44,
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ mt: 6, mb: 3, borderColor: "rgba(255,255,255,0.08)", position: "relative", zIndex: 1 }} />

      {/* Bottom Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 0.5 }}>
          © {new Date().getFullYear()} HealthLink. All rights reserved. Made with{" "}
          <FavoriteIcon sx={{ fontSize: 14, color: "#f87171" }} /> by HealthLink Team
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((text) => (
            <Typography
              key={text}
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "color 0.25s",
                "&:hover": { color: "#fff" },
              }}
            >
              {text}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;