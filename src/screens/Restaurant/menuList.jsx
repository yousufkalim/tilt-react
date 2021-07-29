import React from "react";
import { GridList, GridListTile, makeStyles } from "@material-ui/core";
import Dish from "./dish";

// const useStyles = makeStyles({});

const MenuList = ({ dishes, handleEdit, handleDelete }) => {
  // const classes = useStyles();

  return (
    <GridList cols={1}>
      {dishes.map((dish) => (
        <GridListTile style={{ height: "85px" }}>
          <Dish
            dish={dish}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default MenuList;
