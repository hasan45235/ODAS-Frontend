// eslint-disable-next-line
import React, {  useContext, useEffect, useRef } from 'react'
import SideBar from '../Components/SideBar'
import { Box, Button, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AddAvaibility from '../Components/AddAvaibility'
import availibilityContext from '../availibilityContext'

const Appointments = () => {
  
    const context = useContext(availibilityContext);
    const {avaibility, fetchAvailibity} = context;


    const addRef = useRef();

    useEffect(() => {
        fetchAvailibity()
      // eslint-disable-next-line  
    }, [])
  
    return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <AddAvaibility ref={addRef} />
          <Box>
            <Button onClick={()=>{addRef.current.click()}} variant="contained" sx={{mt:3}}>Add Schedule</Button>
          </Box>
          <Box>
            {avaibility && avaibility.map((item, index) => (
              <Box key={index} sx={{border:"1px solid #000", p:2, mb:2, borderRadius:2}}>
                <h3>Date: {item.date}</h3>
                <p>Available Slots: {item.time}</p>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>  
    </>
  )
}

export default Appointments