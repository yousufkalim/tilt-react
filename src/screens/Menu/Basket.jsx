import React from "react";
import { Typography, Box, IconButton } from "@material-ui/core";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";
import ClearIcon from "@material-ui/icons/Clear";
import { BsFillPlusCircleFill } from "react-icons/bs";

const Basket = ({ item, restaurant, onDelete }) => {
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
          justifyContent="space-between"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RestaurantIcon style={{ marginRight: 4 }} />
            <Typography variant="body2" color="initial">
              {restaurant.firstName}
            </Typography>
          </div>
          <Box>
            <Typography
              style={{ fontWeight: "600" }}
              variant="body2"
              color="initial"
            >
              {item.id.price}€
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Basket;
