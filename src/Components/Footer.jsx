import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { LinkedIn, Instagram } from "@mui/icons-material";

function Footer() {
  const FooterLink = ({ label }) => {
  return (
    <Typography
      sx={{
        color: "#bfbfbf",
        mb: 1.2,
        cursor: "pointer",
        "&:hover": { color: "#ffffff" },
      }}
    >
      {label}
    </Typography>
  );
}

  return (
    <Box
      sx={{
        backgroundColor: "#062449ff",
        color: "#ffffff",
        pt: 8,
        pb: 4,
        px: { xs: 3, md: 10 },
        mt: 10
      }}
    >
      <Grid container spacing={4}>
        {/* About */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            HealthLink
          </Typography>
          <Typography sx={{ color: "#bfbfbf", lineHeight: 1.7 }}>
            Your trusted online platform for booking doctors, consulting
            specialists, and managing your medical records — anytime,
            anywhere.
          </Typography>

          <Box sx={{ mt: 2 }}>
            <IconButton sx={{ color: "#ffffff" }}>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: "#ffffff", ml: 1 }}>
              <Instagram />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Services
          </Typography>
          <FooterLink label="Book Appointment" />
          <FooterLink label="Online Consultation" />
          <FooterLink label="Health Check" />
          <FooterLink label="Medical Records" />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Company
          </Typography>
          <FooterLink label="About Us" />
          <FooterLink label="Careers" />
          <FooterLink label="Blog" />
          <FooterLink label="Contact" />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Contact
          </Typography>
          <Typography sx={{ color: "#bfbfbf" }}>
            1234 Street Name, Karachi, Pakistan
          </Typography>
          <Typography sx={{ color: "#bfbfbf", mt: 1 }}>
            +92 300 0000000
          </Typography>
          <Typography sx={{ color: "#bfbfbf", mt: 1 }}>
            support@healthlink.com
          </Typography>
        </Grid>
      </Grid>

      
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          mt: 5,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ color: "#bfbfbf" }}>
          © {new Date().getFullYear()} HealthLink. All rights reserved.
        </Typography>
        <Link href="#" sx={{ color: "#bfbfbf", textDecoration: "none" }}>
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
}


export default Footer;

