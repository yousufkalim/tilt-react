import { makeStyles, Box, Typography, IconButton } from "@material-ui/core";
import React from "react";
import DishImg from "../../images/Dish.png";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";
import { BsFillPlusCircleFill } from "react-icons/bs";

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "5px 10px",
  margin: "auto",
};

const useStyles = makeStyles({
  iconBtn: {
    "&:focus": {
      outline: "none",
    },
  },
});

const Dish = ({ dish, handleSelect }) => {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_API_URL;

  return (
    <>
      <Box
        display="flex"
        width="80%"
        justifyContent="space-between"
        alignItems="center"
        style={cardStyle}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <img
              style={{ height: "60px", width: "60px", borderRadius: "50%" }}
              src={`${baseUrl}/${dish.image}`}
              alt="dish"
            />
          </Box>
          <Box paddingLeft="10px">
            <Typography variant="body1" color="initial">
              {dish.name}
            </Typography>
            <Typography variant="caption" color="initial">
              <RestaurantIcon /> &nbsp; {dish.restaurantName}
            </Typography>
          </Box>
        </Box>
        <Box paddingLeft="10%">
          <Typography variant="body1" color="initial">
            <b>{dish.price}€</b>
          </Typography>
        </Box>

        <IconButton
          onClick={() => handleSelect(dish._id)}
          className={classes.iconBtn}
        >
          <BsFillPlusCircleFill
            style={{ color: "#C72E54", fontSize: "35px" }}
          />
        </IconButton>
      </Box>
    </>
  );
};

export default Dish;
