import { Card, CardContent, Typography, Box, Chip, Divider, Button, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Visibility } from "@mui/icons-material";
 

const statusColorMap = {
  pending: "warning",
  confirmed: "success",
  cancelled: "error",
};


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  borderRadius:"20px",
  boxShadow: 24,
  
};

const InfoBlock = ({ label, value, subValue }) => (
  <Box sx={{ minWidth: 140 }}>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ letterSpacing: 0.3 }}
    >
      {label}
    </Typography>

    <Typography fontWeight={600}>
      {value}
    </Typography>

    {subValue && (
      <Typography variant="caption" color="text.secondary">
        {subValue}
      </Typography>
    )}
  </Box>
);



const AppointmentCard = (props) => {

    const showRef = useRef(null)

    const {appointment , patient , doctor } = props
    
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    

  return (
    <>
    <Card sx={{  borderRadius: 2, boxShadow: 3 }}>
      <CardContent>

        <Box sx={{display:"flex",justifyContent:"space-between"}}>
          <Typography variant="h6" fontWeight={600}>
            {appointment.hospitalName}
          </Typography>
          <IconButton aria-label="view" color="primary" onClick={()=>showRef.current.click()}>
            <Visibility/>
          </IconButton>
        </Box>

        <Divider sx={{ my: 1 }} />

        
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography color="text.secondary">
            Date
          </Typography>
          <Typography fontWeight={500}>
            {appointment.bookedDate}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography color="text.secondary">
            Time Slot
          </Typography>
          <Typography fontWeight={500}>
            {appointment.bookedSlot}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography color="text.secondary">
            Fees
          </Typography>
          <Typography fontWeight={600}>
            Rs. {appointment.fees}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography color="text.secondary">
            Receipt No
          </Typography>
          <Typography fontWeight={500}>
            #{appointment.receiptNum}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Chip
            label={appointment.status.toUpperCase()}
            color={statusColorMap[appointment.status] || "default"}
            variant="outlined"
          />
        </Box>

      </CardContent>
    </Card>
    <Button onClick={handleOpen} sx={{display:"none"}} ref={showRef}>Open modal</Button>
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
            <Box sx={style}>
              <Box sx={{ p: 2.5,     bgcolor: "background.paper", borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.08)"}}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5,}}>
                  <Typography fontWeight={600} fontSize={16}>{appointment?.hospitalName}</Typography>
                  <Chip label={appointment?.status} color="warning" size="small" sx={{ fontWeight: 600 }}/>
                </Box>
                <Divider sx={{m:2}} />
                <Box sx={{ display: "flex", justifyContent:"space-between",mt:5}}>
                  <InfoBlock label="Date" value={appointment?.bookedDate} />
                  <InfoBlock label="Receipt" value={`#${appointment?.receiptNum}`} />
                </Box>
                <Box sx={{ display: "flex", justifyContent:"space-between",mt:5}}>
                  <InfoBlock label="Name" value={patient?.name} />
                  <InfoBlock label="Age" value={patient?.age} />
                  <InfoBlock label="Doctor" value={`Dr ${doctor[0]?.name}`} subValue={`(${doctor[0]?.speciality})`}/>
                  <InfoBlock label="Time" value={appointment?.bookedSlot} />    
                  <InfoBlock label="Fees" value={`Rs ${appointment?.fees}`} />
                </Box>
              </Box>
            </Box>
        </Fade>
      </Modal>
    </>
  );
};


export default AppointmentCard;
