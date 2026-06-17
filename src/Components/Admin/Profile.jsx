import { Box, Toolbar, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../SideBar'
import AuthContext from '../../authContext'

const Profile = () => {

  const context = useContext(AuthContext)
  const { currentUser , fetchCurrentUser} = context


  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashboardSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <Box>
            {currentUser && (
              <Box style={{border:"1px solid black", margin:"10px", padding:"10px", borderRadius:"5px", maxWidth:"600px"}}>
                <Box component="h2">Profile Details</Box>
                <Typography component="p"><strong>Name:</strong> {currentUser?.name}</Typography>
                <Typography component="p"><strong>Email:</strong> {currentUser?.email}</Typography>
                <Typography component="p"><strong>Phone:</strong> {currentUser?.contact}</Typography>
                <Typography component="p"><strong>Role:</strong> {currentUser?.role}</Typography>
                <Typography component="p"><strong>Address:</strong> {currentUser?.address}</Typography>
                <Typography component="p"><strong>Age:</strong> {currentUser?.age}</Typography>
                <Typography component="p"><strong>Gender:</strong> {currentUser?.gender}</Typography>

              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>

  )
}

export default Profile