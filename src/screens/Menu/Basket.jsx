import React from "react";
import { Typography, Box, IconButton } from "@material-ui/core";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";
import ClearIcon from "@material-ui/icons/Clear";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { baseUrl } from "../../config";

const Basket = ({ item, restaurant, onDelete }) => {
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
            width: "64px",
            height: "64px",
            borderRadius: "100%",
          }}
        />
      </Box>
      <Box flexGrow={1} style={{ marginLeft: "10px", width: "100%" }}>
        <Typography
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            overflowWrap: "break-word",
          }}
          variant="body2"
          color="initial"
        >
          <b>Item: </b>
          {item.id.name} <br />
        </Typography>

        <Typography
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
          }}
          variant="body2"
          color="initial"
        >
          <b>Quantité: </b>
          <> {item.count}x</>
        </Typography>
        {item.addOns.length > 0
          ? item.addOns.map((addon, i) => {
              return (
                <>
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                    variant="body2"
                    color="initial"
                  >
                    <b>Option: </b> {addon.name} <br />
                  </Typography>
                  <Typography
                    style={{
                      width: "80%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                    variant="body2"
                    color="initial"
                  >
                    {addon.choice.map((c) => {
                      return (
                        <div>
                          ({c.name} - {c.price != 0 ? "€" + c.price : ""})
                        </div>
                      );
                    })}
                  </Typography>
                </>
              );
            })
          : null}

        <Box
          display="flex"
          style={{ marginTop: "10%" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={`${baseUrl}/${restaurant.restaurant.image}`}
              alt="dish_image"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "100%",
                margin: "4px",
              }}
            />
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
