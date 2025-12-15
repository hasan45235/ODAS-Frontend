import React from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Route , Routes} from "react-router-dom"
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <>
     <Navbar />
     
     
     <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/signup" element={<Signup />} />
     </Routes>
     
    </>
  );
}

export default App;
