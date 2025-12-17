import React from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Route , Routes, useLocation} from "react-router-dom"
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./userCheck";
import Patients from "./Pages/Patients";
import Doctors from "./Pages/Doctors";
import Profile from "./Pages/Profile";
import Controls from "./Pages/Controls";

function App() {

  const location = useLocation()

  return (
    <>
     {location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup" ? <Navbar /> : null}
     
     
     
     <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route  path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/patient" element={<Patients />} />
        <Route path="/dashboard/doctor" element={<Doctors />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/settings" element={<Controls />} />
      </Route>  
     </Routes>
     
    </>
  );
}

export default App;
