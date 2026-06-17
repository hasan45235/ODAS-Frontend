import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AuthContext from '../../authContext'
import ScheduleContext from '../../scheduleContext'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AppointmentsContext from '../../AppointmentsContext';


const AddAppointment = (props) => {
  const { close, modal, doctor } = props;

  // Context hooks
  const context = useContext(AppointmentsContext);
  const { addAppointment, fetchAllApointments, appointments } = context;

  const context2 = useContext(AuthContext);
  const { fetchUsers, allUsers, currentUser, fetchCurrentUser } = context2;

  const context3 = useContext(ScheduleContext);
  const { fetchSchedule, schedule } = context3;

  // State management
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [resetDate, setResetDate] = useState(null);
  const [data, setData] = useState({
    hospitalName: "",
    hospitalId: null,
    fees: "",
    bookedDate: "",
    bookedSlot: "",
    doctorId: null,
    receiptNum: ""
  });

  // Memoized computed values
  const doctors = useMemo(() => {
    return allUsers.filter(user => user.role === "doctor");
  }, [allUsers]);

  const doctorSchedule = useMemo(() => {
    return schedule.filter(item => item.doctorId === selectedDoctor?._id);
  }, [schedule, selectedDoctor]);

  const bookedSlots = useMemo(() => {
    if (!selectedDoctor?._id || !data.bookedDate) return [];
    return appointments
      .filter(item => 
        item.doctorId === selectedDoctor._id &&
        item.bookedDate === data.bookedDate &&
        item.status !== "rejected"
      )
      .map(item => item.bookedSlot);
  }, [appointments, selectedDoctor, data.bookedDate]);

  const doctorWorkingDays = useMemo(() => {
    if (!selectedSchedule?.days) return [];
    const dayMap = { Sun: 0, Mon: 1, Tues: 2, Wed: 3, Thurs: 4, Fri: 5, Sat: 6 };
    return selectedSchedule.days.map(day => dayMap[day]);
  }, [selectedSchedule]);

  // Helper functions
  const generateSlots = useCallback((startTime, endTime, slotDuration) => {
    if (!startTime || !endTime || !slotDuration) return [];
    
    const slots = [];
    const duration = Number(slotDuration);
    
    let startMinutes = Number(startTime.split(":")[0]) * 60 + Number(startTime.split(":")[1]);
    const endMinutes = Number(endTime.split(":")[0]) * 60 + Number(endTime.split(":")[1]);

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

    return slots.filter(slot => !bookedSlots.includes(slot));
  }, [bookedSlots]);

  const generateReceiptNum = useCallback((data) => {
    if (!data?.length) return "01";
    
    const numbers = data
      .map(item => Number(item?.receiptNum))
      .filter(num => !isNaN(num));
    
    if (numbers.length === 0) return "01";
    
    const maxReceipt = Math.max(...numbers);
    return String(maxReceipt + 1).padStart(2, '0');
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
      receiptNum: ""
    });
  }, []);

  // Event handlers
  const handleDoctorChange = (event, newValue) => {
    setSelectedDoctor(newValue);
    setSelectedSchedule(null);
    setResetDate(null);
    setData(prev => ({
      ...prev,
      doctorId: newValue?._id,
      hospitalName: "",
      hospitalId: null,
      fees: "",
      bookedDate: "",
      bookedSlot: ""
    }));
  };
