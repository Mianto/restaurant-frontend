import React from "react";
import { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import MenuItem from "./MenuItem";

const Menu = ({ basketId, basketData, setBasketData }) => {
  const [menuData, setMenuData] = useLocalState(null, "menu");
  // const [menuData, setMenuData] = useLocalState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/menu", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMenuData(data))
      .catch((error) => console.log(error));
  }, []);

  const getQuantityForMenuItem = (menuItemId) => {
    let tempQuantity = 0;

    if (basketData) {
      basketData["basketItems"].forEach((basketItem) => {
        if (basketItem["menuItem"]["id"] === menuItemId) {
          tempQuantity = basketItem["quantity"];
        }
      });
    }
    return tempQuantity;
  };

  return (
    <div>
      <h1>Menu</h1>
      {menuData ? (
        menuData["menuGroups"].map((menuGroup) => {
          return (
            <div key={menuGroup["id"]}>
              <h3>
                {menuGroup["name"]} -
                <span style={{ fontWeight: "normal" }}>
                  {menuGroup["description"]}
                </span>
              </h3>

              <table>
                <tbody>
                  {menuGroup["menuItems"].map((menuItem) => {
                    return (
                      <MenuItem
                        key={menuItem["id"]}
                        id={menuItem["id"]}
                        name={menuItem["name"]}
                        description={menuItem["description"]}
                        price={menuItem["price"]}
                        basketId={basketId}
                        setBasketData={setBasketData}
                        passedQuantity={getQuantityForMenuItem(menuItem["id"])}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Menu;
