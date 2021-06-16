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
    height: "60vh",
    flexGrow: "1",
  },
}));

const DishList = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridList className={classes.gridList} cols={1} spacing={1}>
        <GridListTile style={{ height: "85px" }}>
          <Dish></Dish>
        </GridListTile>
        <GridListTile style={{ height: "85px" }}>
          <Dish></Dish>
        </GridListTile>
        <GridListTile style={{ height: "85px" }}>
          <Dish></Dish>
        </GridListTile>
        <GridListTile style={{ height: "85px" }}>
          <Dish></Dish>
        </GridListTile>
        <GridListTile style={{ height: "85px" }}>
          <Dish></Dish>
        </GridListTile>
        <GridListTile style={{ height: "85px" }}>
          <Dish></Dish>
        </GridListTile>
      </GridList>
    </div>
  );
};

export default DishList;
