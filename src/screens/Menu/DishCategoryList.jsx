import React, { useState } from "react";
import { GridList, GridListTile, makeStyles } from "@material-ui/core";
import { ReactComponent as Dish1 } from "../../images/icons/dish1.svg";
import { ReactComponent as Dish2 } from "../../images/icons/dish2.svg";
import { ReactComponent as Dish3 } from "../../images/icons/dish3.svg";

import DishCategory from "./DishCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    cursor: "pointer",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    justifyContent: "space-between",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    flexGrow: "1",
  },
}));

const dishList = [
  {
    title: "All",
    key: "all",
    icon: (
      <Dish2
        style={{
          width: "90%",
          minWidth: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
  },
  {
    title: "Entrée",
    key: "Starter",
    icon: (
      <Dish1
        style={{
          width: "90%",
          minWidth: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
  },
  {
    title: "Plats",
    key: "Dish",
    icon: (
      <Dish2
        style={{
          width: "90%",
          minWidth: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
  },
  {
    title: "Dessert",
    key: "Dessert",
    icon: (
      <Dish3
        style={{
          width: "90%",
          minWidth: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
  },
];
const DishCategoryList = ({ handleChange, filter }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cols={4} spacing={40} className={classes.gridList}>
        {dishList.map((dish) => (
          <GridListTile style={{ height: "160px" }} key={dish.key}>
            <DishCategory
              isActive={dish.key === filter ? true : false}
              title={dish.title}
              onClick={() => handleChange(dish.key)}
            >
              {dish.icon}
            </DishCategory>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default DishCategoryList;
