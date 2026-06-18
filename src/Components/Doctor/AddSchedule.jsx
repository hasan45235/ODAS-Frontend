import {  Box, Button,  FormControl,  OutlinedInput, TextField, Typography } from '@mui/material';
import  { useContext, useEffect, useState } from 'react'
import {  useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import ScheduleContext from '../../scheduleContext';
import AuthContext from '../../authContext';
import dayjs from "dayjs";
import Swal from 'sweetalert2';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


const AddSchedule = (props) => {

  // props
    const {handleClose , schedule , action} = props


  // contexts
    const context = useContext(ScheduleContext)
    const {addSchedule , updateSchedule} = context;

    const context2 = useContext(AuthContext)
    const {fetchCurrentUser , currentUser} = context2;
  
  // states
    const [data , setData] = useState({hospitalName:"", fees:"", days:[], startTime:null, endTime:null, slotDuration:""});
    
    const [editData,setEditData] = useState({
      hospitalName:schedule?.hospitalName,
      startTime:schedule?.startTime,
      endTime:schedule?.endTime,
      fees:schedule?.fees,
      slotDuration:schedule?.slotDuration,
      days:schedule?.days
    })
    
    
    
    const doctorId = currentUser ? currentUser._id : null;

    const onChange = (e) => {
      setFormData({...formData,[e.target.name]: e.target.value})
    }

    
    

    const formData = action === "Edit" ? editData : data;
    const setFormData = action === "Edit" ? setEditData : setData;

    const editDataId = schedule?._id

    const updateData = () => {
      updateSchedule(editData , editDataId)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Schedule Updated Successfully",
        showConfirmButton: false,
        timer: 2000
      });
    }

    const theme = useTheme();

    const handleChange = (event) => {      
      const {target: { value }} = event;
      setFormData({...formData, days: typeof value === 'string' ? value.split(',') : value})
    };

    const addData = () => {
      addSchedule(data, doctorId);
      setData({hospitalName:"", fees:"", days:[], startTime:null, endTime:null, slotDuration:""});

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Schedule Added Successfully",
        showConfirmButton: false,
        timer: 2000
      });
    }

    const submitform = (e) => {
      e.preventDefault();
      if(action === "Edit"){
        updateData();
        handleClose();
        setEditData({})
        return
      }
      addData();
    }

    useEffect(() => {
      fetchCurrentUser();
      // eslint-disable-next-line
    }, [currentUser]);

    return(
      <>
            <Box>
              <Box component="form" autoComplete="off" sx={{m:4,p:4}} onSubmit={(e) => {submitform(e)}} >
                <Typography variant="h5" sx={{fontWeight:"bold"}} color="initial">{action ? "Edit your Schedule" : "Add Schedule"}</Typography>
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",mt:3}}>
                <TextField sx={{  width: "32%"}} value={formData?.hospitalName} name='hospitalName' onChange={(e)=>{onChange(e)}} id="outlined-basic" label="Clinic/Hospital Name" variant="outlined" />
                <TextField sx={{  width: "32%"}} name='fees' value={formData?.fees} onChange={(e)=>{onChange(e)}} id="outlined-basic" label="Fees" variant="outlined" />
                <FormControl sx={{  width: "32%"}}>
                  <Select multiple displayEmpty value={Array.isArray(formData.days) ? formData.days : []} name='days' onChange={handleChange} input={<OutlinedInput />} renderValue={(selected) => { if (selected.length === 0) { return <em>Days</em>; } return selected.join(', '); }} MenuProps={MenuProps} inputProps={{ 'aria-label': 'Without label' }}>
                   {names.map((name) => ( <MenuItem key={name} value={name} style={getStyles(name, data.days, theme)}> {name} </MenuItem>))}
                  </Select>
                </FormControl>
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",mt:3}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      label="Start Time"
                      value={formData?.startTime ? dayjs(formData?.startTime, "HH:mm") : null}
                      onChange={(newValue) => {
                          setFormData({...formData, startTime:newValue.format("HH:mm")})
                      }}
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }} 
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      label="End Time"
                      value={formData?.endTime ? dayjs(formData?.endTime, "HH:mm") : null}
                      onChange={(newValue) => {
                          setFormData({...formData, endTime:newValue.format("HH:mm")})
                      }}
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }} 
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField  id="outlined-basic" value={formData?.slotDuration} name='slotDuration' onChange={(e)=>{onChange(e)}} label="Slot Duration" type='Number' variant="outlined" sx={{width: "32%", "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0, }, "& input[type=number]": { MozAppearance: "textfield", },}} slotProps={{ input: { endAdornment: ( <InputAdornment position="end" sx={{ opacity: 0, pointerEvents: 'none', [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: { opacity: 1,}, }}> mins </InputAdornment> ), },}}/>
                </Box>
                <Button type='submit' variant="contained" sx={{width: "25%",p:1,mt:2}}>Add</Button>
              </Box>
            </Box>
        
        </>
    )
}


export default AddSchedule;