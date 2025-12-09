import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

const FAQs = (props) => {
  
    const {question,answer,num} = props;
    const [expandState,setExpandState] = useState({one:false,two:false,three:false,four:false,five:false});

    return (
    <>
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"80%",p:2,boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:2,m:`${expandState[num] ?"2px auto 0px auto":"20px auto"}`} }>
        <Typography variant="h6">{question}</Typography>
        <Box >{expandState[num] ? <ExpandLessRoundedIcon sx={{cursor:"pointer",backgroundColor:"white",borderRadius:"50%",p:1,"&:hover":{backgroundColor:"#f5f5f5",borderRadius:"50%",p:1,transition:"0.3s"}}}  onClick={() => setExpandState({...expandState, [num]: false})} /> : <ExpandMoreRoundedIcon sx={{cursor:"pointer",backgroundColor:"white",borderRadius:"50%",p:1,"&:hover":{backgroundColor:"#f5f5f5",borderRadius:"50%",p:1,transition:"0.3s"}}} onClick={() => setExpandState({...expandState, [num]: true})} />}</Box>  
      </Box>
      {expandState[num] && <Box sx={{display:"flex",borderRadius:2,justifyContent:"center",alignItems:"center",flexDirection:"column",width:"80%",p:2,border:"1px solid #f5f0f0ff"}}>
        <Typography sx={{width:"100%",m:0,p:2}} variant="body1">{answer}</Typography>
        <hr  style={{color:"black",height:"2px",width:"40%",margin:"0px auto"}}/>
      </Box>}
    </>
  )
}

export default FAQs