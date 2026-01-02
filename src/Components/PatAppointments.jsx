import React, { useContext, useEffect, useRef, useState } from 'react'
import DashboardSidebar from './SideBar'
import { Box, Button, Card, CardContent, Fade, Modal, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppointmentsContext from '../AppointmentsContext'
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AuthContext from '../authContext'
import AvailablilityContext from '../availibilityContext'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const PatAppointments = () => {
  
  const context = useContext(AppointmentsContext)
  const { addAppointment, fetchAllApointments, appointments } = context

  const context2 = useContext(AuthContext)
  const {fetchUsers , allUsers} = context2

  const context3 = useContext(AvailablilityContext)
  const {fetchAvailability , availability} = context3


  const addRef = useRef(null);

  const style = {
      position: 'absolute',
      top: '50%',
      left: '60%',
      transform: 'translate(-50%, -50%)',
      width: "70%",
      bgcolor: 'background.paper',
      borderRadius:"20px",
      boxShadow: 24,
      p:2
    };

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
    
    const [data, setData] = useState({})
    

    const dayMap = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

     
    const doctorWorkingDays = (!selectedAvailability?.days ? [] : selectedAvailability?.days).map((day)=> {return dayMap[day]});
    // const doctorWorkingDays = [1,3,5]


      const generateReceiptNum = (data) => {
      if (!data.length) {
        return "01";
      }
      const arr = []
      data.forEach((item)=>{
        arr.push(item?.receiptNumber)
      })
      const maxReceipt = Math.max(...arr)
      console.log(maxReceipt)
      return `0${maxReceipt + 1}`
      }

      
  
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    
      const onChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
        console.log(data)
      }

      useEffect(()=>{
        fetchAllApointments();
        fetchUsers();
        fetchAvailability();
        // eslint-disable-next-line
      },[])

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Box>
              <Button onClick={handleOpen} sx={{display:"none"}} ref={addRef}>Open modal</Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                    <Card sx={style}>
                     <CardContent >
                        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2}}>
                          <Typography variant="body1" color="initial">Book Appointment</Typography>
                          <Typography variant="body1" color="initial">{generateReceiptNum(appointments)}</Typography>
                        </Box>
                        <Box sx={{display:'flex',justifyContent:"space-between"}}>
                          <Autocomplete disablePortal onChange={(event,newValue)=>{setSelectedDoctor(newValue)}} options={doctors} getOptionLabel={(option) => option.name} sx={{ width: "30%" }} renderInput={(params) => <TextField {...params} label="Doctor" />}/>
                          <Autocomplete disablePortal onChange={(event,newValue)=>{setSelectedAvailability(newValue)}} options={doctorAvailability} getOptionLabel={(option) => option.hospitalName} sx={{ width: "30%" }} renderInput={(params) => <TextField {...params} label="Clinic/Hospital" />}/>
                          <TextField id="outlined-read-only-input" sx={{width:"30%"}} label="Fees" value={selectedAvailability?.fees || ''} slotProps={{ input: { readOnly: true, }, }}/>
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DemoItem label="Select Date">
                              <DatePicker  onChange={(newValue) => setData({...data,bookedDate:newValue})} shouldDisableDate={(date) => {
                               if (!doctorWorkingDays.length) return false;
                               const day = date.day(); 
                               return !doctorWorkingDays.includes(day);}}/>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                        <Autocomplete disablePortal  options={''} getOptionLabel={(option) => option.hospitalName} sx={{ width: "30%" }} renderInput={(params) => <TextField {...params} label="Slots" />}/>
                      </CardContent>
                    </Card>
                </Fade>
              </Modal>
              <Button variant="contained" onClick={()=>{console.log(selectedDoctor,doctorAvailability,selectedAvailability?.days,doctorWorkingDays)}} color="primary">
                click me
              </Button>
            </Box>
            <Box>
              <Button variant='contained' onClick={()=>(addRef.current.click())}>Add Appointment</Button>
            </Box>

        </Box>
      </Box>
    </>
  )
}

export default PatAppointments