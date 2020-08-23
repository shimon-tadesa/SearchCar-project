import React, { useState } from "react";
import Home from "./Home/Homee";
import Registr from "./Registr/Registr";
import Login from "./Login/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import "./App.css";

import axios from "axios";

axios.interceptors.request.use(function (config) {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    config.headers.Authorization = "Bearer " + user.token;
  }

  return config;
});

function App() {
  const us = localStorage.getItem("user");
  let userFromStorage = null;
  if (us) {
    userFromStorage = JSON.parse(us);
  }
  const [user, setUser] = useState(userFromStorage);

  function userLogOut() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function getUserProfile() {
    if (user) {
      return (
        <div id="user-profie-container">
          {/* <div id="profile-img-container"> */}
            <img src={user.imageUrl} />
          <a id="logout-btn" onClick={userLogOut}>
            logout
          </a>
          {/* </div> */}
          {/* <div id="user_name"> {user.email}</div> */}
          
        </div>
      );
    }
  }

   function getNavLinks(){
     if(!user){
       return(
        <div className="links-continer">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
          </div>
       )
     }
   }
  return (
    <div className="App">
      <Router>
        <div className="app-header">
           {getUserProfile()}
           {getNavLinks()}
        </div>

       

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/register">
            <Registr onLogin={setUser} />
          </Route>

          <Route exact path="/login">
            <Login onLogin={setUser} />
          </Route>
          <Route exact path="/404">
            404 page not found
          </Route>

          <Redirect to="/404"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
