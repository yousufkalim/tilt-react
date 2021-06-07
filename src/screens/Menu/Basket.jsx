import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { ReactComponent as RestaurantIcon } from "../../images/basket.svg";

const ButtonStyle = {
  backgroundColor: "#C72E54",
  color: "#fff",
  fontSize: ".7rem",
  textTransform: "capitalize",
  marginTop: "5px",
};

const Basket = () => {
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={4}>
        <div
          style={{
            width: "92px",
            height: "92px",
            borderRadius: "100%",
            backgroundColor: "#C72E54",
          }}
        ></div>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body2" color="initial">
          PanCake
        </Typography>
        <Grid item container justify="space-between">
          <Grid item xs={8}>
            <Typography variant="caption" color="initial">
              <RestaurantIcon /> &nbsp; Bella Restaurant
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" color="initial">
              140€
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" style={ButtonStyle}>
              En savoir plus
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Basket;
