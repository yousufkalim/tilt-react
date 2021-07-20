import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  Typography,
  Button,
  Box,
  Container,
} from "@material-ui/core";
import familyImage from "../../images/family.png";
import emoji from "../../images/emoji.png";
import bike from "../../images/bike.png";
import Basket from "./Basket";
import DishCategoryList from "./DishCategoryList";
import DishList from "./DishList";
import { getFilteredDishes, addToCart } from "../../services/userService";
import { getAllByRestaurantById } from "../../services/dishService";
import { Store, UpdateStore } from "../../context/StoreContext";
import TransitionsModal from "../../Components/common/transitionsModal";
import DishDetailModal from "./dishDetailModal";
import DrinkModal from "./drinkModal";
import { EmptyCart } from "../../images/images";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const Stripe = loadStripe(process.env.REACT_APP_Stripe_PK);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAF9FB",
    width: "100%",
    minHeight: "100vh",
  },
  ButtonStyle: {
    backgroundColor: "#D20249",
    color: "#fff",
    fontSize: ".7rem",
    textTransform: "capitalize",
    margin: "10px 0 auto auto",
    height: "31px",
  },

  card: {
    backgroundColor: "#FFE4E6",
    width: "85%",
    height: "13%",
    margin: "20px auto",
    borderRadius: "49px",
    boxSizing: "border-box",
    textAlign: "left",
    paddingLeft: "20px",
    paddingBottom: "10px",
  },
  contained: {
    backgroundColor: "#D2898E",
    color: "#fff",
    fontSize: ".7rem",
    textTransform: "capitalize",
    marginTop: "10px",
  },
  Primarycontained: {
    backgroundColor: "#C72E54",
    color: "#fff",
    fontSize: ".7rem",
    textTransform: "capitalize",
    marginTop: "15px",
  },
  categoryBox: {
    width: "80%",
  },
  emptyCart: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    alignItems: "center",
  },
}));

