import { Box, Typography } from '@mui/material'
import React from 'react'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Card = (props) => {
    
    const {title,desc,icon} = props;

  return (
    <>
        <Box sx={{display:"flex", padding:"20px 10px",width:"20%",boxShadow:"0px 0px 5px grey",mt:2}}>
          {icon}
          <Box>
            <Typography variant="h6" color="initial">{title}</Typography>
            <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}}>{desc}</Typography>
          </Box>
        </Box>
    </>
  )
}

export default Card