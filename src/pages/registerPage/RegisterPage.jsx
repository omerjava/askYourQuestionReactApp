import React, { useState } from "react";
import { authApiCall } from "../../api-calls/auth-api-calls";
import "./RegisterPage.css"
import { useNavigate } from "react-router-dom";


function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorRegister, setErrorRegister] = useState('');

  const navigate = useNavigate();

  const registerHandle = (e, username, password) => {
    e.preventDefault();

    if(!username || !password) {
      setErrorRegister('Invalid or missing input!'); 
      return;
    }

    const response = authApiCall.register(username, password);

    response.then((res) => {
     if(res.ok) {
       setUsername('');
       setPassword('');
       navigate("/login");
       setErrorRegister('');
       return;
      }
     else { 
      setErrorRegister('Sorry! We could not register you! Please try again!');
      return;    
    }
    }).catch((err) => setErrorRegister(err.message));

  }



  return (
    <div className="register">
      <form onSubmit={(e) => registerHandle(e, username, password)}>
        <h2>Register</h2>
        <div>
          <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
        </div>
        <div>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
        {errorRegister}
      </form>
      
    </div>
  );
}

export default RegisterPage;
