import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login';
import Signin from './Signin';
import Home from './Home';
import UserHome from './userHome';

function Main() {
  return (
      <BrowserRouter>
        <Routes>
           <Route path='/login' element={<Login />}></Route>
           <Route path='/' element={<Signin />}></Route>
           <Route path='/home' element={<Home />}></Route>
           <Route path='/user/home' element={<UserHome />}></Route>

        </Routes>
      </BrowserRouter> 
  )
}

export default Main;
