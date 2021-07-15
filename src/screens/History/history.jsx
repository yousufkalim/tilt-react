import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import HistoryTable from "./historyTable";

const useStyles = makeStyles({
  main: {
    paddingTop: 20,
    backgroundColor: "#FAF9FB",
    minHeight: "100vh",
    paddingLeft: "40px",
    paddingRight: "50px",
    // minWidth: "100vw",
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
    </div>
  );
};

export default History;
