import { Box, Button, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React , { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import backimage from '../sign.png';
import Footer from '../Components/Footer';

const Signup = () => {

  const genderArr = ['Male', 'Female', 'Other'];

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
      <Box sx={{mt:8}}>
        <Card component="form" autoComplete="off" sx={{width:"90%",margin:"0px auto",display:"flex",mb:8,justifyContent:"space-between" }} >
          <Box sx={{width:"30%",background:`linear-gradient(rgba(240, 235, 235, 0.5), rgba(0, 0, 0, 0.5)), url(${backimage})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition: "center", color:"#fff"}}>
            <Typography variant="h3" sx={{}} >Register Yourself To Get Started</Typography>
          </Box>
          <Box sx={{width:"70%", p:4}}>
          <Typography variant="h3" sx={{fontWeight:"bold", color:"primary.dark",p:2,mb:2}}>Sign Up</Typography>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Email" type='email' variant="outlined" />
            <FormControl sx={{  width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={ <InputAdornment position="end"><IconButton aria-label={ showPassword ? 'hide the password' : 'display the password' } onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end" >{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>} label="Password" />
            </FormControl>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic" label="Age" type='number' variant="outlined" />
            <TextField id="outlined-basic" label="Contact" variant="outlined" />
            <Autocomplete disablePortal options={genderArr} sx={{ width: "30ch" }} renderInput={(params) => <TextField {...params} label="Gender" />}/>
          </Box>
          <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth /><br /><br />
          <Button variant="contained" color="primary" type="submit">Done</Button>
          </Box>
        </Card>
        <Footer />
      </Box>
    </>
  )
}

export default Signup

// {
//     "name":"Usama",
//     "email":"usama62@gmail.com",
//     "password":"usama123",
//     "age":21,
//     "contact":"0331-3433153",
//     "gender":"Male",
//     "address":"block 1abc gulshan street",
//     "role":"admin"
// }