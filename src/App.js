import React from "react";
import { useLocalState } from "./util/useLocalStorage";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import "./App.css";
import Login from "./Login";
import Order from "./Order";
import PrivateRoute from "./PrivateRoute";
import SignUp from "./SignUp";
import AdminHomepage from "./AdminHomepage";
import BasketPreviewer from "./BasketPreviewer";

function App() {
  const [jwt, setJwtToken] = useLocalState("", "jwt");

  // useEffect(() => {
  //   if (!jwt) {
  //     const reqBody = {
  //       username: "siddhantshaw97@gmail.com",
  //       password: "S@1",
  //     };

  //     fetch("api/v1/auth/login", {
  //       headers: {
  //         "Content-Type": "application/json",
  //          Authorization: `Bearer ${jwt}`
  //       },
  //       body: JSON.stringify(reqBody),
  //       method: "post",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setJwtToken(data.token);
  //       });
  //   }
  // });

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/basketPreviewer" element={<BasketPreviewer />} />

      <Route
        path="/order"
        element={
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminHomepage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
