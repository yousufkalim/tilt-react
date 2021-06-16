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
    title: "Entrée",
    icon: <Dish1 style={{ height: "40px" }} />,
  },
  {
    title: "Plat",
    icon: <Dish2 style={{ height: "40px" }} />,
  },
  {
    title: "Dessert",
    icon: <Dish3 style={{ height: "40px" }} />,
  },
  {
    title: "Dessert",
    icon: <Dish3 style={{ height: "40px" }} />,
  },
  {
    title: "Dessert",
    icon: <Dish3 style={{ height: "40px" }} />,
  },
];
const DishCategoryList = () => {
  const [isActive, setIsActive] = useState(false);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cols={3} spacing={100} className={classes.gridList}>
        {dishList.map((dish) => (
          <GridListTile style={{ height: "200px" }}>
            <DishCategory
              isActive={isActive}
              title={dish.title}
              onClick={() => setIsActive(!isActive)}
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
