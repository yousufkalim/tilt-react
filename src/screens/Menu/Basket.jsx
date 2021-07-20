import React from "react";
import { Typography, Box } from "@material-ui/core";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";

const Basket = ({ item }) => {
  const baseUrl = process.env.REACT_APP_API_URL;

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
        <img
          src={`${baseUrl}/${item.id.image}`}
          alt="dish_image"
          style={{
            width: "92px",
            height: "92px",
            borderRadius: "100%",
          }}
        />
      </Box>
      <Box flexGrow={1} style={{ marginLeft: "10px" }}>
        <Typography variant="body2" color="initial">
          {item.id.name} <br />x{item.count}
        </Typography>
        <Box
          display="flex"
          style={{ marginTop: "10%" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="caption" color="initial">
              <RestaurantIcon /> &nbsp; Bella Restaurant
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="initial">
              {item.id.price}€
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Basket;
