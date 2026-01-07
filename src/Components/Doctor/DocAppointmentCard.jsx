import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Stack,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { useContext, useState } from "react";
import AppointmentsContext from "../../AppointmentsContext";


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

const statusColorMap = {
  pending: "warning",
  approved: "success",
  rejected: "error",
  completed: "primary",
};

const DoctorAppointmentCard = ({ ref, appointment, patient }) => {

  const context = useContext(AppointmentsContext)
  const { updateAppointment } = context


    const [open,setOpen] = useState(false)
    const handleClose = ()=> {setOpen(false)}
    const handleOpen = ()=> setOpen(true)

    
    const handleUpdate = (status,id) => {
      updateAppointment( status , id)
    }
    

  return (
    <>
    <Button ref={ref} onClick={()=>{handleOpen()}} sx={{display:"none"}} variant="contained" color="primary">Button</Button>
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 400 } }}>
      <Fade in={open}>
        <Box sx={Style}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 ,gap:"2px"}}>
                <Typography variant="h6" fontWeight={600}>{appointment?.hospitalName}</Typography>
                <Chip label={appointment?.status.toUpperCase()} color={statusColorMap[appointment?.status] || "default"} sx={{fontSize:"6px",transform:"translateY(10px)"}} size="small"/>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{display:"flex",justifyContent:"left",gap:10}}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" >Appointment Info</Typography>
                  <Stack spacing={0.5} mt={0.5}>
                    <Typography variant="caption" color="text.secondary">Date: {appointment?.bookedDate}</Typography>
                    <Typography variant="caption" color="text.secondary">Time: {appointment?.bookedSlot}</Typography>
                    <Typography variant="caption" color="text.secondary">Fee: Rs. {appointment?.fees}</Typography>
                    <Typography variant="caption" color="text.secondary">Receipt #: {appointment?.receiptNum}</Typography>
                  </Stack>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" >Patient Info</Typography>
                  <Stack spacing={0.5} mt={0.5}>
                    <Typography >{patient?.name}</Typography>
                    <Typography variant="caption" color="text.secondary">Email: {patient?.email}</Typography>
                    <Typography variant="caption" color="text.secondary">Contact: {patient?.contact}</Typography>
                    <Typography variant="caption" color="text.secondary">Age: {patient?.age}</Typography>
                    <Typography variant="caption" color="text.secondary">Gender: {patient?.gender}</Typography>
                  </Stack>
                </Box>
              </Box>
              <Box sx={{display:"flex",justifyContent:"flex-end"}}>
                {appointment?.status === "pending" && (
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success" size="small" onClick={() => {handleUpdate("approved", appointment?._id);handleClose()}}>Approve</Button>
                    <Button variant="outlined" color="error" size="small" onClick={() =>{ handleUpdate("rejected", appointment?._id);handleClose()}}>Reject</Button>
                  </Stack>
                )}
              </Box>
              {appointment?.status === "approved" && (
                <Button variant="contained" color="primary" size="small" onClick={() => {handleUpdate("completed", appointment?._id);handleClose()}}>Mark Completed</Button>
              )}
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Modal>
  </>
  );
};

export default DoctorAppointmentCard;
