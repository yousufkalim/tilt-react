import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  MonCompte,
  MonEnterPrize,
  PaymentMethod,
  Package,
} from "../../images/images";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  profileGrid: { marginTop: "40px" },
  card: {
    padding: "20px",
    borderRadius: "20px",
  },
  subtitle: { marginTop: "20px" },
  buttonDiv: { display: "flex", justifyContent: "flex-end" },
  editBtn: {
    backgroundColor: "#D20249",
    marginLeft: "auto",
    color: "white",
    fontSize: "10px",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#D20249",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

const ProfileGrid = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.profileGrid}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} className={classes.card}>
            <Grid container spacing={3}>
              <Grid item xs>
                <img src={MonCompte} alt="Mon Compte" />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  <b>Mon Compte</b>
                </Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>
                  Laurent Robert
                </Typography>
                <Typography variant="subtitle2">
                  Laurent.robert@gmail.com
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button className={classes.editBtn}>Modifier</Button>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} className={classes.card}>
            <Grid container spacing={3}>
              <Grid item xs>
                <img src={MonEnterPrize} alt="Mon Compte" />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  <b>Mon Enterprise</b>
                </Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>
                  CUR Enterprise
                </Typography>
                <Typography variant="subtitle2">
                  20, allée Jacques Deprez
                </Typography>
                <Typography variant="subtitle2">
                  Saint-Jacques, Martinique
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button className={classes.editBtn}>Modifier</Button>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} className={classes.card}>
            <Grid container spacing={3}>
              <Grid item xs>
                <img src={PaymentMethod} alt="Mon Compte" />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  <b>Méthode de paiement</b>
                </Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>
                  Carte de crédite
                </Typography>
                <Typography variant="subtitle2">
                  **** ***** **** 3233
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button className={classes.editBtn}>Modifier</Button>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} className={classes.card}>
            <Grid container spacing={3}>
              <Grid item xs>
                <img src={Package} alt="Mon Compte" />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  <b>Pack de livraison</b>
                </Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>
                  You currently have the Package 1
                </Typography>
                <Typography variant="subtitle2">2 credits left</Typography>
                <Typography variant="subtitle2">
                  Each credit=2€ discount on Delivery Fee
                </Typography>
                <Typography variant="subtitle2">
                  Expires on : 12/4/2020
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button className={classes.editBtn}>Buy Package</Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileGrid;
