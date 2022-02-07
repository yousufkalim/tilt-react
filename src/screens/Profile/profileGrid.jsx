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
import moment from "moment";

const useStyles = makeStyles({
  profileGrid: { marginTop: "40px" },
  card: {
    padding: "20px",
    borderRadius: "20px",
  },
  subtitle: { marginTop: "20px" },
  buttonDiv: { display: "flex", justifyContent: "flex-end" },
  editBtn: {
    backgroundColor: "#EC008C",
    marginLeft: "auto",
    color: "white",
    fontSize: "10px",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#EC008C",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

const ProfileGrid = ({
  user,
  disabled,
  handleProfileModal,
  handleCompanyModal,
  handlePaymentyModal,
  handlePackageListModal,
}) => {
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
                  {user.firstName + " " + user.lastName}
                </Typography>
                <Typography variant="subtitle2">{user.email}</Typography>
                <Typography variant="subtitle2">
                  {user.phone ? user.phone : "N/A"}
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button className={classes.editBtn} onClick={handleProfileModal}>
                Modifier
              </Button>
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
                  {user.userCode}
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button className={classes.editBtn} onClick={handleCompanyModal}>
                Modifier
              </Button>
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
                  {user.user.creditCard && user.user.creditCard.number ? (
                    <>
                      {"**** **** ****" +
                        user.user.creditCard.number.substr(
                          user.user.creditCard.number.length - 4
                        )}
                    </>
                  ) : (
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle}
                    >
                      Pas de carte
                    </Typography>
                  )}
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button className={classes.editBtn} onClick={handlePaymentyModal}>
                Modifier
              </Button>
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
                {user.user && user.user.package ? (
                  <>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle}
                    >
                      Vous avez actuellement le {user.user.package.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {user.user.credits} credits left
                    </Typography>
                    <Typography variant="subtitle2">
                      Chaque crédit = {user.user.package.offPrice}€ remise sur
                      les frais de livraison
                    </Typography>
                    <Typography variant="subtitle2">
                      Expires le :{" "}
                      {moment(user.user.packageExpiration).format("DD/MM/YYYY")}
                    </Typography>
                  </>
                ) : (
                  "Pas de forfait"
                )}
              </Grid>
            </Grid>
            {user.user && !user.user.package && (
              <div className={classes.buttonDiv}>
                <Button
                  className={classes.editBtn}
                  onClick={handlePackageListModal}
                  disabled={disabled}
                >
                  Acheter un forfait
                </Button>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileGrid;
