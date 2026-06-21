import { useEffect, useState } from "react";
import AuthContext from "./authContext";
import {  useNavigate } from "react-router-dom";


const AuthState = (props) => {
  
    const API_Create = "https://odas-backend.vercel.app/auth/createUser"
    const API_Login = "https://odas-backend.vercel.app/auth/loginUser"
    const API_GETUSERS = "https://odas-backend.vercel.app/auth/getAllUsers"
    const API = "https://odas-backend.vercel.app"
    
    const [authToken, setAuthToken] = useState({token:null,role:null,isLoading: true});
    
    const [allUsers , setAllUsers] = useState([])
    
    const [loading,setLoading] = useState(true)
    
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
        console.log(json)
        if(json.error){
          return  json
        }  
        // eslint-disable-next-line
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
            if(json.error){
              return  json
            }  
            // eslint-disable-next-line
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
    
    const updateUser = async (data) =>{
        try {
            const response = await fetch(`${API}/auth/updateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            if (response.ok){
              console.log("User Updated Successfully :",json);
            }
            else{
              console.log("Failed to update user:", json);
            }
        } catch (error) {
            console.log("error",error)
        }
    }

    
      const fetchUsers = async () => {
        try {
            const response = await fetch(API_GETUSERS,{
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json()
            if (response.ok){
              setLoading(false)
            }
            setAllUsers(json)
        } catch (error) {
            console.log("error",error)
        }
      }
    
      const adminUpdateUser = async(data, id) => {
        try {
            const response = await fetch(`${API}/auth/updateUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            if (response.ok){
              console.log("User Updated Successfully :",json);
              fetchUsers();
            }
            else{
              console.log("Failed to update user:", json);
            }
        } catch (error) {
            console.log("error",error)
        }
    }

    const [currentUser , setCurrentUser] = useState(null);

    const fetchCurrentUser = async () => {
      try {
          const response = await fetch("https://odas-backend.vercel.app/auth/getUser",{
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
    <AuthContext.Provider value={{ createUser , loginUser , authToken , fetchUsers , allUsers , logout , currentUser , fetchCurrentUser , updateUser, loading, adminUpdateUser}}>
        {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;