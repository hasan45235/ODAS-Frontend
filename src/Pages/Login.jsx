import { Box, Button, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useContext, useState } from 'react'
import Footer from '../Components/Footer'
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import AuthContext from '../authContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const context = useContext(AuthContext);
  const { loginUser } = context;

  const navigate = useNavigate();

  const [error, setError] = useState({ state: false, text: "" });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [dataArr, setDataArr] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataArr({ ...dataArr, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const result = await loginUser(dataArr);
      console.log("Login Result: ", result);
      if (result.error) {
        setError({ state: true, text: result.error });
        console.log("Login failed: ", result.error);
        return;
      }
    } catch (error) {
      console.log("Error in Login: ", error);
    }
  }

  return (
    <>
      <Box sx={{ mt: 15 }}>
        <Card component="form" autoComplete="off" sx={{ width: "30%", margin: "0px auto ", display: "flex", mb: 8, justifyContent: "space-between" }} onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "primary.dark", p: 2, mb: 2, textAlign: "center" }}>Log In</Typography>
            <Box sx={{ mb: 3 }}>
              <TextField id="outlined-basic" label="Email" type='email' name='email' onChange={(e) => { onChangeHandler(e) }} variant="outlined" sx={{ mb: 3 }} fullWidth required />
              <FormControl fullWidth variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} name='password' onChange={(e) => { onChangeHandler(e) }} endAdornment={<InputAdornment position="end"><IconButton aria-label={showPassword ? 'hide the password' : 'display the password'} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end" >{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>} label="Password" required />
              </FormControl>
              <Typography variant="body2" sx={{ mt: 1 }}>Don't have an account? <span style={{ color: "blue", textDecoration: "underline" }} onClick={() => navigate('/signup')}>Sign Up</span></Typography>
            </Box>
            <Button variant="contained" color="primary" type="submit" sx={{ p: 1 }} fullWidth>Login</Button>
            <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'error.main', fontSize: '10px' }}>{error.text}</Typography>
          </Box>
        </Card>
        <Footer />
      </Box>
    </>
  )
}

export default Login