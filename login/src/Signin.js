import './Signin.css';
import userPic from '../src/userpic.svg';
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Signin() {
      const [name, setName] = useState();
      const [password, setPassword] = useState();
      const [email, setEmail] = useState();
      const [userType, setUserType] = useState(); 
      const [SecretKey, setSecretKey] = useState(); 
      const navigate = useNavigate()
        
      async function registerUser(e) {
        if(userType == "Admin" && SecretKey != "Admin"){
          e.preventDefault();
          alert("Invalid Admin");
        }else{
          e.preventDefault();
        
        const response = await fetch ("http://localhost:3000/register",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                userType,
            }),
        });

        const data = await response.json();

        if(data.status === "ok") {
            alert("Successfully Registered");
            navigate("/login");
        } else {
            alert("data.error");
        }
        // console.log(data);
      }  
    };
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
           <h3>Register for new Account</h3>
          </div>
          <form action="" onSubmit={registerUser} className="loginForm">
            <div className='RadioButton'>
              Register As
              <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
              />
              User
              <input 
               type="radio"
               name="UserType"
               value="Admin"
               onChange={(e) => setUserType(e.target.value)}
              />
              Admin
            </div>
            {userType == "Admin" ? (
            <div>
              <input 
              type="text" 
              autoComplete="off" 
              value={SecretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              name="secretkey" 
              placeholder="Enter SecretKey"
              id="secretkey"
              />
            </div>
            ) : null}

            <div>
              <input 
              type="text" 
              autoComplete="off" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name" 
              placeholder="Enter Name"
              id="name"
              />
            </div>

            <div>
              <input 
              type="email" 
              autoComplete="off" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}    
              name="email" 
              placeholder="Enter Email"
              id="email"
              />
            </div>

            <div>
              <input 
              type="password" 
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password" 
              placeholder="Enter Password"
              id="password"
              />
            </div>
            
            <button type="submit" className="SigninButton">
            Sign Up
            </button>
          </form>
            Already Have Account ? <Link to="/login"> Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signin;