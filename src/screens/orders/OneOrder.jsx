import { Box, Typography } from "@material-ui/core";
import React from "react";

const OneOrder = ({ dish, dishImage }) => {
  return (
    <Box
      marginTop="10px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <img
            style={{ height: "60px", width: "60px", borderRadius: "50%" }}
            src={dishImage}
            alt="dish"
          />
        </Box>
        <Box paddingLeft="15px">
          <Typography variant="subtitle2" color="initial">
            {dish.id.name}
          </Typography>
          <Typography variant="subtitle2" color="initial">
            {dish.id.price}€
          </Typography>
        </Box>
      </Box>

      <Box>Q:{dish.count}</Box>
    </Box>
  );
};

export default OneOrder;
