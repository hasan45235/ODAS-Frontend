import { Card, CardContent, Typography, Box, Chip, Divider, Button } from "@mui/material";
import { useRef, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
 

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
  bgcolor: 'background.paper',
  borderRadius:"20px",
  boxShadow: 24,
  p:2
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



const AppointmentCard = ({ appointment }) => {

    const showRef = useRef(null)

    
    
    
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
          <Button variant="contained" sx={{fontSize:"8px"}} onClick={()=>showRef.current.click()}>
            View Details
          </Button>
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
            <Card sx={style}>
              <CardContent >
<Box
  sx={{
    p: 2.5,
    
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  }}
>
  {/* HEADER */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 1.5,
    }}
  >
    <Typography fontWeight={600} fontSize={16}>
      Abc Hospital
    </Typography>

    <Chip
      label="PENDING"
      color="warning"
      size="small"
      sx={{ fontWeight: 600 }}
    />
  </Box>

  {/* MAIN INFO */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 3,
    }}
  >
    <InfoBlock label="Date" value="07 Jan 2026" />
    <InfoBlock label="Time" value="9:00 – 9:10 PM" />
    <InfoBlock
      label="Doctor"
      value="Dr. Sania"
      subValue="Optometrist"
    />
    <InfoBlock label="Fees" value="Rs. 3000" />
    <InfoBlock label="Receipt" value="#01" />
  </Box>
</Box>

              </CardContent>
            </Card>
          
        </Fade>
      </Modal>
    </>
  );
};


export default AppointmentCard;
