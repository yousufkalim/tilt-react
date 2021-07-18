import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  text: { marginBottom: "10px" },
  tableBody: { marginTop: "10px" },
  divider: { backgroundColor: "black", broder: "1px solid black" },
  total: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const RestaurantHistoryModal = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="subtitle1" className={classes.text}>
        <b>EnterPrise: </b> {data.company.name}
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        <b>Utilisateur: </b>
        {data.carts.map((cart) => (
          <>{cart.id.userCode}</>
        ))}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">
            <b>Nom</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">
            <b>Compte</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">
            <b>Prix</b>
          </Typography>
        </Grid>
      </Grid>
      <hr className={classes.divider} />

      <Grid container spacing={3} className={classes.tableBody}>
        {data.carts.map((cart) => (
          <>
            {cart.dishes.map((dish) => (
              <>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">{dish.id.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2">x{dish.count}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2">{dish.id.price}</Typography>
                </Grid>
              </>
            ))}
          </>
        ))}
      </Grid>
      <hr className={classes.divider} />

      <Grid container spacing={3}>
        {data.carts.map((cart) => (
          <>
            <Grid item xs={9}>
              <Typography variant="subtitle2">Sous-Total</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2">{cart.totalPrice}</Typography>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default RestaurantHistoryModal;
