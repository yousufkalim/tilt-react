import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import OneOrder from "./OneOrder";
import { baseUrl } from "../../config";

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
    backgroundColor: "#EC008C",
    color: "white",
    fontSize: "10px",
    maxHeight: "100px",
    "&:hover": {
      backgroundColor: "#EC008C",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const OrderCard = ({ order, onCompleteOrder }) => {
  const classes = useStyles();

  return (
    <Box className={classes.card}>
      {order.carts.map((cart, index) => (
        <>
          <Typography
            variant="body1"
            color="initial"
            style={{ marginTop: "20px" }}
          >
            {cart.id.userCode}
          </Typography>

          {cart.dishes.map((dish, i) => {
            return (
              <>
                <OneOrder
                  dish={dish}
                  dishImage={`${baseUrl}/${dish.id.image}`}
                />
                <div
                  style={{
                    marginLeft: "74px",
                  }}
                >
                  {dish.addOns.length > 0 &&
                    dish.addOns.map((addon) => {
                      return (
                        <>
                          <Typography
                            variant="subtitle2"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <b>Options: </b>
                            {addon.name}{" "}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle2">
                              <b>Choix: </b>
                            </Typography>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                              }}
                            >
                              {addon.choice.map((c) => {
                                return (
                                  <Typography variant="subtitle2">
                                    ({c.name} - €{c.price}){" "}
                                  </Typography>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  <Typography
                    variant="subtitle2"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid black",
                    }}
                  >
                    <b>Sous-Total: </b>
                    <>€{cart.total[i]}</>
                  </Typography>
                </div>
              </>
            );
          })}
          <Box marginLeft="20px" marginTop="20px" display="flex">
            <Typography variant="subtitle2">
              {cart.dishes.length} {cart.dishes.length === 1 ? "Plat" : "Plats"}
            </Typography>
            <Typography className={classes.textStyle} variant="subtitle2">
              <b>Total</b> {cart.totalPrice}€
            </Typography>
            <Typography
              className={classes.textStyle}
              variant="subtitle2"
            ></Typography>
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
