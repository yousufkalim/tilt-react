import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  text: { marginBottom: "40px" },
  dishes: { marginBottom: "40px" },
  userCode: {
    borderRight: "1px solid gray",
    display: "flex",
    alignItems: "center",
  },
  dishDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  allDishes: {
    maxHeight: "400px",
    maxWidth: "400px",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#EC008C",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#D2025a",
    },
  },
});

const RestaurantHistoryModal = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="subtitle1" className={classes.text}>
        <b>Enterprise: </b> {data.company.name}
      </Typography>

      {/* Order Details Section */}
      <div className={classes.allDishes}>
        {data.carts.map((item) => (
          <div className={classes.dishes}>
            <Grid container spacing={2}>
              <Grid item xs={4} className={classes.userCode}>
                <Typography variant="subtitle2">
                  <b>{item.id.userCode}</b>
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.dishDetails}>
                {item.dishes.map((dish) => (
                  <Typography variant="subtitle2">
                    {`${dish.count} x ${dish.id.name}`}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantHistoryModal;
