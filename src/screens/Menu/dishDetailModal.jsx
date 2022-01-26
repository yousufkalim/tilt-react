import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import { baseUrl } from "../../config";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallBtn: {
    fontSize: "8px",
    backgroundColor: "#EC008C",
    color: "white",
    "&:hover": {
      backgroundColor: "#EC008C",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
  cartBtn: {
    fontSize: "10px",
    backgroundColor: "#EC008C",
    color: "white",
    "&:hover": {
      backgroundColor: "#EC008C",
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
  addOns,
  quantity,
  onIncrement,
  onDecrement,
  onCartAdd,
  onRestaurantModalOpen,
}) => {
  const classes = useStyles();

  const handleChoiceSelect = (e, aIndex, cIndex) => {
    const { name, checked } = e.target;
    if (checked) {
      let found = false;
      addOns.map((addOn, index) => {
        if (addOn.aIndex === aIndex) {
          addOns[index].cIndex.push(cIndex);
          addOns = [...addOns];
          found = true;
        }
      });
      if (!found) {
        addOns = [...addOns, { aIndex: aIndex, cIndex: [cIndex] }];
      }
    } else {
      addOns.map((addOn, index) => {
        if (addOn.aIndex === aIndex) {
          if (addOn.cIndex.length === 1) {
            addOns.splice(index, 1);
          } else if (addOn.cIndex.length > 1) {
            addOn.cIndex.map((choice, i) => {
              if (choice === cIndex) {
                addOns[index].cIndex.splice(i, 1);
                addOns = [...addOns];
              }
            });
          }
        }
      });
    }
  };

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
      {dish.addOns.length > 0 ? (
        <div
          style={{ marginTop: "10px", overflowY: "scroll", height: "200px" }}
        >
          {dish.addOns.map((addOn, aIndex) => {
            return (
              <>
                <Typography variant="subtitle1">
                  <b>{addOn.name} : </b>
                  {addOn.min > 0 && addOn.min < addOn.max
                    ? "(" + addOn.min + " à " + addOn.max + " choix possibles)"
                    : addOn.min === addOn.max
                    ? "Sélectionnez " + addOn.max + " choix"
                    : addOn.min === 0
                    ? "(Sélectionnez jusqu'à " + addOn.max + " choix)"
                    : ""}
                </Typography>
                {addOn.choice.length > 0
                  ? addOn.choice.map((c, cIndex) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            // checked={}
                            name={c.name}
                            onChange={(e) =>
                              handleChoiceSelect(e, aIndex, cIndex)
                            }
                          />
                          <div>
                            {c.name} {c.price != 0 ? "(+" + c.price + "€)" : ""}
                          </div>
                        </div>
                      );
                    })
                  : null}
              </>
            );
          })}
        </div>
      ) : null}

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
          onClick={() => onCartAdd(addOns)}
        >
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default DishDetailModal;
