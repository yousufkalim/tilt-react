import { makeStyles, Box, Typography, IconButton } from "@material-ui/core";
import React from "react";
import DishImg from "../../images/Dish.png";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";
import { BsFillPlusCircleFill } from "react-icons/bs";
import fire from "../../images/icons/fire.png";
import { baseUrl } from "../../config";

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "10px 11%",
  margin: "auto",
  marginTop: "10px",
};
const cardStyle2 = {
  backgroundColor: "#fff",
  borderRadius: "0px",
  padding: "14px 11%",
  margin: "auto",
};

const useStyles = makeStyles({
  iconBtn: {
    "&:focus": {
      outline: "none",
    },
  },
  backgroundColor: {
    backgroundColor: "#FFE4E6 !important",
  },
});

const Dish = ({ dish, handleSelect }) => {
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        width="90%"
        justifyContent="space-between"
        alignItems="center"
        style={dish.isPromoted ? cardStyle2 : cardStyle}
        className={dish.isPromoted && classes.backgroundColor}
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ width: dish.isPromoted && "150px" }}
        >
          {dish.isPromoted && <img src={fire} style={{ width: 30 }} />}
          <Typography
            variant="body1"
            color="initial"
            style={{ marginRight: !dish.isPromoted && "18px" }}
          >
            <b>{dish.price}€</b>
          </Typography>

          <IconButton
            onClick={() => handleSelect(dish._id)}
            className={classes.iconBtn}
          >
            <BsFillPlusCircleFill
              style={{ color: "#C72E54", fontSize: "35px" }}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Dish;
