import { Box, Typography, IconButton } from "@material-ui/core";
import React from "react";
import dish from "../../images/Dish.png";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";
import { BsFillPlusCircleFill } from "react-icons/bs";

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "5px 10px",
  margin: "auto",
};

const Dish = () => {
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
            <img style={{ height: "60px" }} src={dish} alt="dish" />
          </Box>
          <Box paddingLeft="10px">
            <Typography variant="body1" color="initial">
              Pancakes Zucchini
            </Typography>
            <Typography variant="caption" color="initial">
              <RestaurantIcon /> &nbsp; Bella Restaurant
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
