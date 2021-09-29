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

const UserHistoryModal = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      {console.log("data: ",data)}
      <Typography variant="subtitle2" className={classes.text}>
        <b>Statut: </b> {data.status}
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        <b>Temps: </b> {moment(data.time).format("DD/MM/YYYY")}
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        <b>Telephone: </b> <br />
        {data.order.map((order) => (
          <>
            {order.restaurant.firstName} -{order.restaurant.phone} <br />
          </>
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
        {data.order.map((order) => (
          <>
            {order.dishes.map((dish) => (
              <>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">{dish.id.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2">x{dish.count}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2">{dish.id.price}€</Typography>
                </Grid>
              </>
            ))}
          </>
        ))}
      </Grid>
      <hr className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant="subtitle2">Sous-Total</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">{data.totalPrice}€</Typography>
        </Grid>
        
        <Grid item xs={9}>
          <Typography variant="subtitle2">Frais de livraison </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">{data.paidPrice-data.totalPrice}€</Typography>
        </Grid>
      </Grid>
      <hr className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant="subtitle2">Payé</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">{data.paidPrice}€</Typography>
        </Grid>
      </Grid>

    </div>
  );
};

export default UserHistoryModal;
