import {  Box, Button, Card, Fade, FormControl,  Modal, OutlinedInput, TextField } from '@mui/material';
import  { useContext, useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
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
import AvailibilityContext from '../availibilityContext';
import AuthContext from '../authContext';

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


const AddAvaibility = (props) => {

    const context = useContext(AvailibilityContext)
    const {addAvailability } = context;

    const context2 = useContext(AuthContext)
    const {fetchCurrentUser , currentUser} = context2;

    const {ref} = props;

    const [data , setData] = useState({hospitalName:"", fees:"", days:[], startTime:null, endTime:null, slotDuration:""});
    
    const doctorId = currentUser ? currentUser._id : null;

    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
        
    }

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    };

    

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const theme = useTheme();

    const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setData({...data, days: typeof value === 'string' ? value.split(',') : value});
    };

    const addData = () => {
      addAvailability(data, doctorId);
    }

    useEffect(() => {
      fetchCurrentUser();
      // eslint-disable-next-line
    }, []);

    return(
      <>
        <Button onClick={handleOpen} ref={ref} sx={{display:"none"}}>Open modal</Button>
        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500,}, }}>
          <Fade in={open}>
            <Box sx={style}>
              <Card component="form" autoComplete="off" sx={{m:4,p:4}} onSubmit={(e) => {e.preventDefault();addData();handleClose()}} >
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",mt:3}}>
                <TextField sx={{  width: "32%"}} name='hospitalName' onChange={(e)=>{onChange(e)}} id="outlined-basic" label="Clinic/Hospital Name" variant="outlined" />
                <TextField sx={{  width: "32%"}} name='fees' onChange={(e)=>{onChange(e)}} id="outlined-basic" label="Fees" variant="outlined" />
                <FormControl sx={{  width: "32%"}}>
                  <Select multiple displayEmpty value={data.days} name='days' onChange={handleChange} input={<OutlinedInput />} renderValue={(selected) => { if (selected.length === 0) { return <em>Days</em>; } return selected.join(', '); }} MenuProps={MenuProps} inputProps={{ 'aria-label': 'Without label' }}>
                   {names.map((name) => ( <MenuItem key={name} value={name} style={getStyles(name, data.days, theme)}> {name} </MenuItem>))}
                  </Select>
                </FormControl>
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",mt:3}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      label="Start Time"
                      onChange={(newValue) => {

                       setData({...data, startTime:newValue.format("HH:mm")});
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
                      onChange={(newValue) => {
                       setData({...data, endTime:newValue.format("HH:mm")});
                      }}
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }} 
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField  id="outlined-basic" name='slotDuration' onChange={(e)=>{onChange(e)}} label="Slot Duration" type='Number' variant="outlined" sx={{width: "32%", "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0, }, "& input[type=number]": { MozAppearance: "textfield", },}} slotProps={{ input: { endAdornment: ( <InputAdornment position="end" sx={{ opacity: 0, pointerEvents: 'none', [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: { opacity: 1,}, }}> mins </InputAdornment> ), },}}/>
                </Box>
                <Button type='submit' variant="contained" sx={{width: "25%",p:1,mt:2}}>Submit</Button>
              </Card>  
            </Box>
          </Fade>
        </Modal>
        
        </>
    )
}


export default AddAvaibility;