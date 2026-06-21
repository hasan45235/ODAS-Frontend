import { Box, Toolbar, Typography, Card, CardContent, Divider } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import SideBar from '../SideBar'
import { Outlet } from 'react-router-dom'
import Card2 from '../Card'
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LoadingSpinner from '../../LoadingSpinner'
import AuthContext from '../../authContext'
import AppointmentsContext from '../../AppointmentsContext'
import { Oval } from 'react-loader-spinner'




const InfoRow = ({ appointment, patient }) => {

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: 2, bgcolor: "background.paper", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", '&:hover': { boxShadow: "0px 0px 5px grey", transition: "0.5s", transform: 'translateY(-1px)', cursor: "pointer" } }}>
      <Typography variant="body1" color="initial">#{appointment?.receiptNum}</Typography>
      <Box>
        <Typography variant="body1" color="initial">{capitalizeFirstLetter(patient[0]?.name)}</Typography>
        <Typography variant="body1" sx={{ fontSize: "12px" }} color="text.secondary">{patient[0]?.contact}</Typography>
      </Box>
      <Typography variant="body1" color="initial">{appointment?.bookedDate}</Typography>
      <Typography variant="body1" color="initial">{appointment?.bookedSlot}</Typography>
    </Box>
  );
};





const Dashboard = () => {

  const context = useContext(AuthContext)
  const { fetchUsers, allUsers } = context


  const context2 = useContext(AppointmentsContext)
  const { fetchAllApointments, appointments, loading } = context2



  const checkUserPatient = (user) => {
    return user.role === "patient"
  }

  const checkUserDoctor = (user) => {
    return user.role === "doctor"
  }

  const checkPendingAppointments = (item) => {
    return item.status === "pending"
  }

  const allPatients = allUsers ? allUsers.filter((user) => (checkUserPatient(user))) : []

  const allDoctors = allUsers ? allUsers.filter((user) => (checkUserDoctor(user))) : []

  const pendingApp = appointments ? appointments.filter((item) => (checkPendingAppointments(item))) : []

  useEffect(() => {
    fetchUsers()
    fetchAllApointments()
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
          <Typography variant="body1" color="initial">{ }</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Card2 title='Total Patients' desc={allPatients.length} icon={<PersonIcon sx={{ fontSize: "50px", color: "#527dc7", padding: "0px 15px", margin: "auto 0px" }} />} />
            <Card2 title='Total Doctors' desc={allDoctors.length} icon={<i className="fa-solid fa-user-doctor fa-2xl" style={{ fontSize: "40px", color: "#527dc7", padding: "0px 15px", margin: "auto 0px" }} ></i>} />
            <Card2 title='Total Appointments' desc={appointments.length} icon={<ListAltIcon sx={{ fontSize: "50px", color: "#527dc7", padding: "0px 15px", margin: "auto 0px" }} />} />
            <Card2 title='Pending Approvals' desc={pendingApp.length} icon={<PendingActionsIcon sx={{ fontSize: "50px", color: "#527dc7", padding: "0px 15px", margin: "auto 0px" }} />} />
          </Box>
          <Box>
            <Card sx={{ p: 2, width: "95%", margin: "20px auto", borderRadius: 3, boxShadow: 3, bgcolor: "background.paper", }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} color="initial">Pending Requests</Typography>
                <Divider sx={{ mb: 3, mt: 3 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {loading ? (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                      <Oval height="14vh" width="14vw" color="#1976d2" visible={true} ariaLabel="oval-loading" secondaryColor="#1976d2" strokeWidth={2} strokeWidthSecondary={2} />
                    </Box>
                  ) : pendingApp.length === 0 ? (
                    <Typography sx={{ textAlign: "center" }}>No pending requests.</Typography>
                  ) : (
                    pendingApp.map((appointment) => {
                      const patient = allUsers.filter((item) => item._id === appointment.patientId)
                      return (
                        <InfoRow key={appointment._id} appointment={appointment} patient={patient} />
                      )
                    }))}
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <LoadingSpinner />
          </Box>
        </Box>
      </Box>

    </>
  )
}

export default Dashboard