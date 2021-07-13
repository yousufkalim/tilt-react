import React from "react";
import { makeStyles, Typography, Box, Grid } from "@material-ui/core";
import HistoryTable from "./historyTable";

const useStyles = makeStyles({
  main: {
    paddingTop: 20,
    backgroundColor: "#FAF9FB",
    minHeight: "100vh",
    paddingLeft: "40px",
    paddingRight: "50px",
    minWidth: "100vw",
  },
  historyGrid: { marginTop: "40px" },
  container: {
    backgroundColor: "white",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "700px",
  },
});

const History = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h5">Historique des commandes</Typography>

      <HistoryTable />

      {/* <Box className={classes.historyGrid}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={2}>
            <Typography variant="subtitle1" className={classes.mainHeading}>
              <b>Date</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" className={classes.mainHeading}>
              <b>Restaurant</b>
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1" className={classes.mainHeading}>
              <b>Statut</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" className={classes.mainHeading}>
              <b>Total</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.mainHeading}>
              <b>Crédit livraison</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" className={classes.mainHeading}>
              <b>Action</b>
            </Typography>
          </Grid>
        </Grid>
      </Box> */}
    </div>
  );
};

export default History;
