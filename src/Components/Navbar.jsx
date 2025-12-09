import React , { useState } from "react";
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


 function Navbar() {

  return (
    <>
      
        <Toolbar sx={{display:"flex",justifyContent:"space-around"}}>
            <Box>
                <Typography variant="h4" color="initial">HealthLink</Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",gap:2}}>
                <Typography>
                    <Link to="/">
                    Home
                    </Link>
                </Typography>
                <Typography>
                    <Link to="/about">
                    About
                    </Link>
                </Typography>
                <Typography>
                    <Link to="/contact"> 
                    Contact
                    </Link>
                </Typography>
                <Typography>
                    <Link to="/login">
                    Login
                    </Link>
                </Typography>
            </Box>
        </Toolbar>
      
    </>
  );
}

export default Navbar;