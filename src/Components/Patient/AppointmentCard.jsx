import {
  Box,
  Typography,
  Chip,
  Divider,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import {
  Close,
  CalendarMonth,
  Schedule,
  ReceiptLong,
} from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const statusConfigMap = {
  pending: {
    bg: "linear-gradient(135deg, #fefce8, #fef9c3)",
    color: "#ca8a04",
    border: "rgba(202,138,4,0.2)",
    gradient: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)",
  },
  approved: {
    bg: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
    color: "#527dc7",
    border: "rgba(82,125,199,0.2)",
    gradient: "linear-gradient(90deg, #527dc7, #6c63ff, #527dc7)",
  },
  rejected: {
    bg: "linear-gradient(135deg, #fef2f2, #fee2e2)",
    color: "#ef4444",
    border: "rgba(239,68,68,0.2)",
    gradient: "linear-gradient(90deg, #ef4444, #f87171, #ef4444)",
  },
  completed: {
    bg: "linear-gradient(135deg, #f0fdf4, #ecfdf5)",
    color: "#16a34a",
    border: "rgba(22,163,74,0.2)",
    gradient: "linear-gradient(90deg, #16a34a, #22c55e, #16a34a)",
  },
};

const detailModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 560,
  outline: "none",
};

const AppointmentCard = ({ appointment, patient, doctor }) => {
  const [open, setOpen] = useState(false);
  const statusStyle = statusConfigMap[appointment.status] || statusConfigMap.pending;
  const docName = doctor?.[0]?.name || "—";

  const initials = (appointment.hospitalName || "AP")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* ============== CARD ============== */}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          p: 2.5,
          pr: 3,
          borderRadius: "18px",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.03)",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateX(4px)",
            boxShadow: "0 8px 28px rgba(82,125,199,0.1)",
            borderColor: "rgba(82,125,199,0.2)",
          },
        }}
      >
        {/* Left — colored stripe */}
        <Box
          sx={{
            width: 5,
            alignSelf: "stretch",
            borderRadius: 3,
            background: statusStyle.gradient,
            flexShrink: 0,
          }}
        />

        {/* Hospital Avatar */}
        <Avatar
          sx={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
            fontWeight: 700,
            fontSize: "0.9rem",
            flexShrink: 0,
          }}
        >
          {initials}
        </Avatar>

        {/* Core Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#1a1a2e",
              fontSize: "0.95rem",
              mb: 0.4,
            }}
            noWrap
          >
            {appointment.hospitalName}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            {/* Sub-info pills */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarMonth sx={{ fontSize: 14, color: "#94a3b8" }} />
              <Typography sx={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 500 }}>
                {appointment.bookedDate}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Schedule sx={{ fontSize: 14, color: "#94a3b8" }} />
              <Typography sx={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 500 }}>
                {appointment.bookedSlot}
              </Typography>
            </Box>
            {docName !== "—" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography sx={{ color: "#94a3b8", fontSize: "0.78rem" }}>
                  Dr. {docName}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Fee */}
        <Box sx={{ textAlign: "right", flexShrink: 0 }}>
          <Typography sx={{ fontWeight: 800, color: "#1a1a2e", fontSize: "0.95rem" }}>
            Rs. {appointment.fees}
          </Typography>
          <Chip
            label={appointment.status}
            size="small"
            sx={{
              mt: 0.5,
              fontWeight: 700,
              fontSize: "0.65rem",
              height: 22,
              background: statusStyle.bg,
              color: statusStyle.color,
              border: `1px solid ${statusStyle.border}`,
              textTransform: "capitalize",
            }}
          />
        </Box>

        {/* Receipt */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 0.5,
            color: "#94a3b8",
            flexShrink: 0,
          }}
        >
          <ReceiptLong sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
            #{appointment.receiptNum}
          </Typography>
        </Box>

        {/* Arrow */}
        <ArrowForwardIcon
          sx={{
            fontSize: 18,
            color: "#cbd5e1",
            flexShrink: 0,
            transition: "all 0.25s",
          }}
        />
      </Box>

      {/* ============== DETAIL MODAL ============== */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 400 } }}
      >
        <Fade in={open}>
          <Box sx={detailModalStyle}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: "24px",
                boxShadow: "0 40px 100px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <Box sx={{ height: 5, background: statusStyle.gradient }} />

              {/* Header */}
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #527dc7 , #6c63ff)",
                      fontWeight: 700,
                    }}
                  >
                    {initials}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#1a1a2e" }}>
                      {appointment?.hospitalName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                      Receipt #{appointment?.receiptNum}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexDirection: "column", alignItems: "flex-end" }}>
                  <IconButton
                    onClick={() => setOpen(false)}
                    size="small"
                    sx={{ color: "#94a3b8" }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                  <Chip
                    label={appointment?.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      border: `1px solid ${statusStyle.border}`,
                      textTransform: "capitalize",
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ borderColor: "rgba(0,0,0,0.06)" }} />

              {/* Body */}
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2.5,
                  }}
                >
                  <DetailItem label="Patient" value={patient?.name} />
                  <DetailItem label="Age" value={patient?.age} />
                  <DetailItem
                    label="Doctor"
                    value={`Dr. ${docName}`}
                    sub={doctor?.[0]?.speciality}
                  />
                  <DetailItem label="Date" value={appointment?.bookedDate} />
                  <DetailItem label="Time Slot" value={appointment?.bookedSlot} />
                  <DetailItem label="Fee" value={`Rs. ${appointment?.fees}`} bold />
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

// Detail row inside modal
const DetailItem = ({ label, value, sub, bold }) => (
  <Box
    sx={{
      p: 2,
      borderRadius: "12px",
      background: "rgba(248,250,255,0.6)",
      border: "1px solid rgba(0,0,0,0.04)",
    }}
  >
    <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 500 }}>
      {label}
    </Typography>
    <Typography
      sx={{
        fontWeight: bold ? 800 : 600,
        color: "#1a1a2e",
        fontSize: "0.9rem",
        mt: 0.3,
      }}
    >
      {value || "—"}
    </Typography>
    {sub && (
      <Typography variant="caption" sx={{ color: "#64748b", display: "block", mt: 0.2 }}>
        {sub}
      </Typography>
    )}
  </Box>
);

export default AppointmentCard;