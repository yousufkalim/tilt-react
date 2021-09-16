import React from "react";
import { GridList, GridListTile } from "@material-ui/core";
import Dish from "./dish";

const MenuList = ({ dishes, handleEdit, handleDelete, handleDishStatus }) => {
  return (
    <GridList cols={1}>
      {dishes.map((dish) => (
        <GridListTile style={{ height: "85px" }}>
          <Dish
            dish={dish}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDishStatus={handleDishStatus}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default MenuList;
