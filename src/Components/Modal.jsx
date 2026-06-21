import  {useContext, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardContent, TextField} from '@mui/material';
import BlockFlippedIcon from '@mui/icons-material/BlockFlipped';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AuthContext from '../authContext';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Swal from 'sweetalert2';

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


const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function CompModal(props) {

  const { refs , clickedUser , type} = props

  const context = useContext(AuthContext)
  const {adminUpdateUser} = context

  
  const [data ,setData] = useState({reason:""})

  const updatingUser = (user) => {
    if (!data.reason) return;

    const newStatus = user.status === "active" ? "inactive" : "active"
    const newData = {
      reason:data.reason,
      status: newStatus
    }
    adminUpdateUser(newData , user._id )
    handleClose()
    handleClose2()
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${firstCapital(user.role)} ${firstCapital(user.name)} marked ${newStatus}`,
      showConfirmButton: false,
      timer: 2000
    });
  }
  
  const firstCapital =(word)=>{
    if(!word) return ""
    let newWord =  word.charAt(0).toUpperCase() + word.slice(1)
    return newWord
  }


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

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
                  <Typography variant="body1" sx={{fontWeight:"bold",fontSize:"15px"}}>{type === "Doctor" ? "Doctor Details" : "Patient Details"}</Typography>
                  <Typography variant="body1">0001</Typography>
                </Box><br />
                <Box sx={{display:"flex",alignItems:"center",gap:"10px"}}>
                  <Typography variant="h6" sx={{fontWeight:"bold"}}>{type === "Doctor" ? "Dr. " + firstCapital(clickedUser?.name) : firstCapital(clickedUser?.name)}</Typography>
                  <Typography variant="body1" sx={clickedUser?.status === "active" ? {backgroundColor:"#1da224ff",color:"white",fontSize:"8px",p:"2px 4px",borderRadius:"5px" } : {backgroundColor:"#a21d1dff",color:"white",fontSize:"8px",p:"2px 4px",borderRadius:"5px"  }}>{firstCapital(clickedUser?.status)}</Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                  <Typography variant="body1" sx={{ fontSize: 15 , color:"#9f9c9cff"}}>Age: { clickedUser?.age} |</Typography>
                  <Typography variant="body1" sx={{ fontSize: 15 , color:"#9f9c9cff"}}>&nbsp;Gender:  { clickedUser?.gender}</Typography>
                </Box><hr />
                <Box >
                  <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Contact: <PhoneIcon color='action' sx={{ fontSize: 14 }}/> { clickedUser?.contact}</Typography>
                  <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Email: <MailOutlineIcon color='action' sx={{ fontSize: 14}}/> { clickedUser?.email}</Typography>
                  <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Address: { clickedUser?.address}</Typography>
                  {type === "Doctor" ? (<>
                  <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Speciality: { clickedUser?.speciality}</Typography>
                  <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Experience: { clickedUser?.experience}</Typography>
                  <Typography variant="body1" sx={{fontWeight:300,fontSize:"14px",lineHeight:2}}>Hospital: { clickedUser?.hospital}</Typography>
                  </>) : ""}
                </Box>
              </CardContent>
              <Box sx={{display:"flex", justifyContent:"flex-end", mb:2}}>
                {clickedUser.status === "active" ? 
                <Button startIcon={<BlockFlippedIcon />} onClick={()=>{handleOpen2()}} sx={{m:2, color:"red","&:hover": { bgcolor: "#fcf5f5" }}}>Mark In-Active</Button>
                :
                <Button startIcon={<TaskAltIcon />} onClick={()=>{handleOpen2()}} sx={{m:2, color:"Green","&:hover": { bgcolor: "#fcf5f5" }}}>Mark Active</Button>
                }                
              </Box>
            </Card>
          
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
      <Box sx={style2}>
        <Typography variant="h6" mb={2}>
          Update Reason
        </Typography>

        <TextField fullWidth multiline rows={4} label="Reason" required onChange={(e) => setData({...data,reason:e.target.value})}/>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={handleClose2}>
            Cancel
          </Button>

          <Button variant="contained" onClick={()=>{updatingUser(clickedUser)}} disabled={!data.reason}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
    </div>
  );
}


export default CompModal;