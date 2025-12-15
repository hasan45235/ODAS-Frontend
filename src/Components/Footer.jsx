import { Box, Typography,  Link, IconButton } from "@mui/material";
import { LinkedIn, Instagram } from "@mui/icons-material";

function Footer() {


  const FooterLink = ({ label }) => {
    return (
      
      <Typography sx={{ color: "#bfbfbf", fontSize:"14px", mb: 1.2, cursor: "pointer", "&:hover": { color: "#ffffff" },}}>{label}</Typography>

    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#124583ff",
        color: "#ffffff",
        pt: 8,
        pb: 4,
        px: { xs: 3, md: 10 },
        mt: 10
      }}
    >
      <Box sx={{display:"flex",justifyContent:"space-evenly"}} >
        {/* About */}
        <Box sx={{width:'20%'}}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            HealthLink
          </Typography>
          <Typography sx={{ color: "#bfbfbf",fontSize:"15px" }}>
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
        </Box>

        <Box sx={{width:'20%',fontSize:"12px"}}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Services
          </Typography>
          <FooterLink label="Book Appointment" />
          <FooterLink label="Online Consultation" />
          <FooterLink label="Health Check" />
          <FooterLink label="Medical Records" />
        </Box>

        <Box sx={{width:'20%',fontSize:"12px"}}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Company
          </Typography>
          <FooterLink label="About Us" />
          <FooterLink label="Careers" />
          <FooterLink label="Blog" />
          <FooterLink label="Contact" />
        </Box>

        <Box sx={{width:'20%',fontSize:"12px"}}>
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
        </Box>
      </Box>

      
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

