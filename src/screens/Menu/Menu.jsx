import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Typography, Button } from "@material-ui/core";
import familyImage from "../../images/family.png";
import emoji from "../../images/emoji.png";
import bike from "../../images/bike.png";
import Basket from "./Basket";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAF9FB",
    width: "100%",
    height: "100vh",
  },
  card: {
    backgroundColor: "#FFE4E6",
    width: "763px",
    height: "128px",
    margin: "20px auto",
    borderRadius: "49px",
    boxSizing: "border-box",
    textAlign: "left",
    paddingLeft: "20px",
  },
  contained: {
    backgroundColor: "#D2898E",
    color: "#fff",
    fontSize: ".7rem",
    textTransform: "capitalize",
    marginTop: "5px",
  },
  Primarycontained: {
    color: "#C72E54 !important",
    fontSize: ".7rem",
    textTransform: "capitalize",
    marginTop: "5px",
  },
}));
const Menu = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid className={classes.root} container item sm={9}>
          <Grid item sm={12}>
            <Typography variant="h4">
              Votre menu du jour{" "}
              <img src={emoji} alt="emoji" style={{ width: "30px" }} />
            </Typography>
            <div className={classes.card}>
              <Grid
                container
                spacing={1}
                justify="space-around"
                alignItems="center"
              >
                <Grid item>
                  <img
                    src={familyImage}
                    style={{
                      width: "169px",
                      height: "103px",
                    }}
                    alt="FamilyImg"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="initial">
                    Bienvenue Laurent !{" "}
                  </Typography>
                  <Typography variant="body2" color="initial">
                    Invite tes collègues et obtient des réductions !
                  </Typography>
                  <Typography variant="body2" color="initial">
                    Reçois des réductions après avoir invité tes collègues !
                  </Typography>
                  <Button variant="contained" className={classes.contained}>
                    En savoir plus
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid item sm={3} container>
          <Grid item container spacing={1}>
            <Grid item container spacing={1}>
              <Grid item xs={12}>
                <Typography fontWeight="bold" variant="h6">
                  Packs de livraison
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ flexBasis: "auto" }}>
                <img
                  src={bike}
                  alt="Delivery Bike"
                  style={{ width: "100px" }}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ color: "#D20249" }} variant="body1">
                  2 crédits
                </Typography>
                <Typography style={{ fontSize: "10px" }}>
                  You currently have the Package 1. Each credit gives you 2€
                  discount on Delivery Fee.
                  <br />
                  Expires on : 12/4/2020
                </Typography>
                <Button
                  variant="contained"
                  className={classes.Primarycontained}
                >
                  En savoir plus
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container>
            <Typography variant="h6" color="initial">
              Votre panier
            </Typography>
            <Basket />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Menu;
