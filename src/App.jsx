import React from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Route , Routes} from "react-router-dom"
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./userCheck";

function App() {
  return (
    <>
     <Navbar />
     
     
     <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route  path="/dashboard" element={<Dashboard />} />
      </Route>  
     </Routes>
     
    </>
  );
}

export default App;
