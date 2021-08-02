import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Typography, Box } from "@material-ui/core";
import emoji from "../../images/emoji.png";
import OrderList from "./OrderList";
import {
  getOrderHistory,
  getRestaurantCart,
} from "../../services/restaurantService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAF9FB",
    width: "100%",
    height: "100vh",
    margin: "0",
    boxSizing: "border-box",
    overflow: "hidden",
  },
}));

const Orders = () => {
  const classes = useStyles();
  const [carts, setCarts] = useState([]);

  const getCart = async () => {
    const data = await getRestaurantCart();
    setCarts(data.cart.restaurantCarts);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Grid className={classes.root}>
      <Box>
        <Typography style={{ padding: "50px" }} variant="h5">
          Vos commandes du jour
          <img src={emoji} alt="emoji" style={{ width: "25px" }} />
        </Typography>
      </Box>
      <Box display="flex">
        <Typography
          style={{ padding: "10px 50px", fontWeight: "bold" }}
          variant="body1"
        >
          Entreprise Carlier
        </Typography>
        <Typography style={{ padding: "10px 50px" }} variant="subtitle1">
          A préparer pour 11h30
        </Typography>
      </Box>
      {carts.length > 0 ? (
        <Box>
          <OrderList orders={carts} />
        </Box>
      ) : (
        <Typography style={{ padding: "10px 50px" }} variant="subtitle1">
          No orders Yet
        </Typography>
      )}
    </Grid>
  );
};

export default Orders;
