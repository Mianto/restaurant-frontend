import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";

const AdminHomepage = () => {
  const navigate = useNavigate();
  const [jwt, setJwtToken] = useLocalState("", "jwt");
  const [orderData, setorderData] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch("http://localhost:8080/api/v1/admin/order", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "get",
    })
      .then((response) => {
        if (response.status !== 200) {
          navigate("/login", {
            state: { message: "Please login with admin credentials" },
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (!ignore) setorderData(data);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <h1>Admin Homepage</h1>
    </>
  );
};

export default AdminHomepage;