const handleScheduleChange = (event, newValue) => {
  setSelectedSchedule(newValue);
  setData(prev => ({
    ...prev,
    hospitalName: newValue?.hospitalName || "",
    hospitalId: newValue?._id || null,
    fees: newValue?.fees || "",
    bookedSlot: "", // Reset slot when hospital changes
    // DON'T reset bookedDate here - keep the date
    receiptNum: generateReceiptNum(appointments)
  }));
};

  const handleDateChange = (newValue) => {
  setResetDate(newValue); // Update resetDate state
  if (newValue) {
    setData(prev => ({
      ...prev,
      bookedDate: newValue.format('DD/MM/YYYY')
    }));
  } else {
    setData(prev => ({
      ...prev,
      bookedDate: ""
    }));
  }
};

  const handleSlotChange = (event, newValue) => {
    setData(prev => ({
      ...prev,
      bookedSlot: newValue || ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!data.doctorId || !data.hospitalId || !data.bookedDate || !data.bookedSlot) {
      // You might want to show a snackbar or alert here
      alert("Please fill all required fields");
      return;
    }

    addAppointment(data, currentUser._id);
    resetForm();
    
    if (modal === "modal" && close) {
      close();
    }
  };

  // Effects
  useEffect(() => {
    fetchAllApointments();
    fetchUsers();
    fetchSchedule();
    fetchCurrentUser();
    // eslint-disable-next-line
  }, []);

  // Determine if date picker should be disabled
  const isDatePickerDisabled = !selectedDoctor;

  // Custom date disable function
  const shouldDisableDate = useCallback((date) => {
  // Only disable if no doctor is selected
  if (!selectedDoctor) return true;
  
  // If schedule is selected, check working days
  if (selectedSchedule && doctorWorkingDays.length > 0) {
    const day = date.day();
    return !doctorWorkingDays.includes(day);
  }
  
  // If no schedule selected, allow all dates
  return false;
}, [selectedDoctor, selectedSchedule, doctorWorkingDays]);

  // Available slots
  const availableSlots = useMemo(() => {
    return generateSlots(
      selectedSchedule?.startTime,
      selectedSchedule?.endTime,
      selectedSchedule?.slotDuration
    );
  }, [selectedSchedule, generateSlots]);

  return (
    <Box>
      <Box 
        component="form" 
        autoComplete="off" 
        sx={{ m: 4, p: 4 }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} color="initial">
            Schedule an Appointment
          </Typography>
          <Typography variant="body1" color="initial">
            #{generateReceiptNum(appointments)}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2, mt: 2 }} />
        
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
          {/* Left Column */}
          <Box sx={{ display: 'flex', flex: 1, flexDirection: "column", gap: 2 }}>
            <Autocomplete
              disablePortal
              fullWidth
              value={doctor ? doctor.name : selectedDoctor}
              disabled={!!doctor} // Disable if doctor prop is passed
              onChange={handleDoctorChange}
              options={doctor ? [doctor] : doctors}
              getOptionLabel={(option) => option.name || ''}
              renderInput={(params) => (
                <TextField {...params} label="Select Doctor" required />
              )}
            />
            <TextField
              label="Doctor Fees"
              value={selectedSchedule?.fees || ''}
              InputProps={{ readOnly: true }}
              required
            />
          </Box>

          {/* Middle Column */}
          <Box sx={{ display: 'flex', flex: 1, flexDirection: "column", gap: 2 }}>
            <TextField
              label="Specialization"
              disabled={!!doctor}
              value={ doctor ? doctor.speciality : selectedDoctor?.speciality || '' }
              InputProps={{ readOnly: true }}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DemoItem>
                  <DatePicker
  sx={{ width: "100%" ,p:0}}
  slotProps={{ 
    textField: { 
      fullWidth: true,
      required: true,
      
    }
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

          {/* Right Column */}
          <Box sx={{ display: 'flex', flex: 1, flexDirection: "column", gap: 2 }}>
            <Autocomplete
              disablePortal
              fullWidth
              value={selectedSchedule}
              onChange={handleScheduleChange}
              options={doctorSchedule}
              getOptionLabel={(option) => option.hospitalName || ''}
              renderInput={(params) => (
                <TextField {...params} label="Clinic/Hospital" required />
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
                <TextField {...params} label="Available Slots" required />
              )}
              disabled={!selectedSchedule || !data.bookedDate}
              noOptionsText={!selectedSchedule ? "Select a hospital first" : "No slots available"}
            />
          </Box>
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button variant="contained" type="submit" color="primary">
            Book Appointment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAppointment;