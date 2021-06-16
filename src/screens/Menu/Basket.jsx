import React from "react";
import { Typography, Box } from "@material-ui/core";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";

const Basket = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      marginTop="5%"
      alignContent="center"
      alignItems="center"
      style={{ width: "100%" }}
    >
      <Box>
        <div
          style={{
            width: "92px",
            height: "92px",
            borderRadius: "100%",
            backgroundColor: "#D20249",
          }}
        ></div>
      </Box>
      <Box flexGrow={1} style={{ marginLeft: "10px" }}>
        <Typography variant="body2" color="initial">
          PanCake
        </Typography>
        <Box
          display="flex"
          style={{ marginTop: "15%" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="caption" color="initial">
              <RestaurantIcon /> &nbsp; Bella Restaurant
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="initial">
              140€
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Basket;
