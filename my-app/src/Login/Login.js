import React, { useEffect } from 'react';
import './login.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

function LoginPage(props) {
    let userEmail = '';
    let password = "";
    const history = useHistory();
    function setEmail(e) {
        userEmail = e.target.value;

    }

    function setPassword(e) {
        password = e.target.value;
    }

        

    function loginGoogole(data){        
        let postData = {
            type:"google",
            accessToken: data.accessToken,
            email:data.profileObj.email,
            familyName:data.profileObj.familyName,
            firstName:data.profileObj.givenName,
            imageUrl:data.profileObj.imageUrl
        }    

        login(postData);
    }

    function loginFb(data){
         
        let postData = {
            type:"facebook",
            accessToken: data.accessToken,
            email:data.email,
            familyName:data.name.split(" ")[1],
            firstName:data.name.split(" ")[0],
            imageUrl:data.picture.data.url,
            id:data.id
        }    
 
        login(postData);
    }

    function loginLocal(){
        let obj = {
            password,
            userEmail,
           type:"local" 
        }
        login(obj);
    }

     
    function login(postData) {     
        axios.post('/api/user/login', postData).then(res => {


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

    return (
        <div className="login-page"  >
            <h1>Login page</h1>


            <div className="oauth-container">
                {/* <button id="gplus-btn">sign in with google</button>     */}
                <GoogleLogin
                    clientId="296697808375-5j5obolp97q37m75av2c9mtma29v8pj9.apps.googleusercontent.com"
                    render={renderProps => (
                        <button id="gplus-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>login with google</button>
                    )}
                    buttonText="Login"
                    onSuccess={loginGoogole}
                    onFailure={loginGoogole}
                    
                />

                <FacebookLogin
                    appId="347857763056858"                    
                    fields="name,email,picture"
                    
                    render={renderProps => (
                        <button id="fb-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Facebook Login</button>
                    )}  
                    callback={loginFb} />
            </div>


            <div className="input-box" >
                <input type="email" onChange={setEmail} placeholder="Enter email" />

                <input type="password" onChange={setPassword} placeholder="enter password" />
                <button onClick={loginLocal}>Login</button>
            </div>
        </div>
    )
}

export default LoginPage;