import './Login.css';
import React from 'react';
import userPic from '../src/userpic.svg';
import { useState } from 'react';
import { Link,useNavigate} from "react-router-dom";

function Login ()  {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()


  async function handleSubmit(e)  {
    e.preventDefault();
    
    const response = await fetch('http://localhost:3000/login',{
       method: "POST",
       headers:{
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
       },
       body: JSON.stringify({
        email,
        password,
       }),
    });

    const data = await response.json();
    console.log(response, data)
    if(data.user) {
      localStorage.setItem("accessToken",data.user);
      alert("Login successful");
      localStorage.setItem("token", data.data);
      if(data.userType =="Admin")
      navigate("/home");
    else navigate("/user/home")
    } else {
      alert("Please check your username and password");
    }
  }


  return (
   <div className="Main">
    <div className='Left'>
       <div className='img'>
       <img src={userPic} alt="user_img" className="userImg" />
       </div>
       <div className='heading'>
        <h1>Welcome to your Dashboard</h1>
       </div>
    </div>
    <div className='Right'>
      <div className='RightContainer'>
        <div className='heading2'>
         <h3>Login The Account</h3>
        </div>
        <form action="" onSubmit={handleSubmit} className="loginForm">

          <div>
            <input 
            type="text" 
            autoComplete="off" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email" 
            placeholder="Email" 
            id="email"/>
          </div>

          <div>
            <input 
            type="password" 
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password" 
            placeholder="Password" 
            id="password"/>
          </div>
          
          <button type="submit" className="loginButton">
           Login
          </button>
          <br></br>
          New User ? <Link to="/" className='register' >
            Register
          </Link>
        </form>
        
      </div>
    </div>
  </div>

  )
}

export default Login;