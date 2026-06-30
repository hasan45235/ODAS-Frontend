import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useScrollTrigger,
    Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useLocation } from "react-router-dom";

/* ---------- Hide on scroll ---------- */
function HideOnScroll({ children }) {
    const trigger = useScrollTrigger({ threshold: 80 });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Doctors", path: "/doctor" },
        { label: "Services", path: "/services" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    return (
        <>
            <HideOnScroll>
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        background: scrolled
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(20px)",
                        borderBottom: "1px solid",
                        borderColor: scrolled
                            ? "rgba(0,0,0,0.06)"
                            : "rgba(0,0,0,0.03)",
                        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: scrolled
                            ? "0 4px 30px rgba(0,0,0,0.04)"
                            : "none",
                    }}
                >
                    <Container maxWidth="lg">
                        <Toolbar
                            disableGutters
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                minHeight: { xs: 64, md: 72 },
                                py: 0.5,
                            }}
                        >
                            {/* Logo */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {/* Logo icon */}
                                <Box
                                    sx={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: "12px",
                                        background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 4px 14px rgba(82,125,199,0.3)",
                                    }}
                                >
                                    <FavoriteIcon sx={{ fontSize: 20, color: "#fff" }} />
                                </Box>
                                <Typography
                                    variant="h5"
                                    component={Link}
                                    to="/"
                                    sx={{
                                        textDecoration: "none",
                                        fontWeight: 800,
                                        letterSpacing: "-0.5px",
                                        background: "linear-gradient(135deg, #1e3a5f 0%, #527dc7 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        fontSize: { xs: "1.3rem", md: "1.5rem" },
                                    }}
                                >
                                    HealthLink
                                </Typography>
                            </Box>

                            {/* Desktop Nav Links */}
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                {navLinks.map((link) => (
                                    <Typography
                                        key={link.path}
                                        component={Link}
                                        to={link.path}
                                        sx={{
                                            textDecoration: "none",
                                            color: isActive(link.path) ? "#527dc7" : "#475569",
                                            fontWeight: isActive(link.path) ? 600 : 500,
                                            fontSize: "0.9rem",
                                            px: 2,
                                            py: 1,
                                            borderRadius: "10px",
                                            transition: "all 0.25s",
                                            position: "relative",
                                            "&:hover": {
                                                color: "#527dc7",
                                                background: "rgba(82,125,199,0.06)",
                                            },
                                            "&::after": isActive(link.path)
                                                ? {
                                                    content: '""',
                                                    position: "absolute",
                                                    bottom: 2,
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    width: 20,
                                                    height: 3,
                                                    borderRadius: 2,
                                                    background: "linear-gradient(90deg, #527dc7, #6c63ff)",
                                                }
                                                : {},
                                        }}
                                    >
                                        {link.label}
                                    </Typography>
                                ))}
                            </Box>

                            {/* Desktop CTA Buttons */}
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >
                                <Typography
                                    component={Link}
                                    to="/login"
                                    sx={{
                                        textDecoration: "none",
                                        color: "#527dc7",
                                        fontWeight: 600,
                                        fontSize: "0.85rem",
                                        transition: "color 0.25s",
                                        "&:hover": { color: "#6c63ff" },
                                    }}
                                >
                                    Sign In
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/signup"
                                    variant="contained"
                                    disableElevation
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        fontSize: "0.85rem",
                                        px: 3,
                                        py: 1.1,
                                        borderRadius: "12px",
                                        background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 50%, #527dc7 100%)",
                                        backgroundSize: "200% 200%",
                                        backgroundPosition: "0% 0%",
                                        boxShadow: "0 4px 16px rgba(82,125,199,0.3)",
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            backgroundPosition: "100% 100%",
                                            boxShadow: "0 8px 28px rgba(82,125,199,0.45)",
                                            transform: "translateY(-2px)",
                                        },
                                    }}
                                >
                                    Sign Up Free
                                </Button>
                            </Box>

                            {/* Mobile Hamburger */}
                            <IconButton
                                onClick={() => setMobileOpen(true)}
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    color: "#1e3a5f",
                                }}
                            >
                                <MenuIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>

            {/* Spacer so content doesn't hide under fixed navbar */}
            <Toolbar sx={{ minHeight: { xs: 64, md: 80 } }} />

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        borderRadius: "20px 0 0 20px",
                        background: "linear-gradient(180deg, #fff 0%, #f8faff 100%)",
                        p: 2,
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#64748b" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Mobile Logo */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4, px: 2 }}>
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                        }}
                    >
                        HealthLink
                    </Typography>
                </Box>

                <List>
                    {navLinks.map((link) => (
                        <ListItem key={link.path} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                sx={{
                                    borderRadius: "12px",
                                    mb: 0.5,
                                    mx: 1,
                                    background: isActive(link.path) ? "rgba(82,125,199,0.08)" : "transparent",
                                    "&:hover": { background: "rgba(82,125,199,0.06)" },
                                }}
                            >
                                <ListItemText
                                    primary={link.label}
                                    primaryTypographyProps={{
                                        fontWeight: isActive(link.path) ? 700 : 500,
                                        color: isActive(link.path) ? "#527dc7" : "#334155",
                                        fontSize: "1rem",
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ mt: "auto", px: 2, pb: 2 }}>
                    <Button
                        component={Link}
                        to="/login"
                        fullWidth
                        variant="outlined"
                        sx={{
                            mb: 1.5,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "rgba(82,125,199,0.3)",
                            color: "#527dc7",
                            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                                borderColor: "#527dc7",
                                background: "linear-gradient(135deg, rgba(82,125,199,0.08) 0%, rgba(108,99,255,0.08) 100%)",
                                transform: "translateY(-1px)",
                            },
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        component={Link}
                        to="/signup"
                        fullWidth
                        variant="contained"
                        disableElevation
                        sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 700,
                            py: 1.3,
                            background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 50%, #527dc7 100%)",
                            backgroundSize: "200% 200%",
                            backgroundPosition: "0% 0%",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                                backgroundPosition: "100% 100%",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 28px rgba(82,125,199,0.4)",
                            },
                        }}
                    >
                        Sign Up Free
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;