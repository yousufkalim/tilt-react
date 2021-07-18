import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import dishImg from "../../images/Dish.png";
import OneOrder from "./OneOrder";

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "20px",
  },
  textStyle: {
    fontWeight: "bold",
    marginLeft: "20px",
  },
}));

const OrderCard = ({ order }) => {
  const classes = useStyles();
  return (
    <Box className={classes.card}>
      {order.carts.map((cart) => (
        <>
          <Typography variant="body1" color="initial">
            {cart.id.userCode}
          </Typography>

          {cart.dishes.map((dish) => (
            <>
              <OneOrder dish={dish} dishImage={dishImg} />
            </>
          ))}
          <Box marginLeft="20px" marginTop="20px" display="flex">
            <Typography variant="subtitle2">
              {cart.dishes.length} {cart.dishes.length === 1 ? "Plat" : "Plats"}
            </Typography>
            <Typography className={classes.textStyle} variant="subtitle2">
              {cart.totalPrice}€
            </Typography>
          </Box>
        </>
      ))}
    </Box>
  );
};

export default OrderCard;
