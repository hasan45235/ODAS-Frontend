import {
    Box,
    Typography,
    Container,
    Chip,
    Button,
    TextField,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SendIcon from "@mui/icons-material/Send";
import Footer from "../Components/Footer";

const ContactInfoCard = ({ icon, title, detail }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2.5,
            p: 3,
            borderRadius: "20px",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
                transform: "translateX(6px)",
                boxShadow: "0 12px 32px rgba(82,125,199,0.1)",
                borderColor: "rgba(82,125,199,0.25)",
                "& .contact-icon-box": {
                    background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                    color: "#fff",
                },
            },
        }}
    >
        <Box
            className="contact-icon-box"
            sx={{
                width: 48,
                height: 48,
                minWidth: 48,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#527dc7",
                transition: "all 0.35s",
            }}
        >
            {icon}
        </Box>
        <Box>
            <Typography sx={{ fontWeight: 700, color: "#1a1a2e", mb: 0.3, fontSize: "0.9rem" }}>
                {title}
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.6 }}>
                {detail}
            </Typography>
        </Box>
    </Box>
);

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

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending
        setTimeout(() => {
            setLoading(false);
            setSent(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1500);
    };

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
                                label="Get In Touch"
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
                                Contact{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        background: "linear-gradient(135deg, #a5b4fc, #6c63ff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Us
                                </Box>
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: "1.05rem",
                                    maxWidth: 500,
                                    mx: "auto",
                                    lineHeight: 1.7,
                                }}
                            >
                                Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                {/* Contact Section */}
                <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 2, pb: 10, mb: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "space-between" }, flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 5 } }}>
                        {/* Left — Contact Info */}
                        <Box>
                            <Box
                                sx={{
                                    p: { xs: 4, md: 5 },
                                    borderRadius: 6,
                                    background: "#fff",
                                    border: "1px solid rgba(0,0,0,0.06)",
                                    boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 800, color: "#1a1a2e", mb: 1 }}
                                >
                                    Get in Touch
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#64748b", lineHeight: 1.7, mb: 2 }}
                                >
                                    Reach out to our team anytime. We're here to help with bookings, queries, or feedback.
                                </Typography>

                                <ContactInfoCard
                                    icon={<LocationOnIcon sx={{ fontSize: 22 }} />}
                                    title="Our Office"
                                    detail="1234 HealthLink Tower, Shahrah-e-Faisal, Karachi, Pakistan"
                                />
                                <ContactInfoCard
                                    icon={<PhoneIcon sx={{ fontSize: 22 }} />}
                                    title="Phone"
                                    detail="+92 300 1234567\nMon - Sat, 9 AM to 8 PM"
                                />
                                <ContactInfoCard
                                    icon={<EmailOutlinedIcon sx={{ fontSize: 22 }} />}
                                    title="Email"
                                    detail="support@healthlink.com\nhelp@healthlink.com"
                                />
                                <ContactInfoCard
                                    icon={<AccessTimeIcon sx={{ fontSize: 22 }} />}
                                    title="Working Hours"
                                    detail="Mon - Sat: 8:00 AM — 10:00 PM\nSun: 10:00 AM — 6:00 PM"
                                />
                            </Box>
                        </Box>

                        {/* Right — Contact Form */}
                        <Box>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    p: { xs: 4, md: 5 },
                                    borderRadius: 6,
                                    background: "#fff",
                                    border: "1px solid rgba(0,0,0,0.06)",
                                    boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2.5,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 800, color: "#1a1a2e", mb: 1 }}
                                >
                                    Send a Message
                                </Typography>

                                {sent && (
                                    <Box
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                            borderRadius: "12px",
                                            background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                                            border: "1px solid rgba(22,163,74,0.2)",
                                        }}
                                    >
                                        <Typography sx={{ color: "#16a34a", fontWeight: 600, fontSize: "0.85rem" }}>
                                            ✅ Message sent successfully! We'll get back to you within 24 hours.
                                        </Typography>
                                    </Box>
                                )}

                                <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                                    <TextField
                                        name="name"
                                        label="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
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
                                        type="email"
                                        label="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
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
                                </Box>

                                <TextField
                                    name="subject"
                                    label="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MessageOutlinedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={inputSx}
                                />

                                <TextField
                                    name="message"
                                    label="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    multiline
                                    rows={5}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MessageOutlinedIcon
                                                    sx={{ color: "#94a3b8", fontSize: 20, alignSelf: "flex-start", mt: 1 }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        ...inputSx,
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

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading}
                                    endIcon={
                                        loading ? (
                                            <CircularProgress size={20} sx={{ color: "#fff" }} />
                                        ) : (
                                            <SendIcon sx={{ fontSize: 18 }} />
                                        )
                                    }
                                    sx={{
                                        py: 1.8,
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
                                    {loading ? "Sending..." : "Send Message"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>

                <Footer />
            </Box>
        </>
    );
};

export default Contact;