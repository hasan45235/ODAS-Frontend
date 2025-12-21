import  {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "35%",
  bgcolor: 'background.paper',
  borderRadius:"20px",
  boxShadow: 24,
  p:2
};

function CompModal(props) {

  const { refs , clickedUser} = props
  
  
  const firstCapital =(word)=>{
    if(!word) return ""
    let newWord =  word.charAt(0).toUpperCase() + word.slice(1)
    return newWord
  }


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} sx={{display:"none"}} ref={refs}>Open modal</Button>
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
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                  <Typography variant="body1" sx={{fontWeight:"bold",fontSize:"15px"}}>Patient Details</Typography>
                  <Typography variant="body1">0001</Typography>
                </Box><br />
                <Box sx={{display:"flex",alignItems:"center",gap:"10px"}}>
                  <Typography variant="h6" sx={{fontWeight:"bold"}}>{firstCapital(clickedUser?.name)}</Typography>
                  <Typography variant="body1" sx={clickedUser?.status === "active" ? {backgroundColor:"#1da224ff",color:"white",fontSize:"8px",p:"2px 4px",borderRadius:"5px" } : {backgroundColor:"#a21d1dff",color:"white",fontSize:"8px",p:"2px 4px",borderRadius:"5px"  }}>{firstCapital(clickedUser?.status)}</Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                  <Typography variant="body1" sx={{ fontSize: 15 , color:"#9f9c9cff",fontSize:"12px"}}>Age: { clickedUser?.age} |</Typography>
                  <Typography variant="body1" sx={{ fontSize: 15 , color:"#9f9c9cff",fontSize:"12px"}}>&nbsp;Gender:  { clickedUser?.gender}</Typography>
                </Box><hr />
                <Box sx={{display:"flex"}}>
                  <Box>
                    <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Contact: <PhoneIcon color='action' sx={{ fontSize: 14 }}/> { clickedUser?.contact}</Typography>
                    <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Email: <MailOutlineIcon color='action' sx={{ fontSize: 14}}/> { clickedUser?.email}</Typography>
                    <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Address: { clickedUser?.address}</Typography>
                  </Box>
                </Box>
              </CardContent>
              <Box sx={{display:"flex", justifyContent:"flex-end", mb:2}}>
                <Button startIcon={<EditIcon />}  sx={{m:2}}>Edit</Button>
                <Button startIcon={<DeleteIcon />}  sx={{m:2, color:"red","&:hover": { bgcolor: "#fcf5f5" }}}>Delete</Button>
              </Box>
            </Card>
          
        </Fade>
      </Modal>
    </div>
  );
}


export default CompModal;