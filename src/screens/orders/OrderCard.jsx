import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import dish from "../../images/Dish.png";
import OneOrder from "./OneOrder";

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "20px",
  },
  textStyle: {
    fontWeight: "bold",
    marginLeft: "20px",
  },
}));

const OrderCard = () => {
  const classes = useStyles();
  return (
    <Box className={classes.card}>
      <Typography variant="body1" color="initial">
        CAR-SCH-001
      </Typography>

      <OneOrder dishImage={dish} />
      <OneOrder dishImage={dish} />
      <OneOrder dishImage={dish} />
      <Box marginLeft="20px" marginTop="20px" display="flex">
        <Typography variant="subtitle2">2 Plats</Typography>
        <Typography className={classes.textStyle} variant="subtitle2">
          25€
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderCard;
