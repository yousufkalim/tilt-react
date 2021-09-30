import React from "react";
import { Typography, Box } from "@material-ui/core";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";
import ClearIcon from "@material-ui/icons/Clear";

const Basket = ({ item, onDelete }) => {
  const baseUrl = process.env.REACT_APP_API_URL;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      marginTop="5%"
      alignContent="center"
      alignItems="center"
      style={{ width: "100%", position: "relative" }}
    >
      <ClearIcon
        onClick={() => onDelete(item)}
        fontSize="small"
        style={{
          position: "absolute",
          cursor: "pointer",
          top: 7,
          right: 0,
        }}
      />
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
          justifyContent="flex-end"
        >
          <Box>
            <Typography 
      style={{ fontWeight: "600" }}
            
            variant="body2" color="initial">
              {item.id.price}€
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Basket;
