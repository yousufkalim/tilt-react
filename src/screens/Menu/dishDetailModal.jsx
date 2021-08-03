import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallBtn: {
    fontSize: "8px",
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
  cartBtn: {
    fontSize: "10px",
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
  btnDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  description: {
    marginTop: "10px",
    marginBottom: "40px",
  },
  quantityBtn: {
    width: "20px",
    padding: 0,
    "&:focus": {
      outline: "none",
    },
  },
  imgDiv: {
    display: "flex",
    justifyContent: "center",
    maxHeight: "200px",
  },
});

const DishDetailModal = ({
  dish,
  quantity,
  onIncrement,
  onDecrement,
  onCartAdd,
  onRestaurantModalOpen,
}) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const classes = useStyles();

  return (
    <div>
      <div className={classes.imgDiv}>
        <img src={`${baseUrl}/${dish.image}`} alt="dish_img" width="200px" />
      </div>
      <hr style={{ background: "black" }} />
      <div className={classes.heading}>
        <Typography variant="h6">
          <b>{dish.name}</b>
        </Typography>
        <Button
          size="small"
          variant="contained"
          className={classes.smallBtn}
          onClick={() => onRestaurantModalOpen(dish.restaurant)}
        >
          Voir le menu complet
        </Button>
      </div>
      <Typography variant="subtitle1">
        <b>{dish.price}€</b>
      </Typography>

      <Typography variant="subtitle2" className={classes.description}>
        {dish.description}
      </Typography>
      <Typography variant="subtitle2">
        {dish.specials.map((special, index) => (
          <>{special + (dish.specials.length - 1 !== index ? ", " : "")}</>
        ))}
      </Typography>
      <hr style={{ background: "black" }} />
      <div className={classes.btnDiv}>
        <div>
          <Button
            disabled={quantity === 1 ? true : false}
            variant="contained"
            className={classes.quantityBtn}
            onClick={onDecrement}
          >
            -
          </Button>
          {" " + quantity + " "}
          <Button
            variant="contained"
            className={classes.quantityBtn}
            onClick={onIncrement}
          >
            +
          </Button>
        </div>
        <Button
          size="small"
          variant="contained"
          className={classes.cartBtn}
          onClick={onCartAdd}
        >
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default DishDetailModal;
