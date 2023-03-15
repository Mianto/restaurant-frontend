import React from "react";

const BasketSummary = ({ basketData }) => {
  return (
    <>
      <h3>
        BasketTotal : ₹<b>{basketData ? <>{basketData["totalPrice"]}</> : 0}</b>
      </h3>
    </>
  );
};

export default BasketSummary;
