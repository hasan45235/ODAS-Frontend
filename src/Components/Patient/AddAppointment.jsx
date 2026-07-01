import {
  Box,
  Button,
  Divider,
  Typography,
  TextField,
  Autocomplete,
  InputAdornment,
  Chip,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AuthContext from "../../authContext";
import ScheduleContext from "../../scheduleContext";
import AppointmentsContext from "../../AppointmentsContext";
import Swal from "sweetalert2";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/* ---------- Shared input style ---------- */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#fff",
    "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(82,125,199,0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#527dc7",
      borderWidth: "2px",
    },
  },
};

const AddAppointment = (props) => {
  const { close, modal, doctor, closeDoc, closeDocAdd } = props;

  // Context hooks
  const context = useContext(AppointmentsContext);
  const { addAppointment, fetchAllApointments, appointments } = context;
  const context2 = useContext(AuthContext);
  const { fetchUsers, allUsers, currentUser, fetchCurrentUser } = context2;
  const context3 = useContext(ScheduleContext);
  const { fetchSchedule, schedule } = context3;

  // State
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [resetDate, setResetDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    hospitalName: "",
    hospitalId: null,
    fees: "",
    bookedDate: "",
    bookedSlot: "",
    doctorId: null,
    receiptNum: "",
  });

  // Memoized
  const doctors = useMemo(() => allUsers.filter((u) => u.role === "doctor"), [allUsers]);
  const doctorSchedule = useMemo(
    () => schedule.filter((item) => item.doctorId === selectedDoctor?._id),
    [schedule, selectedDoctor]
  );
  const bookedSlots = useMemo(() => {
    if (!selectedDoctor?._id || !data.bookedDate) return [];
    return appointments
      .filter(
        (item) =>
          item.doctorId === selectedDoctor._id &&
          item.bookedDate === data.bookedDate &&
          item.status !== "rejected"
      )
      .map((item) => item.bookedSlot);
  }, [appointments, selectedDoctor, data.bookedDate]);
  const doctorWorkingDays = useMemo(() => {
    if (!selectedSchedule?.days) return [];
    const dayMap = { Sun: 0, Mon: 1, Tues: 2, Wed: 3, Thurs: 4, Fri: 5, Sat: 6 };
    return selectedSchedule.days.map((day) => dayMap[day]);
  }, [selectedSchedule]);

  // Generate slots
  const generateSlots = useCallback(
    (startTime, endTime, slotDuration) => {
      if (!startTime || !endTime || !slotDuration) return [];
      const slots = [];
      const duration = Number(slotDuration);
      let startMinutes =
        Number(startTime.split(":")[0]) * 60 + Number(startTime.split(":")[1]);
      const endMinutes =
        Number(endTime.split(":")[0]) * 60 + Number(endTime.split(":")[1]);

      while (startMinutes + duration <= endMinutes) {
        const formatTime = (minutes) => {
          let hrs = Math.floor(minutes / 60);
          const mins = minutes % 60;
          const period = hrs >= 12 ? "PM" : "AM";
          hrs = hrs % 12 || 12;
          return `${hrs}:${mins.toString().padStart(2, "0")} ${period}`;
        };
        const slotStart = formatTime(startMinutes);
        const slotEnd = formatTime(startMinutes + duration);
        slots.push(`${slotStart} - ${slotEnd}`);
        startMinutes += duration;
      }
      return slots.filter((slot) => !bookedSlots.includes(slot));
    },
    [bookedSlots]
  );

  const generateReceiptNum = useCallback((data) => {
    if (!data?.length) return "01";
    const numbers = data
      .map((item) => Number(item?.receiptNum))
      .filter((num) => !isNaN(num));
    if (numbers.length === 0) return "01";
    const maxReceipt = Math.max(...numbers);
    return String(maxReceipt + 1).padStart(2, "0");
  }, []);

  const resetForm = useCallback(() => {
    setSelectedDoctor(null);
    setSelectedSchedule(null);
    setResetDate(null);
    setData({
      hospitalName: "",
      hospitalId: null,
      fees: "",
      bookedDate: "",
      bookedSlot: "",
      doctorId: null,
      receiptNum: "",
    });
  }, []);

  // Handlers
  const handleDoctorChange = (event, newValue) => {
    setSelectedDoctor(newValue);
    setSelectedSchedule(null);
    setResetDate(null);
    setData((prev) => ({
      ...prev,
      doctorId: newValue?._id,
      hospitalName: "",
      hospitalId: null,
      fees: "",
      bookedDate: "",
      bookedSlot: "",
    }));
  };

  const handleScheduleChange = (event, newValue) => {
    setSelectedSchedule(newValue);
    setData((prev) => ({
      ...prev,
      hospitalName: newValue?.hospitalName || "",
      hospitalId: newValue?._id || null,
      fees: newValue?.fees || "",
      bookedSlot: "",
      receiptNum: generateReceiptNum(appointments),
    }));
  };

  const handleDateChange = (newValue) => {
    setResetDate(newValue);
    if (newValue) {
      setData((prev) => ({ ...prev, bookedDate: newValue.format("DD/MM/YYYY") }));
    } else {
      setData((prev) => ({ ...prev, bookedDate: "" }));
    }
  };

  const handleSlotChange = (event, newValue) => {
    setData((prev) => ({ ...prev, bookedSlot: newValue || "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addAppointment(data, currentUser._id);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Appointment is generated",
      showConfirmButton: false,
      timer: 2000,
    });
    resetForm();
    setLoading(false);
    if (modal === "modal" && close) close();
    if (closeDoc) closeDoc();
    if (closeDocAdd) closeDocAdd();
  };

  // Effects
  useEffect(() => {
    fetchAllApointments();
    fetchUsers();
    fetchSchedule();
    fetchCurrentUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (doctor) {
      setSelectedDoctor(doctor);
      setData((prev) => ({ ...prev, doctorId: doctor._id }));
    }
  }, [doctor]);

  const isDatePickerDisabled = !selectedDoctor;

  const shouldDisableDate = useCallback(
    (date) => {
      if (!selectedDoctor) return true;
      if (selectedSchedule && doctorWorkingDays.length > 0) {
        const day = date.day();
        return !doctorWorkingDays.includes(day);
      }
      return false;
    },
    [selectedDoctor, selectedSchedule, doctorWorkingDays]
  );

  const availableSlots = useMemo(() => {
    return generateSlots(
      selectedSchedule?.startTime,
      selectedSchedule?.endTime,
      selectedSchedule?.slotDuration
    );
  }, [selectedSchedule, generateSlots]);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(82,125,199,0.3)",
            }}
          >
            <CalendarMonthIcon sx={{ fontSize: 20, color: "#fff" }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px" }}
            >
              Schedule an Appointment
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              Fill in the details to book your slot
            </Typography>
          </Box>
        </Box>
        <Chip
          icon={<ReceiptLongIcon sx={{ fontSize: 16 }} />}
          label={`#${generateReceiptNum(appointments)}`}
          sx={{
            fontWeight: 700,
            fontSize: "0.8rem",
            background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
            color: "#527dc7",
          }}
        />
      </Box>

      <Divider sx={{ mb: 3, borderColor: "rgba(0,0,0,0.06)" }} />

      {/* Form */}
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {/* Three-column grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: 2.5,
          }}
        >
          {/* Column 1 */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Autocomplete
              disablePortal
              fullWidth
              value={doctor || selectedDoctor}
              disabled={!!doctor}
              onChange={handleDoctorChange}
              options={doctor ? [doctor] : doctors}
              getOptionLabel={(option) => option.name || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Doctor"
                  required
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              )}
            />
            <TextField
              label="Doctor Fees"
              value={selectedSchedule?.fees || ""}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              required
              sx={inputSx}
            />
          </Box>

          {/* Column 2 */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Specialization"
              disabled={!!doctor}
              value={doctor ? doctor.speciality : selectedDoctor?.speciality || ""}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <MedicalServicesOutlinedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              required
              sx={inputSx}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ p: 0, overflow: "visible" }}>
                <DemoItem>
                  <DatePicker
                    sx={{ width: "100%", "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonthIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        },
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                            "&:hover fieldset": { borderColor: "rgba(82,125,199,0.4)" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#527dc7",
                              borderWidth: "2px",
                            },
                          },
                        },
                      },
                    }}
                    disablePast
                    value={resetDate}
                    onChange={handleDateChange}
                    shouldDisableDate={shouldDisableDate}
                    disabled={isDatePickerDisabled}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          {/* Column 3 */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Autocomplete
              disablePortal
              fullWidth
              value={selectedSchedule}
              onChange={handleScheduleChange}
              options={doctorSchedule}
              getOptionLabel={(option) => option.hospitalName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Clinic / Hospital"
                  required
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalHospitalIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              )}
              disabled={!selectedDoctor}
            />
            <Autocomplete
              disablePortal
              fullWidth
              value={data.bookedSlot || null}
              onChange={handleSlotChange}
              options={availableSlots}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Available Slots"
                  required
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <ScheduleIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              )}
              disabled={!selectedSchedule || !data.bookedDate}
              noOptionsText={
                !selectedSchedule ? "Select a hospital first" : "No slots available"
              }
            />
          </Box>
        </Box>

        {/* Submit */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            endIcon={loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : <ArrowForwardIcon />}
            sx={{
              py: 1.5,
              px: 5,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              background: "linear-gradient(135deg, #527dc7 0%, #6c63ff 50%, #527dc7 100%)",
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
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAppointment;