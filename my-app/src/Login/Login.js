import React, {useEffect} from 'react';
import './login.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function LoginPage(props){
 let userEmail = '';
 let password = "";
 const history = useHistory();
    function setEmail(e){
        userEmail = e.target.value;

    }

    function setPassword(e){
        password = e.target.value;
    }
    

     function Login(){
         let obj = {
             password ,
             userEmail
         }


         
        axios.post('/api/user/login', obj).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));  
            props.onLogin(res.data);           
            history.push("/");
        }).catch(function (error) {
            console.log("error getting data");
        });
 

     }

useEffect(() => {
    localStorage.removeItem('user');
     
}, [])

    return(
        <div className="login-page"  >
            <h1>Login page</h1>
            <div className="input-box" >
            <input type="email" onChange={setEmail} placeholder="Enter email"/>

            <input type="password" onChange={setPassword}  placeholder="enter password"/>
            <button onClick={Login}>Login</button>
           </div>
        </div>
    )
}

export default LoginPage;