import {
    Box,
    Typography,
    Container,
    Chip,
    Button,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ShieldIcon from "@mui/icons-material/Shield";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PublicIcon from "@mui/icons-material/Public";
import StarsIcon from "@mui/icons-material/Stars";
import Footer from "../Components/Footer";

const stats = [
    { icon: <PeopleIcon sx={{ fontSize: 36 }} />, value: "120K+", label: "Happy Patients" },
    { icon: <MedicalServicesIcon sx={{ fontSize: 36 }} />, value: "3,500+", label: "Verified Doctors" },
    { icon: <PublicIcon sx={{ fontSize: 36 }} />, value: "50+", label: "Cities Covered" },
    { icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />, value: "98%", label: "Satisfaction Rate" },
];

const values = [
    {
        icon: <VerifiedUserIcon sx={{ fontSize: 32 }} />,
        title: "Trust & Safety",
        desc: "Every doctor is verified with background checks. Your health data is encrypted and secure — only you and your doctor can access it.",
    },
    {
        icon: <StarsIcon sx={{ fontSize: 32 }} />,
        title: "Quality First",
        desc: "We partner exclusively with board-certified specialists who meet our rigorous standards for medical excellence and patient care.",
    },
    {
        icon: <ShieldIcon sx={{ fontSize: 32 }} />,
        title: "Privacy Protected",
        desc: "HIPAA-compliant infrastructure with end-to-end encryption. Your medical records, prescriptions, and appointments stay private — always.",
    },
];

const About = () => {
    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #f8faff 0%, #fff 50%)",
                }}
            >
                {/* Hero */}
                <Box
                    sx={{
                        background:
                            "linear-gradient(160deg, #1e3a5f 0%, #2d4a7a 50%, #1a2744 100%)",
                        pt: { xs: 10, md: 14 },
                        pb: { xs: 8, md: 10 },
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: -100,
                            right: -60,
                            width: 400,
                            height: 400,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.03)",
                            pointerEvents: "none",
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: -80,
                            left: -80,
                            width: 300,
                            height: 300,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.03)",
                            pointerEvents: "none",
                        }}
                    />
                    <Container maxWidth="md">
                        <Box sx={{ textAlign: "center", position: "relative" }}>
                            <Chip
                                icon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                                label="Our Story"
                                size="small"
                                sx={{
                                    mb: 3,
                                    background: "rgba(255,255,255,0.1)",
                                    color: "#fff",
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 800,
                                    color: "#fff",
                                    fontSize: { xs: "2rem", md: "2.8rem" },
                                    letterSpacing: "-0.5px",
                                    mb: 2,
                                }}
                            >
                                About{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        background: "linear-gradient(135deg, #a5b4fc, #6c63ff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    HealthLink
                                </Box>
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: "1.05rem",
                                    maxWidth: 600,
                                    mx: "auto",
                                    lineHeight: 1.7,
                                }}
                            >
                                We're on a mission to make quality healthcare accessible to everyone — anytime, anywhere.
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                {/* Mission */}
                <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 2 }}>
                    <Box
                        sx={{
                            p: { xs: 5, md: 8 },
                            borderRadius: 6,
                            background: "#fff",
                            border: "1px solid rgba(0,0,0,0.06)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
                            mb: 8,
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                color: "#0f172a",
                                letterSpacing: "-0.5px",
                                mb: 3,
                                fontSize: { xs: "1.8rem", md: "2.3rem" },
                            }}
                        >
                            Our Mission
                        </Typography>
                        <Typography
                            sx={{
                                color: "#475569",
                                fontSize: "1.1rem",
                                lineHeight: 1.9,
                                mb: 4,
                            }}
                        >
                            HealthLink was founded with a simple yet powerful belief: healthcare should not be a privilege — it
                            should be a right. We connect patients with verified doctors through a seamless digital platform,
                            eliminating long wait times, travel hassles, and confusion.
                        </Typography>
                        <Typography
                            sx={{
                                color: "#64748b",
                                fontSize: "1.05rem",
                                lineHeight: 1.9,
                            }}
                        >
                            Today, we serve over <strong>120,000 patients</strong> across <strong>50+ cities</strong> in Pakistan,
                            with a growing network of <strong>3,500+ verified specialists</strong>. From telemedicine consultations
                            to lab tests and pharmacy delivery, we're building the complete digital healthcare ecosystem.
                        </Typography>
                    </Box>
                </Container>

                {/* Stats */}
                <Container maxWidth="lg" sx={{ pb: 8 }}>
                    <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "space-evenly" }, flexWrap: "wrap", gap: { xs: 4, md: 5 } }}>
                        {stats.map((stat, i) => (
                            <Box width={{ xs: "100%", md: "15%" }} key={i}>
                                <Box
                                    sx={{
                                        p: 4,
                                        borderRadius: "24px",
                                        width: "100%",
                                        background: "#fff",
                                        border: "1px solid rgba(0,0,0,0.06)",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                                        textAlign: "center",
                                        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: "0 16px 36px rgba(82,125,199,0.12)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: "18px",
                                            background:
                                                "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#527dc7",
                                            mx: "auto",
                                            mb: 2.5,
                                        }}
                                    >
                                        {stat.icon}
                                    </Box>
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px" }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#64748b", fontWeight: 500, mt: 0.5 }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>

                {/* Our Values */}
                <Box sx={{ py: 8, background: "linear-gradient(180deg, #f0f4ff 0%, #f8faff 100%)" }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: "center", mb: 6 }}>
                            <Chip
                                label="Our Values"
                                size="small"
                                sx={{
                                    mb: 2,
                                    background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                                    color: "#527dc7",
                                    fontWeight: 700,
                                    fontSize: "0.8rem",
                                }}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    color: "#0f172a",
                                    fontSize: { xs: "1.8rem", md: "2.4rem" },
                                    letterSpacing: "-0.5px",
                                }}
                            >
                                What{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Drives Us
                                </Box>
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 4, md: 5 }, alignItems: "center", justifyContent: "center" }}>
                            {values.map((item, i) => (
                                <Box width={{ xs: "100%", md: "70%" }} key={i}>
                                    <Box
                                        sx={{
                                            p: 4,
                                            borderRadius: "24px",
                                            background: "#fff",
                                            border: "1px solid rgba(0,0,0,0.06)",
                                            boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                                            height: "100%",
                                            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                                            "&:hover": {
                                                transform: "translateY(-6px)",
                                                boxShadow: "0 20px 40px rgba(82,125,199,0.12)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: "16px",
                                                background:
                                                    "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#527dc7",
                                                mb: 3,
                                            }}
                                        >
                                            {item.icon}
                                        </Box>
                                        <Typography
                                            variant="h5"
                                            sx={{ fontWeight: 700, color: "#1a1a2e", mb: 1.5, fontSize: "1.15rem" }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "#64748b", lineHeight: 1.8 }}
                                        >
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </Box>

                {/* CTA */}
                <Container maxWidth="md" sx={{ py: 10 }}>
                    <Box
                        sx={{
                            textAlign: "center",
                            p: { xs: 5, md: 8 },
                            borderRadius: 6,
                            background:
                                "linear-gradient(135deg, #1e3a5f 0%, #2d4a7a 50%, #1e3a5f 100%)",
                            boxShadow: "0 30px 60px rgba(30,58,95,0.3)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: -80,
                                right: -40,
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.04)",
                                pointerEvents: "none",
                            }}
                        />
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                color: "#fff",
                                fontSize: { xs: "1.6rem", md: "2.2rem" },
                                letterSpacing: "-0.5px",
                                mb: 2,
                                position: "relative",
                            }}
                        >
                            Ready to Join HealthLink?
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.75)",
                                mb: 4,
                                fontSize: "1.05rem",
                                position: "relative",
                            }}
                        >
                            Join thousands of patients who trust us with their healthcare journey.
                        </Typography>
                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                px: 5,
                                py: 1.8,
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "1rem",
                                background: "linear-gradient(135deg, #fff 0%, #e8edff 50%, #fff 100%)",
                                backgroundSize: "200% 200%",
                                backgroundPosition: "0% 0%",
                                color: "#1e3a5f",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                position: "relative",
                                "&:hover": {
                                    backgroundPosition: "100% 100%",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 14px 38px rgba(0,0,0,0.28)",
                                },
                            }}
                        >
                            Get Started Free
                        </Button>
                    </Box>
                </Container>

                <Footer />
            </Box>
        </>
    );
};

export default About;