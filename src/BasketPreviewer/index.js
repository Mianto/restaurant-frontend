import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BasketPreviewer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const placeOrder = () => {
    if (location.state) navigate("/order", { state: location.state.id });
  };

  const navigateBack = () => {
    navigate("/", { state: location.state });
  };

  return (
    <>
      <button onClick={() => navigateBack()}>Go back</button>
      <h1>Basket Preview</h1>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Item Total</th>
          </tr>
        </thead>
        <tbody>
          {location.state ? (
            location.state["basketItems"]
              .filter((item) => item.quantity !== 0)
              .map((basketItem) => {
                return (
                  <tr key={basketItem.id}>
                    <td>{basketItem.menuItem.name}</td>
                    <td> {basketItem.quantity} </td>
                    <td> ₹{basketItem.menuItem.price} </td>
                    <td> ₹{basketItem.basketItemTotal} </td>
                  </tr>
                );
              })
          ) : (
            <></>
          )}
        </tbody>
      </table>

      <div>
        <h3>
          Basket Total : ₹{location.state ? location.state["totalPrice"] : 0}
        </h3>
      </div>
      <button onClick={() => placeOrder()}> Place Order </button>
    </>
  );
};

export default BasketPreviewer;
