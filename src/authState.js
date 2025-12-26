import { useEffect, useState } from "react";
import AuthContext from "./authContext";
import {  useNavigate } from "react-router-dom";


const AuthState = (props) => {
  
    const API_Create = "http://localhost:5000/auth/createUser"
    const API_Login = "http://localhost:5000/auth/loginUser"
    const API_GETUSERS = "http://localhost:5000/auth/getAllUsers"
    
    const [authToken, setAuthToken] = useState({token:null,role:null,isLoading: true});
    
    const [allUsers , setAllUsers] = useState([])
    
    

    
    useEffect(()=>{
        const token = localStorage.getItem('authToken')
        const role = localStorage.getItem('userRole')
        setAuthToken({ token, role, isLoading: false });
    },[])

    const createUser = async(data) => {
      try {
       const response = await fetch(API_Create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        console.log("User added successfully",json)
        if(response.ok){
                
                signup(json.authToken, data.role);
                
                switch (data.role) {
                  case 'admin':
                    navigate('/admin/dashboard');
                    break;
                  case 'doctor':
                    navigate('/doctor/dashboard');
                    break;
                  case 'patient':
                    navigate('/patient/dashboard');
                    break;
                  default:
                    navigate('/dashboard');
                  }
                                
            }else {
              console.log(json.message);
            }
      } catch (error) {           
           console.log("error",error)
      } 
    }

    const login = (token, role) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      setAuthToken({ token, role, isLoading: false });
    };

    
    const signup = (token, role) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      setAuthToken({ token, role, isLoading: false });
    };


    const navigate = useNavigate();
    
    const loginUser = async(data) => {

       try {
        
           const response = await fetch(API_Login, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            console.log(json)
            if(response.ok){
                
                login(json.authToken, json.role);
                
                switch (json.role) {
                  case 'admin':
                    navigate('/admin/dashboard');
                    break;
                  case 'doctor':
                    navigate('/doctor/dashboard');
                    break;
                  case 'patient':
                    navigate('/patient/dashboard');
                    break;
                  default:
                    navigate('/dashboard');
                  }
                                
            }else {
              console.log(json.message);
            }
        } catch (error) {           
           console.log("error",error)
        } 
    }

    const logout = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      setAuthToken({ token: null, role: null, isLoading: false });
      navigate('/login');
    }

    const addDoctor = async (data) =>{
        try {
            const response = await fetch(API_Create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            console.log("Doctor Added Successfully :",json);
        } catch (error) {
            console.log("error",error)
        }
    }


    const fetchUsers = async () => {
        try {
            const response = await fetch(API_GETUSERS,{
                method:"GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            setAllUsers(json)
        } catch (error) {
            console.log("error",error)
        }
    }

    const [currentUser , setCurrentUser] = useState(null);

    const fetchCurrentUser = async () => {
      try {
          const response = await fetch("http://localhost:5000/auth/getUser",{
              method:"GET",
              headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('authToken')
              }
          })
          const json = await response.json()
          setCurrentUser(json);
      } catch (error) {
          console.log("error",error)
      }
  }

  return (
    <AuthContext.Provider value={{ createUser , loginUser , authToken , addDoctor , fetchUsers , allUsers , logout , currentUser , fetchCurrentUser}}>
        {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;