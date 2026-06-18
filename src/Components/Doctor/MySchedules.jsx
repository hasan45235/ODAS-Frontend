import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
  Box,
  Fade, Modal,Backdrop,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import ScheduleContext from "../../scheduleContext";
import AddAvaibility from "./AddSchedule";
import {Oval} from 'react-loader-spinner'


const Style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
};




const MySchedules = () => {

  const context = useContext(ScheduleContext);
  const {specificSchedule, fetchSpecificSchedule} = context;

  
  const [open,setOpen] = useState(false)
  const handleClose = ()=> {setOpen(false)}
  const handleOpen = ()=> setOpen(true)

  const [selectedSchedule, setSelectedSchedule] = useState({})


  useEffect(()=>{
    fetchSpecificSchedule();
    // eslint-disable-next-line
  },[specificSchedule])


  return (
    <Box sx={{p:4}}>
      {specificSchedule.length === 0 || !specificSchedule ? (
        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          <Oval  height="14vh" width="14vw" color="#1976d2" visible={true} ariaLabel="oval-loading" secondaryColor="#1976d2" strokeWidth={2} strokeWidthSecondary={2} />
        </Box>
      ) : (<>

        
        {specificSchedule.map((schedule)=>{                    
          return(
            <Card key={schedule._id} sx={{ borderRadius: 3, boxShadow: 3,mb:3}}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}> {schedule.hospitalName} </Typography>
          <IconButton size="small" onClick={()=>{handleOpen();setSelectedSchedule(schedule)}}> <EditIcon /></IconButton>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {schedule.days.map((day) => (
            <Chip key={day} label={day} size="small" />
          ))}
        </Stack>
        <Stack spacing={1} mt={2}>
          <Typography variant="body2"><strong>Time:</strong> {schedule.startTime} – {schedule.endTime}</Typography>
          <Typography variant="body2"> <strong>Slot Duration:</strong> {schedule.slotDuration} minutes</Typography>
          <Typography variant="body2"><strong>Consultation Fee:</strong> Rs. {schedule.fees}</Typography>
        </Stack>
        <Stack mt={2} justifyContent="right" direction="row" display="flex" width="100%">
          <Chip sx={{width:"100px"}} label={schedule.status.toUpperCase()} color={schedule.status === "active" ? "success" : "error"} size="small"/>
        </Stack>
      </CardContent>
    </Card>
    )
  })}
  </>)}
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 400 } }}>
      <Fade in={open}>
        <Box sx={Style}>
          <AddAvaibility handleClose={handleClose} schedule={selectedSchedule} action="Edit"/>
        </Box>
      </Fade>
    </Modal>  
    </Box>
  );
};

export default MySchedules;
