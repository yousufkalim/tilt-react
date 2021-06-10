import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import OrderCard from "./OrderCard";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#D20249",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#D2025a",
    },
    width: "100%",
    height: "100vh",
    flexGrow: "1",
    flexWrap: "wrap",
    overflow: "scroll",
    padding: "10px 50px",
    paddingBottom: "200px",
  },
  ListTyle: {
    height: "100%",
  },
}));

const OrderList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.gridList}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
          <Grid item xs={4}>
            <OrderCard></OrderCard>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OrderList;
