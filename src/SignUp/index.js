import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

const SignUp = () => {
  const [jwtToken, setJwtToken] = useLocalState("", "jwt");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      firstName,
      lastName,
      email,
      password,
    };
    fetch("http://localhost:8080/api/v1/auth/signUpCustomer", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      method: "post",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject(response.json());
      })
      .then((data) => {
        setJwtToken(data.token);
        window.location.href = "/order";
      })
      .catch((errorResponse) => {
        window.location.href = "/login";
      });
  };
  return (
    <>
      <div>SignUp</div>
      <form onSubmit={onSignUpFormSubmit}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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

export default SignUp;
