import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  btnDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartBtn: {
    fontSize: "10px",
    marginLeft: "5px",
    marginRight: "5px",
    backgroundColor: "#C72E54",
    color: "white",
    "&:hover": {
      backgroundColor: "#C72E54",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
  cartBtnDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
});

const DrinkModal = ({
  drinks,
  onIncrement,
  onDecrement,
  onCartAdd,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.heading}>
        Ajoutez une boisson
      </Typography>
      {drinks.map((drink) => (
        <>
          <div className={classes.btnDiv}>
            <Typography variant="subtitle1" className={classes.heading}>
              {drink.name}
            </Typography>
            <div>
              <Button
                disabled={drink.quantity === 0 ? true : false}
                variant="contained"
                className={classes.quantityBtn}
                onClick={() => onDecrement(drink._id)}
              >
                -
              </Button>
              {" " + drink.quantity + " "}
              <Button
                variant="contained"
                className={classes.quantityBtn}
                onClick={() => onIncrement(drink._id)}
              >
                +
              </Button>
            </div>
          </div>
        </>
      ))}
      <div className={classes.cartBtnDiv}>
        <Button
          size="small"
          variant="contained"
          className={classes.cartBtn}
          onClick={onCartAdd}
        >
          Ajouter
        </Button>
        <Button
          size="small"
          variant="contained"
          className={classes.cartBtn}
          onClick={onClose}
        >
          Non merci
        </Button>
      </div>
    </>
  );
};

export default DrinkModal;
