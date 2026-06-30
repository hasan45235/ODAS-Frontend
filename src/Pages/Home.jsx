import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Chip,
  Fade,
  Slide,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import docImg from "../online-doctor.png";
import doctorImg from "../doctor.png";
import appImg from "../appointment.png";
import patImg from "../patients.png";
import chooseImg from "../chose.webp";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LockIcon from "@mui/icons-material/Lock";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShieldIcon from "@mui/icons-material/Shield";
import TestimonialCard from "../Components/Testimonials";
import FAQs from "../Components/FAQs";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

/* ---------- Animated Counter Hook ---------- */
const useCountUp = (end, duration = 2200, startCounting = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime;
    let animationFrame;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);
  return count;
};

/* ---------- Scroll-triggered visibility ---------- */
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ---------- Stat Item ---------- */
const StatCard = ({ icon: Icon, endValue, suffix, label, inView }) => {
  const count = useCountUp(endValue, 2200, inView);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          width: 80, height: 80, borderRadius: "20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
          boxShadow: "0 12px 30px rgba(82,125,199,0.35)",
          mx: "auto", mb: 2, transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.08) rotate(3deg)" },
        }}
      >
        <Icon sx={{ fontSize: 38, color: "#fff" }} />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px" }}>
        {count}{suffix}
      </Typography>
      <Typography variant="body2" sx={{ color: "#6b7280", fontWeight: 500, mt: 0.5 }}>
        {label}
      </Typography>
    </Box>
  );
};

/* ---------- Feature Card ---------- */
const FeatureCard = ({ icon, title, description }) => (
  <Box sx={{
    p: 4, borderRadius: 4, background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.06)", height: "100%",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 40px rgba(82,125,199,0.15)",
      borderColor: "rgba(82,125,199,0.3)",
    },
  }}>
    <Box sx={{
      width: 56, height: 56, borderRadius: "16px",
      background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      mb: 2.5, color: "#527dc7",
    }}>
      {icon}
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1a1a2e" }}>{title}</Typography>
    <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.7 }}>{description}</Typography>
  </Box>
);

/* ---------- Why Choose Card ---------- */
const WhyCard = ({ icon: Icon, title, description }) => (
  <Box sx={{
    display: "flex", gap: 2.5, p: 3, borderRadius: 4, background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.05)",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default",
    "&:hover": {
      transform: "translateX(8px)",
      boxShadow: "0 16px 36px rgba(82,125,199,0.14)",
      borderColor: "rgba(82,125,199,0.25)",
      "& .why-icon-box": {
        background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
        color: "#fff",
      },
    },
  }}>
    <Box className="why-icon-box" sx={{
      width: 56, height: 56, minWidth: 56, borderRadius: "16px",
      background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#527dc7", transition: "all 0.35s",
    }}>
      <Icon sx={{ fontSize: 28 }} />
    </Box>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: "#1a1a2e", fontSize: "1.05rem" }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.7 }}>
        {description}
      </Typography>
    </Box>
  </Box>
);

