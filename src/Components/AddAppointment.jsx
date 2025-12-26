import { Box } from '@mui/material'
import React, { useState } from 'react'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddAppointment = () => {

  const doctorWorkingDays = [1, 3, 5];

  const [data , setdata] = useState({});

  return (
    <>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DemoItem label="Responsive variant">
              <DatePicker  onChange={(newValue) => setdata({...data,bookedDate:newValue})} shouldDisableDate={(date) => {
               const day = date.day(); 
               return !doctorWorkingDays.includes(day);}}/>
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </>
  )
}

export default AddAppointment