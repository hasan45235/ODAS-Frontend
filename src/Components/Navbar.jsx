import React  from "react";
// import AppBar from "@mui/material/AppBar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


 function Navbar() {

  return (
    <>
      
        <Toolbar sx={{display:"flex",justifyContent:"space-around"}}>
            <Box>
                <Typography  sx={{}} variant="h4" >
                    <Link style={{color:"#236bdfff",textDecoration:"none"}}  to="/">HealthLink</Link>
                </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",gap:2}}>
                <Typography sx={{}}>
                    <Link  to="/signup">
                    <Button variant="contained">
                    Sign-up
                    </Button>
                    </Link>
                </Typography>
                <Typography sx={{margin:"auto 0px"}}>
                    <Link style={{fontSize:"12px",color:"#1976d2"}} to="/login">
                    already have an account?
                    </Link>
                </Typography>
            </Box>
        </Toolbar>
      
    </>
  );
}

export default Navbar;