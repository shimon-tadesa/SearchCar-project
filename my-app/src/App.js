import React, { useState } from 'react';
import Home from "./Home/Homee";
import Registr from './Registr/Registr';
import Login from './Login/Login';
 

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import './App.css';

import axios from "axios";

axios.interceptors.request.use(function (config) {
  let user = localStorage.getItem("user");
  if(user){
    user =  JSON.parse(user);
    config.headers.Authorization = "Bearer "+ user.token;
  }     
    
    return config;
});

function App(){

const us = localStorage.getItem("user");
let userFromStorage = {};
if(us){
  userFromStorage =  JSON.parse(us);
}
  const [user,setUser] = useState(userFromStorage );

  function userLogOut(){
    localStorage.removeItem('user')
    document.getElementById('userExist').innerText = '';
  }
  
     
    return (
      <div className="App">
    <Router>
      <div className="links">
      <Link to='/register'>Registr</Link>
      <Link to='/login'>Login</Link>
      </div>
        <div id="">
         <span> {user.userEmail}</span><br/>
        <button onClick={userLogOut}>Log Out</button>
      </div>
         
        <Switch>
          <Route exact  path="/" >
               <Home />
          </Route>
          
          <Route exact  path="/register" >
               <Registr onLogin={setUser}  />
          </Route>

          <Route exact  path="/login" >
               <Login onLogin={setUser}  />
          </Route>
          <Route  exact  path="/404">
               404 page not found
          </Route>

          <Redirect to="/404">

          </Redirect>
           
          
        </Switch>
        
    </Router>


    
    
    </div>
  );
}


export default App;
