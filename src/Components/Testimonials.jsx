import React from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Rating,
  Chip,
} from "@mui/material";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

function TestimonialCard({ name, role, text, img, rating }) {
  // Accept both number (5) and float (4.5) ratings
  const ratingValue = typeof rating === "number" ? rating : 5;

  return (
    <Card
      elevation={0}
      sx={{
        p: 4,
        pt: 5,
        pb: 3.5,
        borderRadius: "24px",
        maxWidth: 420,
        mx: "auto",
        position: "relative",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowY: "visible",
        cursor: "default",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: "0 24px 48px rgba(82,125,199,0.14)",
          borderColor: "rgba(82,125,199,0.25)",
          "& .testimonial-quote": {
            transform: "rotate(-5deg) scale(1.1)",
            opacity: 0.5,
          },
          "& .testimonial-avatar": {
            transform: "scale(1.08)",
            boxShadow: "0 8px 28px rgba(82,125,199,0.3)",
            borderColor: "#527dc7",
          },
        },
      }}
    >
      {/* Floating Avatar */}
      <Avatar
        src={img}
        alt={name}
        className="testimonial-avatar"
        sx={{
          width: 76,
          height: 76,
          position: "absolute",
          left: "50%",
          top: -38,
          transform: "translateX(-50%)",
          border: "5px solid #fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Background Quote Icon */}
      <FormatQuoteRoundedIcon
        className="testimonial-quote"
        sx={{
          position: "absolute",
          top: 60,
          right: 28,
          fontSize: 90,
          color: "#527dc7",
          opacity: 0.08,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
        }}
      />

      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        {/* Verified badge */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2.5, mt: 1 }}>
          <Chip
            icon={<VerifiedRoundedIcon sx={{ fontSize: 16 }} />}
            label="Verified Patient"
            size="small"
            sx={{
              background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
              color: "#16a34a",
              fontWeight: 600,
              fontSize: "0.72rem",
              border: "1px solid rgba(22,163,74,0.2)",
              borderRadius: "20px",
              "& .MuiChip-icon": { color: "#16a34a" },
            }}
          />
        </Box>

        {/* Rating Stars */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Rating
            value={ratingValue}
            precision={0.5}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": { color: "#f59e0b" },
              "& .MuiRating-iconEmpty": { color: "#e2e8f0" },
              fontSize: "1.5rem",
            }}
          />
        </Box>

        {/* Testimonial Text */}
        <Typography
          variant="body1"
          sx={{
            color: "#475569",
            fontSize: "0.93rem",
            lineHeight: 1.85,
            textAlign: "center",
            mb: 3,
            px: 1,
            fontStyle: "italic",
            position: "relative",
            "&::before": {
              content: '"\\201C"',
              fontSize: "2.5rem",
              color: "#527dc7",
              opacity: 0.3,
              position: "absolute",
              top: -18,
              left: -4,
              fontFamily: "Georgia, serif",
              fontStyle: "normal",
            },
          }}
        >
          {text}
        </Typography>

        {/* Divider line */}
        <Box
          sx={{
            width: 40,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, #527dc7, #6c63ff)",
            mx: "auto",
            mb: 2.5,
          }}
        />

        {/* Name & Role */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            color: "#1a1a2e",
            fontSize: "1rem",
            mb: 0.3,
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "0.82rem",
            fontWeight: 500,
          }}
        >
          {role}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;