import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import BasketSummary from "./BasketSummary";

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const Homepage = () => {
  const query = useQuery();
  const location = useLocation();
  const navigate = useNavigate();

  const [basketId, setBasketId] = useState(
    location.state ? location.state.id : null
  );
  const [basketData, setBasketData] = useState(
    location.state ? location.state : null
  );

  useEffect(() => {
    let ignore = false;
    if (basketId === null) fetchNewBasket(ignore);
    return () => {
      ignore = true;
    };
  }, []);

  const fetchNewBasket = (ignore) => {
    fetch("http://localhost:8080/api/v1/basket", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) setBasketId(data["basketId"]);
      })
      .catch((error) => console.error(error));
  };

  const previewBasket = () => {
    navigate("/basketPreviewer", { state: basketData });
  };

  // const refreshBasket = () => {
  //   fetchNewBasket(false);
  //   setBasketData(null);
  // };

  return (
    <>
      <div>
        <Menu
          basketId={basketId}
          basketData={basketData}
          setBasketData={setBasketData}
        />
        <BasketSummary basketData={basketData} />

        <br />
        <button onClick={() => previewBasket()}>Preview Basket</button>
        {/* <button onClick={() => refreshBasket()}>Refresh Basket</button> */}
        <p>{query.get("table")}</p>
        <p>{basketId}</p>
      </div>
    </>
  );
};

export default Homepage;