const Menu = () => {
  const classes = useStyles();
  const [dishes, setDishes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedDish, setSelectedDish] = useState({});
  const [restaurantDrinks, setRestaurantDrinks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [openDishModal, setOpenDishModal] = useState(false);
  const [openDrinkModal, setOpenDrinkModal] = useState(false);
  const { user: currentUser, cart } = Store();
  const updateStore = UpdateStore();

  useEffect(() => {
    getDishes();
  }, []);

  const getDishes = async () => {
    const dishesInDB = await getFilteredDishes(filter);
    setDishes(dishesInDB);
  };

  const getDrinksOfRestaurant = async () => {
    const data = await getAllByRestaurantById({
      restaurantId: selectedDish.restaurant,
      dishType: "Drink",
    });
    const dishes = data.dishes.map((dish) => ({ ...dish, quantity: 0 }));
    setRestaurantDrinks(dishes);
    setOpenDrinkModal(true);
  };

  const handleAddDrinkToCart = () => {
    restaurantDrinks.forEach(async (drink) => {
      if (drink.quantity === 0) return;
      else {
        const cart = await addToCart({
          dishId: drink._id,
          dishPrice: drink.price,
          dishCount: drink.quantity,
        });
        updateStore({ cart });
      }
    });
    handleDrinkModalClose();
  };

  const handleDrinkIncrement = (_id) => {
    const drinks = [...restaurantDrinks];
    const index = drinks.findIndex((d) => d._id === _id);
    ++drinks[index].quantity;
    setRestaurantDrinks(drinks);
  };

  const handleDrinkDecrement = (_id) => {
    const drinks = [...restaurantDrinks];
    const index = drinks.findIndex((d) => d._id === _id);
    --drinks[index].quantity;
    setRestaurantDrinks(drinks);
  };

  const handleFilterChange = async (filt) => {
    setFilter(filt);

    const dishesInDB = await getFilteredDishes(filt);
    setDishes(dishesInDB);
  };

  const handleDishSelect = (_id) => {
    const index = dishes.findIndex((d) => d._id === _id);
    setSelectedDish(dishes[index]);
    setOpenDishModal(true);
  };

  const handleDishModalClose = () => {
    setOpenDishModal(false);
    setQuantity(1);
    setSelectedDish({});
    setRestaurantDrinks([]);
  };

  const handleDrinkModalClose = () => {
    setOpenDrinkModal(false);
    setRestaurantDrinks([]);
  };

  const handleDishIncrement = () => {
    let increment = quantity;
    setQuantity(++increment);
  };

  const handleDishDecrement = () => {
    let decrement = quantity;
    setQuantity(--decrement);
  };

  const handleAddToCart = async () => {
    const cart = await addToCart({
      dishId: selectedDish._id,
      dishPrice: selectedDish.price,
      dishCount: quantity,
    });
    updateStore({ cart });
    getDrinksOfRestaurant();
    handleDishModalClose();
  };

  const verifyOrder = () => {
    if (currentUser.creditCard) {
      let isComplete1 = true;
      let totalrest = [];

      currentUser.cart.userCarts.map(async (restaurantCart) => {
        let isComplete = false;
        let ammount = 0;

        await Promise.all(
          restaurantCart.dishes.map((restaurantItem) => {
            if (
              restaurantItem.id.dishType === "Dish" ||
              restaurantItem.id.dishType === "Dessert"
            ) {
              isComplete = true;
            }
            ammount +=
              parseInt(restaurantItem.count) *
              parseInt(restaurantItem.id.price);
          })
        );

        totalrest.push({
          restaurant: restaurantCart.restaurant,
          value: ammount,
        });
        if (!isComplete) {
          isComplete1 = false;
          return;
        }
      });
      if (!isComplete1) {
        toast.error("Starter/Drink cannot be ordered alone.");
      } else {
        onPayment(totalrest);
      }
    } else {
      toast.error("Add a credit card to order!");
    }
  };

  const onPayment = async (totalres) => {
    // try {
    //   const params = {
    //     // mandatory
    //     number: String(currentUser.creditCard.number),
    //     expMonth: parseInt(currentUser.creditCard.date),
    //     expYear: parseInt("20" + currentUser.creditCard.year),
    //     cvc: String(currentUser.creditCard.code),
    //     // optional
    //     name: currentUser.firstName + " " + currentUser.lastName,
    //     currency: "eur",
    //     addressLine1: "123 Test Street",
    //     addressLine2: "Apt. 5",
    //     addressCity: "Test City",
    //     addressState: "Test State",
    //     addressCountry: "Test Country",
    //     addressZip: "55555",
    //   };
    //   const cardObjectWithToken = await Stripe.createTokenWithCardAsync(params);
    //   const price = totalPrice();
    //   await GLOBALS.API({
    //     uri: GLOBALS.Constants.USER_PAYMENT,
    //     method: "POST",
    //     token: context.context.token,
    //     body: JSON.stringify({
    //       name:
    //         context.context.user.firstName +
    //         " " +
    //         context.context.user.lastName,
    //       email: context.context.user.email,
    //       token: cardObjectWithToken.tokenId,
    //       card: cardObjectWithToken,
    //       amount: price,
    //       totalres: totalres,
    //     }),
    //   });
    //   makeOrder();
    // } catch (err) {
    //   setState({ ...state, loading: false });
    //   snackBarContext.toggleSnackBar(`Error: ${err}`, "error");
    // }
  };

  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        <Grid item sm={9}>
          <Box display="flex" flexDirection="column">
            <Box marginLeft="10%" marginTop="20px">
              <Typography variant="h5">
                Votre menu du jour{" "}
                <img src={emoji} alt="emoji" style={{ width: "25px" }} />
              </Typography>
            </Box>
            <Box>
              <Box alignSelf="center" marginX="auto" className={classes.card}>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  padding="5px"
                >
                  <Box>
                    <img
                      src={familyImage}
                      style={{
                        width: "169px",
                        height: "103px",
                      }}
                      alt="FamilyImg"
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" color="initial">
                      Bienvenue {currentUser.firstName} !
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
                  </Box>
                </Box>
              </Box>
              <Box
                alignSelf="center"
                marginX="auto"
                className={classes.categoryBox}
              >
                <Box>
                  <DishCategoryList
                    handleChange={handleFilterChange}
                    filter={filter}
                  />
                </Box>
              </Box>
              <Box>
                <DishList dishes={dishes} handleSelect={handleDishSelect} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={3} style={{ backgroundColor: "#fff" }}>
          <Box marginTop="15%" width="100%">
            <Box>
              <Typography fontWeight="bold" variant="h6">
                Packs de livraison
              </Typography>
            </Box>
            <Box display="flex" marginTop="10px">
              <Box>
                <img
                  src={bike}
                  alt="Delivery Bike"
                  style={{ height: "100px" }}
                />
              </Box>
              <Box>
                <Typography style={{ color: "#D20249" }} variant="body1">
                  2 crédits
                </Typography>
                <Typography style={{ fontSize: "10px" }}>
                  You currently have the Package 1. <br />
                  Each credit gives you 2€ discount on Delivery Fee.
                  <br />
                  Expires on : 12/4/2020
                </Typography>
                <Button
                  variant="contained"
                  className={classes.Primarycontained}
                >
                  En savoir plus
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            padding="10px"
            marginTop="20px"
          >
            <Typography variant="h6" color="initial">
              Votre panier
            </Typography>
            {cart.userCarts && cart.userCarts.length > 0 ? (
              <>
                {cart.userCarts.map((item) =>
                  item.dishes.length > 0 ? (
                    item.dishes.map((dish) => (
                      <>
                        <Basket item={dish} />
                      </>
                    ))
                  ) : (
                    <></>
                  )
                )}
                {cart.userCarts.some((item) => item.dishes.length > 0) ? (
                  <Button variant="contained" className={classes.ButtonStyle}>
                    Placer la commande
                  </Button>
                ) : (
                  <div className={classes.emptyCart}>
                    <img src={EmptyCart} alt="emptyCart" width="130px" />
                    <Typography
                      variant="caption"
                      color="initial"
                      style={{ paddingLeft: "5px" }}
                    >
                      Reçois des réductions aprèsVotre panier est vide.
                      <br />
                      <br />
                      Commencez pas ajouter des plats à partir du menu de
                      gauche. avoir invité tes collègues !
                    </Typography>
                  </div>
                )}
              </>
            ) : (
              <div className={classes.emptyCart}>
                <img src={EmptyCart} alt="emptyCart" width="130px" />
                <Typography
                  variant="caption"
                  color="initial"
                  style={{ paddingLeft: "5px" }}
                >
                  Reçois des réductions aprèsVotre panier est vide.
                  <br />
                  <br />
                  Commencez pas ajouter des plats à partir du menu de gauche.
                  avoir invité tes collègues !
                </Typography>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
      {openDishModal && (
        <TransitionsModal
          open={openDishModal}
          handleClose={handleDishModalClose}
          body={
            <DishDetailModal
              dish={selectedDish}
              quantity={quantity}
              onIncrement={handleDishIncrement}
              onDecrement={handleDishDecrement}
              onCartAdd={handleAddToCart}
            />
          }
        />
      )}

      {openDrinkModal && (
        <TransitionsModal
          open={openDrinkModal}
          handleClose={handleDrinkModalClose}
          body={
            <DrinkModal
              drinks={restaurantDrinks}
              onIncrement={handleDrinkIncrement}
              onDecrement={handleDrinkDecrement}
              onCartAdd={handleAddDrinkToCart}
              onClose={handleDrinkModalClose}
            />
          }
        />
      )}
    </>
  );
};

export default Menu;
