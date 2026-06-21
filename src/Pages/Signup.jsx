import { Box, Button, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText, Typography } from '@mui/material'
import React , { useContext, useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import backimage from '../sign.png';
import Footer from '../Components/Footer';
import AuthContext from '../authContext';
import AddDoctorModal from '../Components/AddDoctorModal';

const Signup = () => {

  const context = useContext(AuthContext);
  const {createUser ,  fetchUsers} = context;

  const [ dataArr, setDataArr] = useState({name:"", email:"", password:"", age:"", contact:"", gender:"", address:"",role:"patient"});
  
  const [error, setError] = useState({"state": false, "text": ""});

  const genderArr = ['Male', 'Female', 'Other'];

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataArr({ ...dataArr, [name]: value });
    
  }

  const docRef = useRef(null)

  const addUser = async() => {
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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


  useEffect(()=>{
    fetchUsers()
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Box sx={{mt:8}}>
        <Card component="form" autoComplete="off" sx={{width:"90%",margin:"0px auto",display:"flex",mb:8,justifyContent:"space-between" }} onSubmit={(e) => {e.preventDefault(); addUser()}} >
          <Box sx={{width:"30%",background:`linear-gradient(rgba(240, 235, 235, 0.5), rgba(0, 0, 0, 0.5)), url(${backimage})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition: "center", color:"#fff"}}>
          </Box>
          <Box sx={{width:"70%", p:4}}>
          <Typography variant="h3" sx={{fontWeight:"bold", color:"primary.dark",p:2,mb:2}}>Sign Up</Typography>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic name" label="Name"  name='name' variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
            <TextField id="outlined-basic email" label="Email" error={error.state && error.text === "Sorry a user with this email already exists" ? Boolean(error.state) : ""} helperText={error.state && error.text === "Sorry a user with this email already exists" ? error.text : ""} type='email' name='email' variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
            <FormControl sx={{  width: '30ch' }} error={error.state && error.text === "Password must be at least 6 characters long." ? Boolean(error.state) : ""} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput id="outlined-adornment-password"   type={showPassword ? 'text' : 'password'} name='password' onChange={(e)=>{onChangeHandler(e)}} endAdornment={ <InputAdornment position="end"><IconButton aria-label={ showPassword ? 'hide the password' : 'display the password' } onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end" >{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>} label="Password" required/>
            <FormHelperText sx={{fontSize:"8px"}}>{error.state && error.text === "Password must be at least 6 characters long." ? error.text : ""}</FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic age" label="Age" type='number' name='age' onChange={(e)=>{onChangeHandler(e)}} variant="outlined" required/>
            <TextField id="outlined-basic contact" inputProps={{maxLength: 11,}} label="Contact" name='contact'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}} required/>
            <Autocomplete disablePortal options={genderArr} onChange={(event, newValue) => {setDataArr((prev) => ({...prev,gender: newValue ? newValue : "" }));}} sx={{ width: "30ch" }} renderInput={(params) => <TextField {...params} label="Gender" name='gender' />}/>
          </Box>
          <TextField id="outlined-basic address" label="Address" name='address' variant="outlined" fullWidth onChange={(e)=>{onChangeHandler(e)}} required  /><br /><br />
          <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Button variant="contained" color="primary" type="submit">Sign-up</Button>
            <Typography variant="body1" onClick={()=>{docRef.current.click()}} color="primary"  sx={{textDecoration:"underline","&:hover":{cursor:"pointer",color:"#0e3fb0"}}}>Sign-up as doctor?</Typography>
          </Box>
          </Box>
        </Card>
        <Footer />
        <AddDoctorModal docRef={docRef} />
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