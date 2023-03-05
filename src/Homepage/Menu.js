import React from "react";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const Menu = ({ basketId, setBasketData }) => {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/menu", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMenuData(data));
  }, []);

  return (
    <div>
      <h1>Menu</h1>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {menuData ? (
            menuData["menuGroups"].map((menuGroup) =>
              menuGroup["menuItems"].map((menuItem) => {
                return (
                  <MenuItem
                    key={menuItem["id"]}
                    id={menuItem["id"]}
                    name={menuItem["name"]}
                    description={menuItem["description"]}
                    price={menuItem["price"]}
                    basketId={basketId}
                    setBasketData={setBasketData}
                  />
                );
              })
            )
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
