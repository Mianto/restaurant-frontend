import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "./Menu";
import Basket from "./Basket";

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const Homepage = () => {
  const query = useQuery();
  const [basketId, setBasketId] = useState(null);
  const [basketData, setBasketData] = useState(null);

  return (
    <>
      <div>
        <Menu basketId={basketId} setBasketData={setBasketData} />
        <p>{query.get("table")}</p>
        <Basket
          basketId={basketId}
          setBasketId={setBasketId}
          basketData={basketData}
        />
      </div>
    </>
  );
};

export default Homepage;
