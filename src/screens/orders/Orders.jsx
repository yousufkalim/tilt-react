import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Typography, Box } from "@material-ui/core";
import emoji from "../../images/emoji.png";
import OrderList from "./OrderList";
import {
  completeRestaurantOrder,
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
  const [pickupTime, setPickupTime] = useState("");

  const getCart = async () => {
    const data = await getRestaurantCart();
    if (data.cart) {
      setCarts(data.cart.restaurantCarts);

      const filtered = data.cart.restaurantCarts.filter(
        (item) =>
          item.company && item.company.block && item.company.block.pickUpTime
      );
      setPickupTime(filtered[0].company.block.pickUpTime);
    } else {
      setCarts([]);
      setPickupTime("");
    }
  };

  const handleCompleteOrder = async (_id) => {
    const check = window.confirm(
      "Are you sure you want to mark this as complete"
    );
    if (check) {
      try {
        await completeRestaurantOrder(_id);
        getCart();
      } catch (err) {
        console.log(err);
      }
    }
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
          A préparer pour {pickupTime ? pickupTime : "11h30"}
        </Typography>
      </Box>
      {carts.length > 0 ? (
        <Box>
          <OrderList orders={carts} handleCompleteOrder={handleCompleteOrder} />
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
