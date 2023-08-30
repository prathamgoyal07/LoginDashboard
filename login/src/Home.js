import React from 'react'
import './Style.css'
import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


function Home() {
    const api_url = process.env.REACT_APP_API_URL
    console.log(api_url);
   const navigate = useNavigate();
   const [openForm, setOpenForm] = useState(false);
 
  const [cruds, setCruds] = useState([])
  useEffect(() => {
      fetchcruds()
  }, [])

  
  const fetchcruds = async () => {
      try{
          const response = await fetch(`${api_url}/getallcrud`);
          const data = await response.json()
          console.log(data)
          setCruds(data.cruds)
      }
      catch(error){
          console.log(error)
      }
  }

  const deletecrud = async (id) => {
   try{
     const response = await fetch(`${api_url}/deletecrud/${id}`,{
      method: "DELETE"
     })
     const data = await response.json()
     alert(data.message)
     fetchcruds()
   }
   catch(error){
    console.log(error)

   }
  }

  const [newCrud, setNewCrud] = useState ({
    name:"",
    email:"",
    password:"",
    userType: "",
  })

  const createCrud = async (e) => {
    if(newCrud.name === ""){
      alert("name is required")
    }
    e.preventDefault()
    try {
      const response = await fetch(`${api_url}/createcrud`, {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newCrud)
      })
      const data = await response.json()
      alert(data.message)
      fetchcruds()
    }
    catch(error){
      console.log(error)
    }
    
  }
  return (
    <div className='main'>
        <div className='head'><h1 className='allData'>WELCOME ADMIN</h1>
        <button  className='logout1'
            onClick= {() => {
              localStorage.setItem("accessToken","")
              navigate("/login");
            }}>Logout</button> </div>
        <h1 className='ExistingUser'>Existing Users</h1>
        {
          cruds.map((crud) => {
            return (
              <div className='userData' key={crud._id}>
              <h3 className='id'>{crud.name}</h3>
              <h3 className='email'>{crud.email}</h3>
              {/* <h3>{crud.password}</h3> */}
              

              <button className='delete'
              onClick={() => deletecrud (crud._id)}>
                Delete</button>
              <br></br>
              <br></br>

              
              </ div>
            )
          })
        }
        <button  onClick={() => {
            setOpenForm(true);
        }} className='createData'>Create Data (+)</button>
        {openForm == true ? (
              <form className='form'>
                <input type="text" placeholder='Name' 
                onChange={(e) => setNewCrud ({
                  ...newCrud,
                  name : e.target.value
                })}/>
                <br></br>
                <input type="text" placeholder='Email' 
                 onChange={(e) => setNewCrud ({
                  ...newCrud,
                  email : e.target.value
                })}/>
                <br></br>
                <input type="password" placeholder='Password'
                 onChange={(e) => setNewCrud ({
                  ...newCrud,
                  password: e.target.value
                })} />
                <br></br>
                <input type="text" placeholder='userType'
                 onChange={(e) => setNewCrud ({
                  ...newCrud,
                  userType: e.target.value
                })} />
                <br></br>
                <button className='create'
                onClick={createCrud}>Create</button>
              </form>
        ) : null};
        
       </div>
  )
}

export default Home