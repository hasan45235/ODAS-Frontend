import { Box, Typography } from '@mui/material'
import React from 'react'

const Card = (props) => {
    
    const {title,desc,icon} = props;

  return (
    <>
        <Box sx={{display:"flex", padding:"20px 10px",width:"22%",boxShadow:"0px 0px 5px grey",mt:2,borderRadius:"10px",'&:hover':{boxShadow:"0px 0px 10px grey",transition:"0.3s",transform:'translateY(-5px)',cursor:"pointer"}}}>
          {icon}
          <Box sx={{margin:"auto 0px"}}>
            <Typography variant="h6" color="initial">{title}</Typography>
            <Typography variant="body1" sx={{color:"grey",fontSize:"14px"}}>{desc <= 9 ? `0${desc}` : desc}</Typography>
          </Box>
        </Box>
    </>
  )
}

export default Card