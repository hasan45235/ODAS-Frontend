import React, { useContext, useEffect } from "react";
import AppointmentsContext from "../../AppointmentsContext";
import { Box, Typography} from "@mui/material";
import AppointmentCard from "./AppointmentCard";
import AuthContext from "../../authContext";
import { Oval } from "react-loader-spinner";
import HistoryIcon from "@mui/icons-material/History";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const MyAppointments = () => {
  const context = useContext(AppointmentsContext);
  const { fetchPatAppointments, specificAppointments } = context;
  const context2 = useContext(AuthContext);
  const { currentUser, fetchCurrentUser, fetchUsers, allUsers } = context2;

  useEffect(() => {
    fetchPatAppointments();
    fetchCurrentUser();
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const isLoading = !specificAppointments;

  return (
    <Box>
      {/* Header */}
      {specificAppointments?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HistoryIcon sx={{ fontSize: 20, color: "#527dc7" }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px" }}
            >
              My Appointments
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              {specificAppointments.length} appointment{specificAppointments.length !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Loading */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <Oval
            height="80"
            width="80"
            color="#527dc7"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#a5b4fc"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        </Box>
      ) : specificAppointments.length === 0 ? (
        /* Empty State */
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            background: "#fff",
            borderRadius: "24px",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "20px",
              background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2.5,
            }}
          >
            <InboxOutlinedIcon sx={{ fontSize: 32, color: "#94a3b8" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#475569", mb: 0.5 }}
          >
            No Appointments Yet
          </Typography>
          <Typography sx={{ color: "#94a3b8", maxWidth: 400, mx: "auto", lineHeight: 1.6 }}>
            You haven't booked any appointments. Head over to the "Book Appointment" tab to schedule your first visit.
          </Typography>
        </Box>
      ) : (
        /* Appointment Cards */
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {specificAppointments.map((item) => {
            const doctor = allUsers.filter((user) => user._id === item.doctorId);
            return (
              <AppointmentCard
                key={item.receiptNum || item._id}
                appointment={item}
                patient={currentUser}
                doctor={doctor}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default MyAppointments;