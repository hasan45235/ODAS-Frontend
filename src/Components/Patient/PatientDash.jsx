import { Backdrop, Box, Fade, Modal, Toolbar, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../SideBar'
import DashCard from '../Card'
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddAppointment from './AddAppointment'
import MyAppointments from './MyAppointments'
import AppointmentsContext from '../../AppointmentsContext'
import AuthContext from '../../authContext'



const Style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",

  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
};





const PatientDash = () => {

  const [btnState, setBtnState] = useState("")

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const context2 = useContext(AppointmentsContext)
  const { fetchPatAppointments, specificAppointments } = context2

  const contextAuth = useContext(AuthContext)
  const { fetchCurrentUser, currentUser } = contextAuth

  const todayDate = new Date().toLocaleDateString("en-GB");
  const todayApp = specificAppointments.filter((item) => item.bookedDate === todayDate)


  const completedApp = specificAppointments.filter((item) => item.status === "completed")

  useEffect(() => {
    fetchPatAppointments()
    if (fetchCurrentUser) {
      fetchCurrentUser()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {currentUser?.status === "inactive" ? (
        <Box sx={{ display: "flex" }}>
          <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h5" color="error" sx={{ fontWeight: "bold" }}>
                Account Inactive
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Reason: {currentUser?.inactiveReason || "No reason provided"}
              </Typography>
              <Typography sx={{ mt: 2, color: "gray" }}>
                Please contact admin to reactivate your account.
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <DashboardSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px", pb: 3 }}>
              <Button variant="contained" color="primary" onClick={() => { handleOpen(); setBtnState("Book Appointment") }}>Book New Appointment</Button>
              <Button variant="contained" color="primary" onClick={() => { handleOpen(); setBtnState("My Appointments") }}>View My Appointments</Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <DashCard title='Upcoming Appointments' desc={todayApp.length} icon={<PendingActionsIcon sx={{ fontSize: "50px", color: "#527dc7", padding: "0px 15px", margin: "auto 0px" }} />} />
              <DashCard title='Total Appointments' desc={specificAppointments.length} icon={<ListAltIcon sx={{ fontSize: "50px", color: "#527dc7", padding: "0px 15px", margin: "auto 0px" }} />} />
              <DashCard title='Completed Appointments' desc={!completedApp ? 0 : completedApp.length} icon={<OfflinePinIcon sx={{ fontSize: "50px", color: "#527dc7", padding: "0px 15px", margin: "auto 0px" }} />} />
            </Box>

          </Box>
          <Box >
            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{ backdrop: { timeout: 400 } }}>
              <Fade in={open}>
                <Box sx={Style}>
                  <Box sx={{ maxHeight: "80vh", overflowY: "scroll", p: 3 }}>
                    {btnState === "Book Appointment" ? <AddAppointment close={() => setOpen(false)} modal="modal" /> : <MyAppointments btnState={btnState} />}
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Box >
      )}
    </>
  );
}

export default PatientDash