/* ========================= HOME PAGE ========================= */
const Home = () => {
  const [formData, setFormData] = useState({ specialization: "", city: "" });
  const navigate = useNavigate();
  const [statsRef, statsInView] = useInView(0.3);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* ============ HERO ============ */}
      <Box sx={{
        position: "relative",
        background: "linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f7ff 100%)",
        pt: { xs: 4, md: 10 }, pb: { xs: 8, md: 12 }, overflow: "hidden",
      }}>
        <Box sx={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: -60, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(82,125,199,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { md: "row", sm: "column" }, justifyContent: { md: "space-between", sm: "center" }, alignItems: "center" }}>
            <Box >
              <Slide direction="right" in timeout={800}>
                <Box>
                  <Chip
                    icon={<StarIcon sx={{ fontSize: 16 }} />}
                    label="Trusted by 120,000+ patients"
                    sx={{
                      mb: 3, px: 1.5, py: 2.5,
                      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(82,125,199,0.15)", fontWeight: 600,
                      color: "#1a1a2e", fontSize: "0.85rem",
                      "& .MuiChip-icon": { color: "#f59e0b" },
                    }}
                  />
                  <Typography variant="h2" sx={{
                    fontWeight: 800, color: "#0f172a", lineHeight: 1.15,
                    fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
                    letterSpacing: "-1px", mb: 2,
                  }}>
                    Book Doctor{" "}
                    <Box component="span" sx={{
                      background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>Appointments</Box>{" "}Online<br />Anytime, Anywhere
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: "#475569", fontSize: "1.1rem", lineHeight: 1.7, mb: 5, maxWidth: 520,
                  }}>
                    Connect with verified doctors, book instant appointments, and manage your health records — all from the comfort of your home.
                  </Typography>

                  {/* Search Form */}
                  <Box sx={{
                    display: "flex", gap: 2, flexWrap: "wrap", background: "#fff",
                    p: 1.5, borderRadius: 4, boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.05)", maxWidth: 560,
                  }}>
                    <TextField placeholder="Specialization (e.g. Cardiologist)" variant="standard"
                      InputProps={{ disableUnderline: true, sx: { pl: 1.5, fontSize: "0.95rem" } }}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      sx={{ flex: 1, minWidth: 180 }} />
                    <TextField placeholder="City" variant="standard"
                      InputProps={{ disableUnderline: true, sx: { fontSize: "0.95rem" } }}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      sx={{ flex: 1, minWidth: 140 }} />
                    <Button variant="contained" onClick={() => navigate("/login")} sx={{
                      background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 50%, #527dc7 100%)",
                      backgroundSize: "200% 200%",
                      backgroundPosition: "0% 0%",
                      px: 4, py: 1.5, borderRadius: 3, textTransform: "none",
                      fontWeight: 700, fontSize: "0.95rem",
                      boxShadow: "0 8px 24px rgba(82,125,199,0.35)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        backgroundPosition: "100% 100%",
                        boxShadow: "0 12px 34px rgba(82,125,199,0.5)",
                        transform: "translateY(-2px)",
                      },
                    }}>
                      <SearchIcon sx={{ mr: 0.8, fontSize: 20 }} />Search
                    </Button>
                  </Box>

                  {/* Trust badges */}
                  <Box sx={{ display: "flex", gap: 3, mt: 3, flexWrap: "wrap" }}>
                    {[
                      { icon: <ShieldIcon sx={{ fontSize: 16 }} />, text: "Verified Doctors" },
                      { icon: <AccessTimeIcon sx={{ fontSize: 16 }} />, text: "24/7 Support" },
                      { icon: <LocationOnIcon sx={{ fontSize: 16 }} />, text: "Nearby Clinics" },
                    ].map((badge, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, color: "#527dc7" }}>
                        {badge.icon}
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#475569" }}>{badge.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Slide>
            </Box>

            <Box>
              <Fade in timeout={1200}>
                <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
                  <Box sx={{
                    position: "absolute", width: 320, height: 320, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)",
                    top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(40px)",
                  }} />
                  <Box component="img" src={docImg} alt="Online Doctor" sx={{
                    width: "100%", maxWidth: 440, height: "auto", borderRadius: 6,
                    position: "relative", zIndex: 2, boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                  }} />
                </Box>
              </Fade>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ============ HOW IT WORKS ============ */}
      <Box sx={{ py: { xs: 8, md: 12 }, mt: 10, mb: 10, background: "#fff" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Simple Process" size="small" sx={{
              mb: 2, background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
              color: "#527dc7", fontWeight: 700, fontSize: "0.8rem",
            }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.8rem", md: "2.4rem" }, letterSpacing: "-0.5px" }}>
              How It{" "}
              <Box component="span" sx={{ background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Works</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280", mt: 1, fontSize: "1.05rem" }}>
              Three simple steps to get the care you need
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, position: "relative", justifyContent: { xs: "center", md: "space-between" }, gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ width: "70%", height: "2px", backgroundColor: "#527dc7", position: "absolute", left: "50%", top: "60%", transform: "translate(-50%, -50%)" }}></Box>
            {[
              { step: "01", img: patImg, title: "Sign Up", desc: "Create your free account in under a minute. No paperwork, no hassle." },
              { step: "02", img: doctorImg, title: "Choose Doctor", desc: "Browse verified specialists and pick the one that fits your needs." },
              { step: "03", img: appImg, title: "Book Appointment", desc: "Select a convenient time slot and confirm your booking instantly." },
            ].map((item, idx) => (
              <Box key={idx} sx={{ width: { xs: "100%", md: "30%" } }}>
                <Box sx={{
                  p: 4, borderRadius: 5, background: "#fff", border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.03)", textAlign: "center", position: "relative", height: "100%",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": { transform: "translateY(-10px)", boxShadow: "0 24px 48px rgba(82,125,199,0.12)" },
                }}>
                  <Box sx={{
                    position: "absolute", top: -16, right: 24, width: 36, height: 36, borderRadius: "12px",
                    background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 800, fontSize: "0.9rem",
                    boxShadow: "0 8px 20px rgba(82,125,199,0.3)",
                  }}>{item.step}</Box>
                  <Box component="img" src={item.img} alt={item.title} sx={{ width: 70, height: 70, mb: 2.5, mx: "auto" }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a2e", mb: 1 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ============ FEATURES ============ */}
      <Box sx={{ py: { xs: 8, md: 12 }, mt: 10, mb: 10, background: "linear-gradient(180deg, #f8faff 0%, #f0f4ff 100%)" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Why We Stand Out" size="small" sx={{
              mb: 2, background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
              color: "#527dc7", fontWeight: 700, fontSize: "0.8rem",
            }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.8rem", md: "2.4rem" }, letterSpacing: "-0.5px" }}>
              Powerful{" "}
              <Box component="span" sx={{ background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Features</Box>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "space-between" }, gap: 2, flexWrap: "wrap", flexDirection: { xs: "column", md: "row" } }}>
            {[
              { icon: <SearchIcon sx={{ fontSize: 28 }} />, title: "Fast Online Booking", desc: "Find and book appointments with top doctors in seconds — no phone calls or long waits." },
              { icon: <VerifiedUserIcon sx={{ fontSize: 28 }} />, title: "Trusted Doctors", desc: "Every doctor is verified with credentials checked by our team for your safety." },
              { icon: <ShieldIcon sx={{ fontSize: 28 }} />, title: "Secure Medical Records", desc: "Your prescriptions and reports are encrypted and accessible only to you and your doctor." },
              { icon: <AccessTimeIcon sx={{ fontSize: 28 }} />, title: "No Extra Charges", desc: "Transparent pricing — pay only the consultation fee. No hidden costs, ever." },
            ].map((f, i) => (
              <Box sx={{ width: { xs: "100%", md: "40%" }, mt: 4, mb: 4 }} key={i}><FeatureCard {...f} /></Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ============ ACHIEVEMENTS ============ */}
      <Box sx={{ py: { xs: 8, md: 12 }, mt: 10, mb: 10, background: "#fff" }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Our Impact" size="small" sx={{
              mb: 2, background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
              color: "#527dc7", fontWeight: 700, fontSize: "0.8rem",
            }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.8rem", md: "2.4rem" }, letterSpacing: "-0.5px", mb: 2 }}>
              Our{" "}
              <Box component="span" sx={{ background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Achievements</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
              We're proud of the trust we've built and the lives we've touched through accessible, quality healthcare.
            </Typography>
          </Box>
          <Box ref={statsRef}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6} md={3}><StatCard icon={PeopleIcon} endValue={120} suffix="K+" label="Happy Patients" inView={statsInView} /></Grid>
              <Grid item xs={6} md={3}><StatCard icon={VaccinesIcon} endValue={1890} suffix="+" label="Issues Resolved" inView={statsInView} /></Grid>
              <Grid item xs={6} md={3}><StatCard icon={EmailOutlinedIcon} endValue={250} suffix="K+" label="Appointments" inView={statsInView} /></Grid>
              <Grid item xs={6} md={3}><StatCard icon={EmojiEventsIcon} endValue={786} suffix="+" label="Awards Won" inView={statsInView} /></Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* ============ WHY CHOOSE US ============ */}
      <Box sx={{ py: { xs: 8, md: 12 }, mt: 10, mb: 10, background: "linear-gradient(180deg, #f0f4ff 0%, #f8faff 100%)" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "space-between" }, gap: 10, flexDirection: { xs: "column", md: "row" } }}>
            <Box>
              <Box component="img" src={chooseImg} alt="Why Choose Us" sx={{
                width: "100%", maxWidth: 480, height: "auto", borderTopRightRadius: "20%", borderBottomLeftRadius: "20%",
                boxShadow: "0 30px 60px rgba(0,0,0,0.1)", border: "8px solid #fff",
                mx: "auto", display: "block", transform: "translateY(25%)", "&:hover": {
                  transform: "translateY(22%)", border: "8px solid #527dc7", transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                }
              }} />
            </Box>
            <Box>
              <Chip label="Why Choose Us" size="small" sx={{
                mb: 2, background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                color: "#527dc7", fontWeight: 700, fontSize: "0.8rem",
              }} />
              <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.8rem", md: "2.4rem" }, letterSpacing: "-0.5px", mb: 4 }}>
                Why Patients{" "}
                <Box component="span" sx={{ background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Love Us</Box>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <WhyCard icon={VerifiedUserIcon} title="Verified & Trusted Doctors" description="Every doctor on our platform undergoes rigorous credential verification before being listed." />
                <WhyCard icon={EditCalendarIcon} title="Flexible Scheduling" description="Choose from available slots that fit your calendar — reschedule anytime with one tap." />
                <WhyCard icon={LockIcon} title="Secure Digital Records" description="Your prescriptions, reports, and appointment history stay encrypted and accessible anytime." />
                <WhyCard icon={HeadsetMicRoundedIcon} title="24/7 Support & Assistance" description="Whether it's booking help or medical guidance, our team is here around the clock." />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ============ TESTIMONIALS ============ */}
      <Box sx={{ py: { xs: 8, md: 12 }, mt: 10, mb: 10, background: "#fff" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Testimonials" size="small" sx={{
              mb: 2, background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
              color: "#527dc7", fontWeight: 700, fontSize: "0.8rem",
            }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.8rem", md: "2.4rem" }, letterSpacing: "-0.5px" }}>
              What Our{" "}
              <Box component="span" sx={{ background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Patients Say</Box>
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={5}>
              <TestimonialCard name="Mark Smith" role="Product Designer" img={patImg}
                text="Finding a reliable healthcare provider used to be a challenge for me, but this platform has made the entire process incredibly simple. The consultation was thorough, the environment felt safe, and the staff was patient and knowledgeable. Highly recommended!"
                rating={5} />
            </Grid>
            <Grid item xs={12} md={5}>
              <TestimonialCard name="Sarah Mitchell" role="Teacher" img={patImg}
                text="From the moment I stepped in, I felt welcomed and cared for. The appointment was on time, the checkup was detailed, and the support staff was extremely helpful with reports and follow-ups. This is exactly how healthcare should be — efficient, kind, and reliable."
                rating={4.5} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ============ FAQs ============ */}
      <Box sx={{ py: { xs: 8, md: 12 }, mt: 10, mb: 10, background: "linear-gradient(180deg, #f8faff 0%, #f0f4ff 100%)" }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="FAQ" size="small" sx={{
              mb: 2, background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
              color: "#527dc7", fontWeight: 700, fontSize: "0.8rem",
            }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.8rem", md: "2.4rem" }, letterSpacing: "-0.5px" }}>
              Frequently Asked{" "}
              <Box component="span" sx={{ background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</Box>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <FAQs num="1" question="What is the purpose of this platform?" answer="This platform is designed to facilitate online doctor appointments, making healthcare more accessible and convenient for patients." />
            <FAQs num="2" question="How does the platform verify doctors?" answer="Every doctor undergoes an approval process by the admin. Their qualifications, specialization, and experience are reviewed before their profile becomes active on the platform." />
            <FAQs num="3" question="How are schedules managed on the platform?" answer="Doctors can set their available days and time slots. Patients can only book slots that are open. Admin can also view or update any doctor's schedule if needed." />
            <FAQs num="4" question="Is my personal and medical information secure?" answer="Absolutely. Your data is encrypted and stored securely. Only you and your assigned doctor have access to your medical records and appointments." />
            <FAQs num="5" question="Does the platform support multiple hospitals or clinics?" answer="Yes. Doctors can add multiple clinic or hospital locations to their profiles, and each location can have its own schedule and consultation fee." />
          </Box>
        </Container>
      </Box>

      {/* ============ CTA BANNER ============ */}
      <Box sx={{ py: { xs: 6, md: 10 }, mt: 10, mb: 10, background: "#fff" }}>
        <Container maxWidth="md">
          <Box sx={{
            textAlign: "center", p: { xs: 5, md: 8 }, borderRadius: 6,
            background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a7a 50%, #1e3a5f 100%)",
            boxShadow: "0 30px 60px rgba(30,58,95,0.3)", position: "relative", overflow: "hidden",
          }}>
            <Box sx={{ position: "absolute", top: -80, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", bottom: -60, left: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
            <Typography variant="h3" sx={{
              fontWeight: 800, color: "#fff", fontSize: { xs: "1.6rem", md: "2.2rem" },
              letterSpacing: "-0.5px", mb: 2, position: "relative",
            }}>
              Ready to Take Charge of Your Health?
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", mb: 5, fontSize: "1.05rem", position: "relative" }}>
              Join thousands of patients who trust HealthLink for their healthcare needs.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/login")} endIcon={<ArrowForwardIcon />} sx={{
              px: 5, py: 1.8, borderRadius: 3, textTransform: "none", fontWeight: 700, fontSize: "1rem",
              background: "linear-gradient(135deg, #fff 0%, #e8edff 50%, #fff 100%)",
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 0%",
              color: "#1e3a5f",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundPosition: "100% 100%",
                transform: "translateY(-2px)",
                boxShadow: "0 14px 38px rgba(0,0,0,0.28)",
              },
            }}>
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;