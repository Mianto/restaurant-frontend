import React from "react";
import { useEffect } from "react";

const Basket = ({ basketId, setBasketId, basketData }) => {
  useEffect(() => {
    if (basketId === null) {
      fetch("http://localhost:8080/api/v1/basket", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setBasketId(data["basketId"]);
        });
    }
  }, []);

  return (
    <>
      <h3>Basket</h3>
      BasketTotal : ₹<b>{basketData ? <>{basketData["totalPrice"]}</> : 0}</b>
    </>
  );
};

export default Basket;
