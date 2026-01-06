import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useContext, useEffect,  useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AuthContext from '../../authContext'
import AvailablilityContext from '../../availibilityContext'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AppointmentsContext from '../../AppointmentsContext';

const AddAppointment = () => {


  const context = useContext(AppointmentsContext)
  const { addAppointment, fetchAllApointments, appointments } = context

  const context2 = useContext(AuthContext)
  const {fetchUsers , allUsers, currentUser , fetchCurrentUser} = context2

  const context3 = useContext(AvailablilityContext)
  const {fetchAvailability , availability} = context3

  
  

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    
    const filterDoctor = (user) => {
      if(user.role === "doctor") {
        return {name: user.name, id: user._id};
      };
      return 
    }
    const doctors = allUsers.filter((user)=>(filterDoctor(user)))
    
    const doctorAvailability = availability.filter(item => item.doctorId === selectedDoctor?._id);
    
    const [selectedAvailability, setSelectedAvailability] = useState(null)
    
    const [data, setData] = useState({hospitalName:"",hospitalId:null,fees:"",bookedDate:"",bookedSlot:"",doctorId:null,receiptNum:""})
    
    const bookedSlots = appointments.filter((item)=>{return item.doctorId === selectedDoctor?._id}).filter((item)=>{return item.bookedDate === data.bookedDate}).map((item)=>{return item.bookedSlot})

    const dayMap = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    const generateSlots = (startTime, endTime, slotDuration) => {
      if (!startTime || !endTime || !slotDuration) return [];
      const slots = [];
      const duration = Number(slotDuration);
      
      let startMinutes =
      Number(startTime.split(":")[0]) * 60 +
      Number(startTime.split(":")[1]);

      const endMinutes =
      Number(endTime.split(":")[0]) * 60 +
      Number(endTime.split(":")[1]);
      while(startMinutes + duration <= endMinutes){
    
        const formatTime = (minutes) => {
          let hrs = Math.floor(minutes / 60);
          const mins = minutes % 60;
          const period = hrs >= 12 ? "PM" : "AM";
          hrs = hrs % 12 || 12; // convert 0 -> 12
          return `${hrs}:${mins.toString().padStart(2, "0")} ${period}`;
        };

        const slotStart = formatTime(startMinutes);
        const slotEnd = formatTime(startMinutes + duration);

        slots.push(`${slotStart} - ${slotEnd}`);
        startMinutes += duration;
      }
      const availableSlots = slots.filter(slot => !bookedSlots.includes(slot));

      return availableSlots;
    };



     
      const doctorWorkingDays = (!selectedAvailability?.days ? [] : selectedAvailability?.days).map((day)=> {return dayMap[day]});


      const generateReceiptNum = (data) => {
        if (!data.length) {
          return "01";
        }

        const arr = []
        
        data.forEach((item)=>{
          arr.push(Number(item?.receiptNum))
        })
        
        const maxReceipt = Math.max(...arr)
        
        return `0${maxReceipt + 1}`
      }


      const handleAdd = () => {
        addAppointment(data , currentUser._id)
      }

      

      useEffect(()=>{
        fetchAllApointments();
        fetchUsers();
        fetchAvailability();
        fetchCurrentUser();
        // eslint-disable-next-line
      },[])    

  return (
    <>
      <Box>     
        <Box component="form" autoComplete="off" sx={{m:4,p:4}} onSubmit={(e) => {e.preventDefault(); handleAdd();setSelectedAvailability(null);setSelectedDoctor(null);setData({hospitalName:"",hospitalId:null,fees:"",bookedDate:"",bookedSlot:"",doctorId:null,receiptNum:""})}} >
          <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Typography variant="h5" sx={{fontWeight:"bold"}} color="initial">Schedule an Appointment</Typography>
            <Typography variant="body1" color="initial">#{generateReceiptNum(appointments)}</Typography>
          </Box>
          <Divider sx={{mb:2,mt:2}}/>
          <Box sx={{display:"flex",justifyContent:"space-between",gap:"20px"}}>
            <Box sx={{display:'flex',justifyContent:"space-between",flex:1,flexDirection:"column"}}>
              <Autocomplete disablePortal fullWidth onChange={(event,newValue)=>{setSelectedDoctor(newValue);setData({...data,doctorId:newValue?._id})}} options={doctors} getOptionLabel={(option) => option.name}  renderInput={(params) => <TextField {...params} label="Select Doctor" />}/>
              <TextField id="outlined-read-only-input"  label="Doctor Fees" value={selectedAvailability?.fees || ''}  slotProps={{ input: { readOnly: true, }, }}/>
            </Box>
            <Box sx={{display:'flex',justifyContent:"space-between",flex:1,flexDirection:"column"}}>
              <TextField id="outlined-read-only-input"  label="Specialization" value={selectedDoctor?.speciality || ''}  slotProps={{ input: { readOnly: true, }, }}/>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DemoItem >
                    <DatePicker sx={{width:"100%"}} fullWidth slotProps={{ textField: { fullWidth: true,},}}  disablePast  onChange={(newValue) => setData({...data,bookedDate:newValue.format('DD/MM/YYYY')})} shouldDisableDate={(date) => {
                     if (!doctorWorkingDays.length) return false;
                     const day = date.day(); 
                     return !doctorWorkingDays.includes(day);}}/>
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box sx={{display:'flex',justifyContent:"space-between",flexDirection:"column",flex:1}}>
              <Autocomplete disablePortal fullWidth onChange={(event,newValue)=>{setSelectedAvailability(newValue);setData({...data,hospitalName:newValue?.hospitalName,hospitalId:newValue?._id,fees:newValue?.fees,receiptNum:generateReceiptNum(appointments)})}} options={doctorAvailability} getOptionLabel={(option) => option.hospitalName}  renderInput={(params) => <TextField {...params} label="Clinic/Hospital" />}/>
              <Autocomplete disablePortal fullWidth options={generateSlots(selectedAvailability?.startTime,selectedAvailability?.endTime,selectedAvailability?.slotDuration)} onChange={(event,newValue)=>{setData({...data,bookedSlot:newValue})}}  renderInput={(params) => <TextField {...params} label="Available Slots" />}/>
            </Box>
          </Box><br />
          <Box sx={{display:"flex",justifyContent:"flex-end"}}>
            <Button variant="contained" type='submit' color="primary">Book Appointment</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AddAppointment