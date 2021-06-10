import { Box, Typography } from "@material-ui/core";
import React from "react";

const OneOrder = ({ dishImage }) => {
  return (
    <Box
      marginTop="10px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <img style={{ height: "60px" }} src={dishImage} alt="dish" />
        </Box>
        <Box paddingLeft="10px">
          <Typography variant="body1" color="initial">
            Pancakes Zucchini
          </Typography>
          <Typography variant="caption" color="initial">
            13€
          </Typography>
        </Box>
      </Box>

      <Box>Q:1</Box>
    </Box>
  );
};

export default OneOrder;
