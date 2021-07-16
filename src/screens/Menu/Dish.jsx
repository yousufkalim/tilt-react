import { Box, Typography, IconButton } from "@material-ui/core";
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

const Dish = ({ dish }) => {
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
              // src={`${baseUrl}/${dish.restaurantImage}`}
              src={`http://160.153.249.64:9092/${dish.restaurantImage}`}
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

        <IconButton aria-label="" onClick={console.log("clicked")}>
          <BsFillPlusCircleFill
            style={{ color: "#C72E54", fontSize: "35px" }}
          />
        </IconButton>
      </Box>
    </>
  );
};

export default Dish;
