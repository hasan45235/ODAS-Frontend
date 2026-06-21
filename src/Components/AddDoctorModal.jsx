import React , {useContext, useState} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import {   Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import AuthContext from '../authContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  
};


const AddDoctorModal = (props) => {

    const {docRef} = props
    const context = useContext(AuthContext)
    const { createUser } = context
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    
    const genderArr = ['Male', 'Female', 'Other'];
    
    const [ dataArr, setDataArr] = useState({name:"", email:"", password:"", age:"", contact:"", gender:"", address:"",bio:"",speciality:"",experience:"",fee:0,qualification:"",role:"doctor"});
    

    const [error, setError] = useState({"state": false, "text": ""});
     
    
  const creatingUser = async() => {
    try {
      if(dataArr.password.length <= 6){
        setError({"state": true, "text": "Password must be at least 6 characters long."});
        return
      }
      let result = await createUser(dataArr);
      if(result.error){
        setError({"state": true, "text": result.error});
        return
      }

    } catch (error) {
      console.log("Error in Signup: ", error);
    }
  }



    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setDataArr({ ...dataArr, [name]: value });
    }

    
      const [showPassword, setShowPassword] = useState(false);
    
      const handleClickShowPassword = () => setShowPassword((show) => !show);
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const handleMouseUpPassword = (event) => {
        event.preventDefault();
      };

  return (
    <>
    <div>
      <Button onClick={handleOpen} ref={docRef} sx={{display:"none"}}>Open modal</Button>
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
            <Card component="form" autoComplete="off" sx={{m:4,p:4}} onSubmit={(e) => {e.preventDefault(),creatingUser()}} >
              
                <Typography variant="h4" sx={{fontWeight:"bold", color:"primary.dark",p:2,mb:2}}>Doctor Registeration</Typography>
                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
                  <TextField id="outlined-basic name" label="Name" name='name' variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
                  <TextField id="outlined-basic email" label="Email" type='email' name='email' variant="outlined" error={error.state && error.text === "Sorry a user with this email already exists" ? Boolean(error.state) : ""} helperText={error.state && error.text === "Sorry a user with this email already exists" ? error.text : ""} onChange={(e)=>{onChangeHandler(e)}} required/>
                  <FormControl sx={{  width: '30ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} name='password' onChange={(e)=>{onChangeHandler(e)}} endAdornment={ <InputAdornment position="end"><IconButton aria-label={ showPassword ? 'hide the password' : 'display the password' } onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end" >{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>} label="Password" required/>
                  </FormControl>
                  <TextField id="outlined-basic age" label="Age" type='number' name='age' onChange={(e)=>{onChangeHandler(e)}} variant="outlined" required/>
                </Box>
                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
                  <TextField id="outlined-basic contact" label="Contact"  inputProps={{ maxLength: 11 }} name='contact'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
                  <TextField id="outlined-basic experience" label="Experience" name='experience'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
                  <Autocomplete disablePortal options={genderArr} onChange={(event, newValue) => {setDataArr((prev) => ({...prev,gender: newValue ? newValue : "" }));}} sx={{ width: "30ch" }} renderInput={(params) => <TextField {...params} label="Gender" name='gender' />} required/>
                  <TextField id="outlined-basic fee" label="Fee" name='fee' type='number'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between", alignItems:"center", mb:3}}>
                  <TextField id="outlined-basic qualification" sx={{width:"22%"}} label="Qualification" name='qualification'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
                  <TextField id="outlined-basic speciality" sx={{width:"22%"}} label="Speciality" name='speciality'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
                  <TextField id="outlined-basic bio" label="Bio" name='bio' sx={{width:"49%"}} variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
                </Box>

                <TextField id="outlined-basic address" label="Address" name='address' variant="outlined" fullWidth onChange={(e)=>{onChangeHandler(e)}} required/><br /><br />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
              
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
    </>
  )
}

export default AddDoctorModal