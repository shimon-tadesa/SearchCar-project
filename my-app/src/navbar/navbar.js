import React from 'react';
import './navbar.css';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

function NavBar(props){
    const user = props.user;
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

    function userLogOut() {
        props.onLogout(); 
      }  

  



  function getUserProfile() {
    if (user) {
      return (
        <div id="user-profie-container">
            <img src={user.imageUrl} />
          <a id="logout-btn" onClick={userLogOut}>
            logout
          </a>
        </div>
      );
    }
  }

    return(
        <div className="header">
             {getNavLinks()}
            { getUserProfile()}
        </div>
    )
}


export default NavBar;