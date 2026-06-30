import {
    Box,
    Typography,
    Container,
    Grid,
    Chip,
    Card,
    CardContent,
    Avatar,
    Button,
    InputAdornment,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../Components/Footer";

// Dummy doctors data
const doctorsData = [
    {
        id: 1,
        name: "Dr. Sarah Khan",
        speciality: "Cardiologist",
        rating: 4.9,
        reviews: 182,
        location: "Aga Khan Hospital, Karachi",
        experience: "15+ years",
        fee: 2500,
        available: "Mon, Wed, Fri",
        img: "",
        verified: true,
    },
    {
        id: 2,
        name: "Dr. Ahmed Raza",
        speciality: "Neurologist",
        rating: 4.8,
        reviews: 146,
        location: "Liaquat National, Karachi",
        experience: "12+ years",
        fee: 3000,
        available: "Tue, Thu, Sat",
        img: "",
        verified: true,
    },
    {
        id: 3,
        name: "Dr. Fatima Noor",
        speciality: "Dermatologist",
        rating: 4.7,
        reviews: 203,
        location: "South City Hospital, Karachi",
        experience: "10+ years",
        fee: 2000,
        available: "Mon - Fri",
        img: "",
        verified: true,
    },
    {
        id: 4,
        name: "Dr. Usman Ali",
        speciality: "Orthopedic Surgeon",
        rating: 4.9,
        reviews: 97,
        location: "Ziauddin Hospital, Karachi",
        experience: "18+ years",
        fee: 3500,
        available: "Mon, Wed, Thu",
        img: "",
        verified: true,
    },
    {
        id: 5,
        name: "Dr. Ayesha Iqbal",
        speciality: "Pediatrician",
        rating: 5.0,
        reviews: 264,
        location: "Dow University Hospital, Karachi",
        experience: "8+ years",
        fee: 1500,
        available: "Mon - Sat",
        img: "",
        verified: true,
    },
    {
        id: 6,
        name: "Dr. Bilal Mahmood",
        speciality: "Psychiatrist",
        rating: 4.6,
        reviews: 118,
        location: "Jinnah Hospital, Karachi",
        experience: "14+ years",
        fee: 2800,
        available: "Tue, Thu, Sat",
        img: "",
        verified: true,
    },
];

const specialties = [
    "All",
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Orthopedic",
    "Pediatrician",
    "Psychiatrist",
];

const DoctorCard = ({ doctor }) => {
    const initials = doctor.name
        .split(" ")
        .slice(1)
        .map((n) => n[0])
        .join("");

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "visible",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 24px 48px rgba(82,125,199,0.12)",
                    borderColor: "rgba(82,125,199,0.25)",
                },
            }}
        >
            {/* Top accent bar */}
            <Box
                sx={{
                    height: 4,
                    background: "linear-gradient(90deg, #527dc7, #6c63ff)",
                    borderRadius: "20px 20px 0 0",
                }}
            />

            <CardContent sx={{ p: 3, pt: 4, position: "relative" }}>
                {/* Avatar */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: -3 }}>
                    <Avatar
                        sx={{
                            width: 72,
                            height: 72,
                            mt: -8,
                            border: "4px solid #fff",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                            background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                            fontWeight: 700,
                            fontSize: "1.4rem",
                        }}
                    >
                        {initials}
                    </Avatar>
                </Box>

                {/* Verified badge + Name */}
                <Box sx={{ textAlign: "center", mt: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1rem" }}
                        >
                            {doctor.name}
                        </Typography>
                        {doctor.verified && (
                            <VerifiedRoundedIcon sx={{ color: "#527dc7", fontSize: 18 }} />
                        )}
                    </Box>

                    <Chip
                        label={doctor.speciality}
                        size="small"
                        sx={{
                            mb: 1.5,
                            fontWeight: 600,
                            fontSize: "0.72rem",
                            background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                            color: "#527dc7",
                        }}
                    />

                    {/* Rating */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                            mb: 2,
                        }}
                    >
                        <StarIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
                        <Typography sx={{ fontWeight: 700, color: "#1a1a2e", fontSize: "0.9rem" }}>
                            {doctor.rating}
                        </Typography>
                        <Typography sx={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                            ({doctor.reviews} reviews)
                        </Typography>
                    </Box>
                </Box>

                {/* Details */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.2,
                        mb: 2.5,
                        px: 1,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocationOnIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
                        <Typography sx={{ color: "#64748b", fontSize: "0.82rem" }}>
                            {doctor.location}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AccessTimeIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
                        <Typography sx={{ color: "#64748b", fontSize: "0.82rem" }}>
                            {doctor.experience} · {doctor.available}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
                        <Typography sx={{ color: "#64748b", fontSize: "0.82rem", fontWeight: 600 }}>
                            PKR {doctor.fee?.toLocaleString()} / visit
                        </Typography>
                    </Box>
                </Box>

                {/* CTA */}
                <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        py: 1.3,
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
                    Book Appointment
                </Button>
            </CardContent>
        </Card>
    );
};

const Doctors = () => {
    const [activeSpecialty, setActiveSpecialty] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDoctors = doctorsData.filter((doc) => {
        const matchesSpecialty =
            activeSpecialty === "All" || doc.speciality === activeSpecialty;
        const matchesSearch =
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSpecialty && matchesSearch;
    });

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #f8faff 0%, #fff 50%)",
                }}
            >
                {/* Hero Header */}
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
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: "center", position: "relative" }}>
                            <Chip
                                icon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                                label="Verified Medical Professionals"
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
                                Find Your{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        background: "linear-gradient(135deg, #a5b4fc, #6c63ff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Perfect Doctor
                                </Box>
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: "1.05rem",
                                    mb: 5,
                                    maxWidth: 550,
                                    mx: "auto",
                                    lineHeight: 1.7,
                                }}
                            >
                                Browse our network of certified specialists and book your appointment in minutes
                            </Typography>

                            {/* Search bar */}
                            <Box
                                sx={{
                                    maxWidth: 520,
                                    mx: "auto",
                                    background: "#fff",
                                    borderRadius: "16px",
                                    p: 0.5,
                                    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <InputAdornment position="start" sx={{ pl: 1 }}>
                                    <SearchIcon sx={{ color: "#94a3b8" }} />
                                </InputAdornment>
                                <TextField
                                    placeholder="Search by name, specialty, or location..."
                                    variant="standard"
                                    fullWidth
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: { fontSize: "0.95rem", py: 1 },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* Specialty Filter Pills */}
                <Container maxWidth="lg" sx={{ mt: -3, position: "relative", zIndex: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: 6,
                        }}
                    >
                        {specialties.map((spec) => (
                            <Chip
                                key={spec}
                                label={spec}
                                onClick={() => setActiveSpecialty(spec)}
                                sx={{
                                    px: 2,
                                    py: 2.5,
                                    borderRadius: "14px",
                                    fontWeight: 600,
                                    fontSize: "0.82rem",
                                    cursor: "pointer",
                                    background:
                                        activeSpecialty === spec
                                            ? "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)"
                                            : "#fff",
                                    color: activeSpecialty === spec ? "#fff" : "#475569",
                                    border: activeSpecialty === spec
                                        ? "none"
                                        : "1px solid rgba(0,0,0,0.08)",
                                    boxShadow: activeSpecialty === spec
                                        ? "0 8px 24px rgba(82,125,199,0.3)"
                                        : "0 2px 8px rgba(0,0,0,0.04)",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 20px rgba(82,125,199,0.2)",
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Container>

                {/* Doctor Cards Grid */}
                <Container maxWidth="lg" sx={{ pb: 10 }}>
                    {filteredDoctors.length > 0 ? (
                        <Grid container spacing={4}>
                            {filteredDoctors.map((doc) => (
                                <Grid item xs={12} sm={6} md={4} key={doc.id}>
                                    <DoctorCard doctor={doc} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ textAlign: "center", py: 8 }}>
                            <Typography variant="h6" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                                No doctors found matching your criteria
                            </Typography>
                            <Button
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveSpecialty("All");
                                }}
                                sx={{ mt: 2, color: "#527dc7", fontWeight: 600, textTransform: "none" }}
                            >
                                Clear filters
                            </Button>
                        </Box>
                    )}
                </Container>

                <Footer />
            </Box>
        </>
    );
};

export default Doctors;