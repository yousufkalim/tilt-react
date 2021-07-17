import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Typography, Box } from "@material-ui/core";
import emoji from "../../images/emoji.png";
import OrderList from "./OrderList";
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
      <Box>
        <OrderList />
      </Box>
    </Grid>
  );
};

export default Orders;
