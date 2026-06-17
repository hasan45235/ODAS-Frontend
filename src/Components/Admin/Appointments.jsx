// eslint-disable-next-line
import React, {  useContext, useEffect, useRef } from 'react'
import SideBar from '../SideBar'
import { Box, Button, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AddAvaibility from '../Doctor/AddAvaibility'
import ScheduleContext from '../../scheduleContext'
import AuthContext from '../../authContext'

const Appointments = () => {
  
    const context = useContext(ScheduleContext);
    const {specificSchedule, fetchSpecificSchedule} = context;


  const generateSlots = (startTime, endTime, slotDuration) => {
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
  return slots.join(", ");
};


    const context2 = useContext(AuthContext)
    const {fetchCurrentUser , currentUser} = context2;
    

    const addRef = useRef();

    useEffect(() => {
        fetchSpecificSchedule()
        fetchCurrentUser();
      // eslint-disable-next-line  
    }, [])
  
    return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <AddAvaibility ref={addRef} />
          <Box>
            <Button onClick={()=>{addRef.current.click()}} variant="contained" sx={{mt:3}}>Add Schedule</Button>
          </Box>
          <Box>
            {specificSchedule && specificSchedule.map((item, index) => (
              <Box key={index} sx={{border:"1px solid #000", p:2, mb:2, borderRadius:2}}>
                <h3>Name: {currentUser?.name}</h3>
                <p>Center: {item?.hospitalName}</p>
                <p>Available Slots: {generateSlots(item?.startTime,item?.endTime,item?.slotDuration)}</p>
                <p>Fees: {item?.fees}</p>
                <p>Days: {item?.days.join(", ")}</p>
                <p>Slot Duration: {item?.slotDuration} minutes</p>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>  
    </>
  )
}

export default Appointments