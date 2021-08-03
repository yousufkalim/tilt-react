import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import DishList from "./DishList";

const useStyles = makeStyles({
  list: { maxWidth: "400px", height: "420px" },
});

const RestaurantMenuModal = ({ selectedDish, allDishes, handleDishSelect }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">
        <b>{selectedDish.restaurantName}</b>
      </Typography>

      <div className={classes.list}>
        <DishList dishes={allDishes} handleSelect={handleDishSelect} />
      </div>
    </div>
  );
};

export default RestaurantMenuModal;
