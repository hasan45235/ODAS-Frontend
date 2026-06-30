import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQItem = ({ question, answer, num, expanded, onChange }) => {
  const isExpanded = expanded === `panel${num}`;

  return (
    <Accordion
      expanded={isExpanded}
      onChange={onChange(`panel${num}`)}
      disableGutters
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 800,
        mb: 1.5,
        borderRadius: "16px !important",
        overflow: "hidden",
        border: "1px solid",
        borderColor: isExpanded ? "rgba(82,125,199,0.3)" : "rgba(0,0,0,0.06)",
        boxShadow: isExpanded
          ? "0 8px 32px rgba(82,125,199,0.12)"
          : "0 2px 12px rgba(0,0,0,0.03)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:before": { display: "none" },
        "&:hover": {
          borderColor: "rgba(82,125,199,0.2)",
          boxShadow: "0 4px 20px rgba(82,125,199,0.06)",
        },
        "&.Mui-expanded": {
          margin: "0 0 12px 0 !important",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isExpanded
                ? "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)"
                : "#f1f5f9",
              color: isExpanded ? "#fff" : "#64748b",
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <ExpandMoreIcon sx={{ fontSize: 20 }} />
          </Box>
        }
        sx={{
          px: 3,
          py: 1.5,
          minHeight: "72px !important",
          background: isExpanded
            ? "linear-gradient(135deg, #eef2ff 0%, #f8faff 100%)"
            : "#fff",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiAccordionSummary-content": {
            margin: "0 !important",
            alignItems: "center",
            gap: 1.5,
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isExpanded ? "rotate(-180deg) !important" : "rotate(0deg) !important",
          },
        }}
      >
        {/* Number badge */}
        <Box
          sx={{
            width: 34,
            height: 34,
            minWidth: 34,
            borderRadius: "12px",
            background: isExpanded
              ? "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)"
              : "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isExpanded ? "#fff" : "#527dc7",
            fontWeight: 800,
            fontSize: "0.9rem",
            transition: "all 0.35s",
            boxShadow: isExpanded ? "0 4px 12px rgba(82,125,199,0.3)" : "none",
          }}
        >
          {num}
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            color: isExpanded ? "#1e293b" : "#334155",
            fontSize: "1.02rem",
            transition: "color 0.35s",
            flex: 1,
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          px: 4,
          pb: 3,
          pt: 0,
          background: "#fff",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Accent bar */}
          <Box
            sx={{
              width: 3,
              minWidth: 3,
              borderRadius: 2,
              background: "linear-gradient(180deg, #527dc7 0%, #6c63ff 100%)",
              alignSelf: "stretch",
            }}
          />
          <Box>
            <Typography
              sx={{
                color: "#475569",
                lineHeight: 1.85,
                fontSize: "0.93rem",
                fontWeight: 400,
              }}
            >
              {answer}
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const FAQs = (props) => {
  const { question, answer, num } = props;
  // We use a dummy expanded state since the parent will manage it via Home.jsx
  // But for standalone use, we still support the old interface
  const [localExpanded, setLocalExpanded] = React.useState(false);
  const panels = ["panel1", "panel2", "panel3", "panel4", "panel5"];
  const panelId = panels[parseInt(num) - 1];

  const handleChange = (panel) => (event, isExpanded) => {
    setLocalExpanded(isExpanded ? panel : false);
    console.log(panelId)
  };

  return (
    <FAQItem
      question={question}
      answer={answer}
      num={num}
      expanded={localExpanded}
      onChange={handleChange}
    />
  );
};

export default FAQs;