import React from "react";
import { useState } from "react";

const MenuItem = ({
  id,
  name,
  description,
  price,
  basketId,
  setBasketData,
}) => {
  const [quantity, setQuantity] = useState(0);

  const makeBasketCall = (tempQuantity) => {
    const reqBody = {
      itemId: id,
      quantity: tempQuantity,
    };
    console.log(reqBody);
    fetch(`http://localhost:8080/api/v1/basket/${basketId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return Promise.reject("Not able to do basket operations.");
      })
      .then((data) => {
        setBasketData(data);
        setQuantity(tempQuantity);
      })
      .catch((message) => {
        console.log(message);
      });
  };

  const deleteFromBasket = () => {
    if (quantity >= 1) {
      makeBasketCall(quantity - 1);
    }
  };

  const addToBasket = () => {
    makeBasketCall(quantity + 1);
  };

  return (
    <>
      <tr key={id}>
        <td>{name}</td>
        <td>{description}</td>
        <td>{price}</td>
        <td>
          <button onClick={() => addToBasket()}> + </button>
          {quantity}
          <button onClick={() => deleteFromBasket()}> - </button>
        </td>
      </tr>
    </>
  );
};

export default MenuItem;
