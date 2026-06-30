import {
    Box,
    Typography,
    Container,
    Chip,
    Button,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BiotechIcon from "@mui/icons-material/Biotech";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HealingIcon from "@mui/icons-material/Healing";
import EmergencyIcon from "@mui/icons-material/Emergency";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../Components/Footer";

const services = [
    {
        icon: <MonitorHeartIcon sx={{ fontSize: 40 }} />,
        title: "Telemedicine",
        desc: "Consult with top doctors from the comfort of your home via secure video calls. No travel, no waiting rooms.",
        color: "#527dc7",
    },
    {
        icon: <VaccinesIcon sx={{ fontSize: 40 }} />,
        title: "Vaccinations",
        desc: "Book vaccination appointments for yourself and your family. Get reminders and digital certificates.",
        color: "#6c63ff",
    },
    {
        icon: <BiotechIcon sx={{ fontSize: 40 }} />,
        title: "Lab Tests",
        desc: "Schedule diagnostic tests and lab work at partner centers. Receive reports digitally within hours.",
        color: "#8b5cf6",
    },
    {
        icon: <LocalPharmacyIcon sx={{ fontSize: 40 }} />,
        title: "Online Pharmacy",
        desc: "Order prescribed medicines online and get them delivered to your doorstep within 24 hours.",
        color: "#ec4899",
    },
    {
        icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
        title: "Mental Wellness",
        desc: "Access licensed therapists and counselors for one-on-one sessions. Your privacy is our priority.",
        color: "#06b6d4",
    },
    {
        icon: <HealthAndSafetyIcon sx={{ fontSize: 40 }} />,
        title: "Health Packages",
        desc: "Choose from curated health checkup packages at discounted rates. Early detection saves lives.",
        color: "#10b981",
    },
    {
        icon: <HealingIcon sx={{ fontSize: 40 }} />,
        title: "Physiotherapy",
        desc: "Connect with certified physiotherapists for injury recovery, chronic pain management, and mobility training.",
        color: "#f59e0b",
    },
    {
        icon: <EmergencyIcon sx={{ fontSize: 40 }} />,
        title: "Emergency Support",
        desc: "Round-the-clock emergency consultation and ambulance dispatch. Help is just one tap away, 24/7.",
        color: "#ef4444",
    },
];

const ServiceCard = ({ service }) => (
    <Box
        sx={{
            p: 4,
            borderRadius: "24px",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "default",
            "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 24px 48px rgba(82,125,199,0.12)",
                borderColor: "rgba(82,125,199,0.25)",
                "& .service-icon-box": {
                    transform: "scale(1.1) rotate(-5deg)",
                    boxShadow: `0 12px 32px ${service.color}40`,
                },
                "& .service-arrow": {
                    transform: "translateX(4px)",
                    opacity: 1,
                },
            },
        }}
    >
        {/* Background glow */}
        <Box
            sx={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                pointerEvents: "none",
            }}
        />

        <Box
            className="service-icon-box"
            sx={{
                width: 68,
                height: 68,
                borderRadius: "18px",
                background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}08 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: service.color,
                mb: 3,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            {service.icon}
        </Box>

        <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#1a1a2e", mb: 1.5, fontSize: "1.15rem" }}
        >
            {service.title}
        </Typography>

        <Typography
            variant="body2"
            sx={{ color: "#64748b", lineHeight: 1.8, mb: 3, flex: 1 }}
        >
            {service.desc}
        </Typography>

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: service.color,
                fontWeight: 700,
                fontSize: "0.85rem",
            }}
        >
            Learn more
            <ArrowForwardIcon className="service-arrow" sx={{ fontSize: 16, transition: "all 0.3s", opacity: 0.6 }} />
        </Box>
    </Box>
);

const Services = () => {
    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #f8faff 0%, #fff 40%)",
                }}
            >
                {/* Hero */}
                <Box
                    sx={{
                        background: "linear-gradient(160deg, #1e3a5f 0%, #2d4a7a 50%, #1a2744 100%)",
                        pt: { xs: 10, md: 14 },
                        pb: { xs: 8, md: 10 },
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: -120,
                            left: -80,
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
                            bottom: -60,
                            right: -60,
                            width: 280,
                            height: 280,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.03)",
                            pointerEvents: "none",
                        }}
                    />
                    <Container maxWidth="md">
                        <Box sx={{ textAlign: "center", position: "relative" }}>
                            <Chip
                                icon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                                label="What We Offer"
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
                                Comprehensive{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        background: "linear-gradient(135deg, #a5b4fc, #6c63ff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Healthcare
                                </Box>
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: "1.05rem",
                                    maxWidth: 550,
                                    mx: "auto",
                                    lineHeight: 1.7,
                                }}
                            >
                                From online consultations to lab tests and pharmacy delivery — all your healthcare needs in one place.
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                {/* Services Grid */}
                <Container maxWidth="lg" sx={{ pb: 12, mt: -4, position: "relative", zIndex: 2 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                        {services.map((service, i) => (
                            <Box width={{ xs: "100%", md: "48%" }} sx={{ mb: 12 }} key={i}>
                                <ServiceCard service={service} />
                            </Box>
                        ))}
                    </Box>
                </Container>

                {/* CTA Banner */}
                <Container maxWidth="md" sx={{ pb: 12 }}>
                    <Box
                        sx={{
                            textAlign: "center",
                            p: { xs: 5, md: 8 },
                            borderRadius: 6,
                            background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a7a 50%, #1e3a5f 100%)",
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
                            Need Something Specific?
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.75)",
                                mb: 4,
                                fontSize: "1.05rem",
                                position: "relative",
                            }}
                        >
                            Our support team is available 24/7 to help you find the right service.
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
                            Contact Us
                        </Button>
                    </Box>
                </Container>

                <Footer />
            </Box>
        </>
    );
};

export default Services;