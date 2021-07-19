import React from "react";
import Dish from "./Dish";
import { GridList, GridListTile, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#D20249",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#D2025a",
    },
    width: "100%",
    maxHeight: "60vh",
    flexGrow: "1",
  },
}));

const DishList = ({ dishes, handleSelect }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridList className={classes.gridList} cols={1}>
        {dishes.map((dish) => (
          <GridListTile style={{ height: "85px" }}>
            <Dish dish={dish} handleSelect={handleSelect} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default DishList;
