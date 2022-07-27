import React, { useState } from 'react'
import { authApiCall } from '../../api-calls/auth-api-calls';
import './LoginPage.css'
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { useNavigate } from "react-router-dom";
import { newExpirationDate } from '../../logic/getToken';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');

    const { setLoggedIn, setUsernameLoggedIn } =
    useContext(AllContext);

    const navigate = useNavigate();

    const loginHandle = (e, username, password) => {
        e.preventDefault();
        
        if(!username || !password) {
            setErrorLogin('Invalid or missing input!'); 
          return;
        }
    
        const response = authApiCall.login(username, password);
    
        response.then((res) => {
         if(res.ok) {
           setUsername('');
           setPassword('');
           setErrorLogin('');
           return res.json();
          }
         else setErrorLogin('Sorry! We could not login you! Please try again!');
        }).then((data) => {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("expirationDate", newExpirationDate());
            const token = localStorage.getItem("accessToken");
            if (token) {
              setLoggedIn(true);
              setUsernameLoggedIn(data.userName);
              navigate("/");
            };
          }).catch((err) => setErrorLogin(err.message));
    
      }

  return (
    <div className='login'>
        <form onSubmit={(e) => loginHandle(e, username, password)}>
            <h2>Login</h2>
            <div>
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            <div>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div>
                <input type="submit" value="Submit" required/>
            </div>
            {errorLogin}
        </form>
    </div>
  )
}

export default LoginPage