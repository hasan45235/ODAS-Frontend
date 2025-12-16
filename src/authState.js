import { useState } from "react";
import AuthContext from "./authContext";


const AuthState = (props) => {
  
    const API_Create = "http://localhost:5000/auth/createUser"
    const API_Login = "http://localhost:5000/auth/loginUser"

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

  return (
    <AuthContext.Provider value={{ createUser , loginUser , authToken}}>
        {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;