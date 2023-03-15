import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [jwtToken, setJwtToken] = useLocalState("", "jwt");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginRequest = (e) => {
    e.preventDefault();
    const reqBody = {
      username,
      password,
    };
    fetch("http://localhost:8080/api/v1/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("Invalid login attempt");
      })
      .then((data) => {
        setJwtToken(data.token);
        navigate(-1);
      })
      .catch((message) => {
        alert(message);
      });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      {location.state ? location.state.message : <></>}
      <form onSubmit={sendLoginRequest}>
        <div>
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <input id="Submit" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default Login;
