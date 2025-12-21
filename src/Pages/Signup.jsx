import { Box, Button, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React , { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import backimage from '../sign.png';
import Footer from '../Components/Footer';
import AuthContext from '../authContext';

const Signup = () => {

  const context = useContext(AuthContext);
  const {createUser , allUsers , fetchUsers} = context;

  const totalUsers = (allUsers.length + 1)

  const [ dataArr, setDataArr] = useState({receiptNum:`${totalUsers}`,name:"", email:"", password:"", age:"", contact:"", gender:"", address:"",role:"patient"});

  const genderArr = ['Male', 'Female', 'Other'];

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataArr({ ...dataArr, [name]: value });
    
  }

  const addUser = async() => {
    try {
      
      await createUser(dataArr);

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
            <Typography variant="h3" sx={{}} >Register Yourself To Get Started</Typography>
          </Box>
          <Box sx={{width:"70%", p:4}}>
          <Typography variant="h3" sx={{fontWeight:"bold", color:"primary.dark",p:2,mb:2}}>Sign Up</Typography>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic name" label="Name" name='name' variant="outlined" onChange={(e)=>{onChangeHandler(e)}}/>
            <TextField id="outlined-basic email" label="Email" type='email' name='email' variant="outlined" onChange={(e)=>{onChangeHandler(e)}}/>
            <FormControl sx={{  width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} name='password' onChange={(e)=>{onChangeHandler(e)}} endAdornment={ <InputAdornment position="end"><IconButton aria-label={ showPassword ? 'hide the password' : 'display the password' } onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end" >{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>} label="Password" />
            </FormControl>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:3}}>
            <TextField id="outlined-basic age" label="Age" type='number' name='age' onChange={(e)=>{onChangeHandler(e)}} variant="outlined" />
            <TextField id="outlined-basic contact" label="Contact" name='contact'  variant="outlined" onChange={(e)=>{onChangeHandler(e)}}/>
            <Autocomplete disablePortal options={genderArr} onChange={(event, newValue) => {setDataArr((prev) => ({...prev,gender: newValue ? newValue : "" }));}} sx={{ width: "30ch" }} renderInput={(params) => <TextField {...params} label="Gender" name='gender' />}/>
          </Box>
          <TextField id="outlined-basic address" label="Address" name='address' variant="outlined" fullWidth onChange={(e)=>{onChangeHandler(e)}}/><br /><br />
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