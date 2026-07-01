import { Box, Typography } from "@mui/material";

const DashCard = ({ title, desc, icon, gradient }) => {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 220,
        p: 3,
        borderRadius: "20px",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 36px rgba(82,125,199,0.12)",
          borderColor: "rgba(82,125,199,0.25)",
        },
      }}
    >
      {/* Decorative background blob */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background:
            gradient ||
            "radial-gradient(circle, rgba(82,125,199,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <Box
        sx={{
          width: 60,
          height: 60,
          minWidth: 60,
          borderRadius: "18px",
          background:
            gradient ||
            "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      {/* Text */}
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#1a1a2e",
            letterSpacing: "-0.5px",
            fontSize: "2rem",
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          {desc ?? 0}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.85rem" }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashCard;