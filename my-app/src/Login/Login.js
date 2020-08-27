import React, { useEffect } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { useGoogleLogin } from "react-google-login";

function LoginPage(props) {
  let email = "";
  let password = "";
  const history = useHistory();

  const setEmail = (e) => {
    email = e.target.value;
  };
  const setPassword = (e) => {
    password = e.target.value;
  };

  function loginGoogole(data) {
    let postData = {
      type: "google",
      accessToken: data.accessToken,
    };

    login(postData);
  }

  function loginFb(data) {
    let postData = {
      type: "facebook",
      accessToken: data.accessToken,
      id: data.id,
    };

    login(postData);
  }
  const { signIn } = useGoogleLogin({
    onSuccess: loginGoogole,
    onFailure: loginGoogole,
    clientId:
      "296697808375-5j5obolp97q37m75av2c9mtma29v8pj9.apps.googleusercontent.com",
  });

  function loginLocal() {
    let obj = {
      password,
      email,
      type: "local",
    };
    login(obj);
  }

  function login(postData) {
    axios
      .post("/api/user/login", postData)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        props.onLogin(res.data);
        history.push("/");
      })
      .catch(function (error) {
        console.log("error getting data");
      });
  }

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <div className="login-page">
      <h1>Login page</h1>

      <div className="oauth-container">
        <button id="gplus-btn" onClick={signIn}>
          Login With Google
        </button>

        <FacebookLogin
          appId="347857763056858"
          fields="name,email,picture"
          textButton="Login With Facebook"
          cssClass="fb-btn"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Facebook Login{" "}
            </button>
          )}
          callback={loginFb}
        />
      </div>
      <div>Or</div>
      <div className="input-box">
        Local login
        <input type="email" onChange={setEmail} placeholder="Enter email" />
        <input
          type="password"
          onChange={setPassword}
          placeholder="enter password"
        />
        <button onClick={loginLocal}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
