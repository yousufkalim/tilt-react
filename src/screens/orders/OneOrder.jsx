import { Box, Typography } from "@material-ui/core";
import React from "react";

const OneOrder = ({ dish, dishImage }) => {
  const baseUrl = process.env.REACT_APP_API_URL;

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
            style={{ height: "60px" }}
            // src={`${baseUrl}/${dish.id.image}`}
            src={dishImage}
            alt="dish"
          />
        </Box>
        <Box paddingLeft="10px">
          <Typography variant="body1" color="initial">
            {dish.id.name}
          </Typography>
          <Typography variant="caption" color="initial">
            {dish.id.price}€
          </Typography>
        </Box>
      </Box>

      <Box>Q:{dish.count}</Box>
    </Box>
  );
};

export default OneOrder;
