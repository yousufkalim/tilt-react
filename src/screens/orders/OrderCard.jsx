import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
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
  btnDiv: { marginTop: "10px", display: "flex", justifyContent: "flex-end" },
  btn: {
    backgroundColor: "rgb(210, 2, 73)",
    color: "white",
    fontSize: "10px",
    maxHeight: "100px",
    "&:hover": {
      backgroundColor: "rgb(210, 2, 73)",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const OrderCard = ({ order, onCompleteOrder }) => {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_API_URL;

  return (
    <Box className={classes.card}>
      {order.carts.map((cart) => (
        <>
          <Typography
            variant="body1"
            color="initial"
            style={{ marginTop: "20px" }}
          >
            {cart.id.userCode}
          </Typography>

          {cart.dishes.map((dish) => (
            <>
              <OneOrder dish={dish} dishImage={`${baseUrl}/${dish.id.image}`} />
            </>
          ))}
          <Box marginLeft="20px" marginTop="20px" display="flex">
            <Typography variant="subtitle2">
              {cart.dishes.length} {cart.dishes.length === 1 ? "Plat" : "Plats"}
            </Typography>
            <Typography className={classes.textStyle} variant="subtitle2">
              {/* {cart.totalPrice}€ */}
              {cart.total[cart.total.length - 1]}€
            </Typography>
          </Box>
        </>
      ))}
      <div className={classes.btnDiv}>
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={() => onCompleteOrder(order.company._id)}
        >
          Termine
        </Button>
      </div>
    </Box>
  );
};

export default OrderCard;
