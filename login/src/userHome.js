import React from 'react';
import './userHome.css';
import {useNavigate} from 'react-router-dom';


function UserHome() {
    
    const navigate=useNavigate();
  return (
        <div>
        <button  className='logout'
            onClick= {() => {
              localStorage.setItem("accessToken","")
              navigate("/login");
            }}>logout
        </button>  
        </div>
        
  )
}

export default UserHome