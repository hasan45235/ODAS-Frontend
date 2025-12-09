import React from "react";
import { Box, Paper, Avatar, Typography, Stack } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";

function TestimonialCard(props) {
    
    const {name, role, text, img, rating} = props
  
    return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: "20px", maxWidth: 350, mx: "auto", textAlign: "center", position: "relative", overflow: "visible", }}>

      <Avatar
        src={img}
        sx={{
          width: 70,
          height: 70,
          position: "absolute",
          left: "50%",
          top: -35,
          transform: "translateX(-50%)",
          border: "4px solid white",
          boxShadow: 3,
        }}
      />

      <Box mt={4}>
        {/* Quote Icon */}
        <FormatQuoteIcon
          sx={{ fontSize: 40, color: "primary.main", opacity: 0.4 }}
        />

        {/* Text */}
        <Typography
          variant="body1"
          sx={{ my: 2, color: "text.secondary", fontSize: 15 }}
        >
          {text}
        </Typography>

        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={1}>
          {role}
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={0.4}>
          {Array.from({ length: rating }).map((_, i) => (
            <StarIcon key={i} sx={{ fontSize: 20, color: "#FFB400" }} />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}

export default TestimonialCard;