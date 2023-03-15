import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Order = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (order === null) createNewOrder(ignore);
    return () => {
      ignore = true;
    };
  }, []);

  const createNewOrder = (ignore) => {
    const reqBody = {
      basketId: location.state,
    };
    console.log(reqBody);
    fetch("http://localhost:8080/api/v1/order", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!ignore) setOrder(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h2>Your Order is placed. Please Wait...</h2>
    </>
  );
};

export default Order;
