import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';


function Registr(props) {
    let email = "";
    let password = "";
    const history = useHistory();

    const setEmail = e =>{email = e.target.value;}
    const setPassword = e =>{ password = e.target.value;}
     

    
    function registrUser() {
        let obj = {
            type:"local",
            password,
            email
        }

        axios.post('/api/user/register', obj).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));   
            props.onLogin(res.data);          
            history.push("/");
        }).catch(function (error) {
            console.log("error getting data");
        });


    }
    return (
        <div className="Registr-page">
        
            <h1>Registr Page</h1>
            <div className="input-box" >
                <input type="email" required="required" placeholder="Email"
                    onChange={setEmail} />
                <br />
                <input type="password" required="required" placeholder="Password"
                    onChange={setPassword} />

                <button onClick={registrUser}>send</button>
            </div>
 
         </div>
    )
}

export default Registr;