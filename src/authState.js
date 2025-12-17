import { useState } from "react";
import AuthContext from "./authContext";


const AuthState = (props) => {
  
    const API_Create = "http://localhost:5000/auth/createUser"
    const API_Login = "http://localhost:5000/auth/loginUser"
    const API_GETUSERS = "http://localhost:5000/auth/getAllUsers"

    const [authToken, setAuthToken] = useState(null);

    const createUser = async(data) => {
       const response = await fetch(API_Create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        setAuthToken(json.authToken);
        localStorage.setItem('authToken', json.authToken);
        console.log(json, json.authToken);
    }


    
    const loginUser = async(data) => {
       const response = await fetch(API_Login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        setAuthToken(json);
        localStorage.setItem('authToken', json.authToken);
        console.log(json);
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

    const [allUsers , setAllUsers] = useState([])

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
            console.log(json)
            console.log(allUsers)

        } catch (error) {
            console.log("error",error)
        }
    }

  return (
    <AuthContext.Provider value={{ createUser , loginUser , authToken , addDoctor , fetchUsers , allUsers}}>
        {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;