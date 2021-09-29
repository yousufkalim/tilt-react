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
import {
  getFilteredDishes,
  addToCart,
  getUserOrder,
  userOrderPayment,
  removeDishFromCart,
} from "../../services/userService";
import { getAllByRestaurantById } from "../../services/dishService";
import { Store, UpdateStore } from "../../context/StoreContext";
import TransitionsModal from "../../Components/common/transitionsModal";
import DishDetailModal from "./dishDetailModal";
import DrinkModal from "./drinkModal";
import { EmptyCart } from "../../images/images";
import { toast } from "react-toastify";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import moment from "moment";
import { Link } from "react-router-dom";
import PaymentForm from "../../Components/Payment/paymentForm";
import RestaurantMenuModal from "./restaurantMenuModal";

import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";


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
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openRestaurantMenuModal, setOpenRestaurantMenuModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [cardComplete, setCardComplete] = useState(false);

  const [openmodal, setOpenmodal] = useState(false);


  const { user: currentUser, cart, discount } = Store();
  const updateStore = UpdateStore();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getDishes();
  }, []);

  const handleCompleteCardStatus = (status) => setCardComplete(status);

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

  const handleRestaurantModalOpen = async (_id) => {
    const dishesInDB = await getFilteredDishes("all");
    const filteredDishes = dishesInDB.filter(
      (item) => item.restaurant === _id && item.dishType !== "Drink"
    );
    setSelectedMenu(filteredDishes);
    setOpenRestaurantMenuModal(true);
  };

  const handleRestaurantModalClose = () => {
    setOpenRestaurantMenuModal(false);
    setSelectedMenu([]);
    // setCardComplete(false);
  };

  const handlePaymentModalOpen = () => setOpenPaymentModal(true);
  const handlePaymentModalClose = () => {
    setOpenPaymentModal(false);
    setCardComplete(false);
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
    handleRestaurantModalClose();
    setQuantity(1);
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
    updateStore({
      cart,
      user: {
        ...currentUser,
        user: {
          ...currentUser.user,
          cart: cart,
        },
      },
    });
    getDrinksOfRestaurant();
    handleDishModalClose();
  };

  const verifyOrder = async () => {
    let isComplete1 = true;
    let totalrest = [];
    currentUser.user.cart.userCarts.map(async (restaurantCart) => {
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
            parseInt(restaurantItem.count) * parseInt(restaurantItem.id.price);
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
      const cardElement = elements.getElement(CardElement);
      const cardObjectWithToken = await stripe.createToken(cardElement);

      onPayment(totalrest, { tokenId: cardObjectWithToken.token.id });
    }
  };

  const onPayment = async (totalres, tokenObject) => {
    try {
      const price = totalPrice();
      await userOrderPayment({
        name: currentUser.firstName + " " + currentUser.lastName,
        email: currentUser.email,
        token: tokenObject.tokenId,
        card: tokenObject,
        amount: price,
        totalres: totalres,
      });
      makeOrder();
    } catch (err) {
      toast.error("une erreur s'est produite 1");
      console.log(err);
    }
  };

  const makeOrder = async () => {
    try {
      const data = await getUserOrder();

      updateStore({
        user: {
          ...currentUser,
          user: { ...data.user.user, cart: null },
        },
        cart: {},
      });
      handlePaymentModalClose();
      toast.success("Commande passée avec succès!");
    } catch (err) {
      toast.error("une erreur s'est produite 2");
    }
  };

  const totalPrice = () => {
    let totalPriced = +currentUser.user.company.block.deliveryCost;
    if (currentUser.user.cart) {
      totalPriced += +currentUser.user.cart.totalPrice;
      if (currentUser.user.credits && currentUser.user.credits > 0) {
        totalPriced -= currentUser.user.package.offPrice;
      }
      if (currentUser.user.referrals && currentUser.user.referrals > 0) {
        totalPriced -= +discount.referralDiscount;
      }
    }
    return totalPriced;
  };

  const handleDeleteDish = async (item) => {
    try {
      const data = await removeDishFromCart({
        dishId: item.id._id,
        dishPrice: item.id.price,
      });

      updateStore({
        user: {
          ...currentUser,
          user: {
            ...currentUser.user,
            cart: data.cart,
          },
        },
        cart: data.cart,
      });
      alert("Plat retiré du panier avec succès !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        <Grid item sm={9}>
          <Box display="flex" flexDirection="column">
            <Box marginLeft="10%" marginTop="20px">
              {/* <CardElement /> */}

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
                    <Button variant="contained" onClick={()=>setOpenmodal(true)} className={classes.contained}>
                      En savoir plus
                    </Button>
                    <TransitionsModal
                      open={openmodal}
                      handleClose={()=>setOpenmodal(false)}
                      body={
                        <div style={{width:"34vw"}}>
                          <Typography variant="h6">
                            <b>Invite des collègues et gagne des réductions !</b>
                          </Typography><br/>
                          <Typography variant="h8" >
                            Partage ton code de parrainage à tes collègues. Lorsqu’ils l’informent durant leur inscription, tu obtiens gratuitement des réductions pour ta prochaine commande !
                          </Typography><br/><br/>
                          <Typography variant="h8" >
                           Ton code parrainage : {currentUser.user.affiliateCode}
                          </Typography><br/><br/>
                          <Typography variant="h8" >
                           Réduction obtenue par parrainage : {discount.referralDiscount}€
                          </Typography>
                        </div>
                      }
                    />
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
                {currentUser.user && currentUser.user.package ? (
                  <>
                    <Typography style={{ color: "#D20249" }} variant="body1">
                      {currentUser.user.credits} crédits
                    </Typography>
                    <Typography style={{ fontSize: "10px" }}>
                      Vous avez actuellement le {currentUser.user.package.name}
                      <br />
                      Chaque crédit vous donne{" "}
                      {currentUser.user.package.offPrice}€ remise sur les frais
                      de livraison
                      <br />
                      Expire le :{" "}
                      {moment(currentUser.user.packageExpiration).format(
                        "DD/MM/YYYY"
                      )}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography style={{ color: "#D20249" }} variant="body1">
                      Aucun crédit
                    </Typography>
                    <Typography style={{ fontSize: "12px" }}>
                      Achetez un pack de livraison afin <br /> de profiter de
                      réductions sur les <br /> coûts de livraison.
                    </Typography>
                    <Link to="/profile">
                      <Button
                        to="/profile"
                        variant="contained"
                        className={classes.Primarycontained}
                      >
                        Acheter
                      </Button>
                    </Link>
                  </>
                )}
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
                        <Basket item={dish} onDelete={handleDeleteDish} />
                      </>
                    ))
                  ) : (
                    <></>
                  )
                )}
                {cart.userCarts.some((item) => item.dishes.length > 0) ? (
                  <Button
                    variant="contained"
                    className={classes.ButtonStyle}
                    onClick={() => {
                      if (
                        +currentUser.user.cart.totalPrice <
                        +discount.leastCartValue
                      ) {
                        alert(
                          `La valeur de votre panier doit être d'au moins ${discount.leastCartValue}€`
                        );
                      } else {
                        // verifyOrder();
                        handlePaymentModalOpen();
                      }
                    }}
                  >
                    Payer
                  </Button>
                ) : (
                  <div className={classes.emptyCart}>
                    <img src={EmptyCart} alt="emptyCart" width="130px" />
                    <Typography
                      variant="caption"
                      color="initial"
                      style={{ paddingLeft: "5px" }}
                    >
                      Reçois des réductions après Votre panier est vide.
                      <br />
                      <br />
                      Commencez par ajouter des plats à partir du menu de
                      gauche.
                      {/* avoir invité tes collègues ! */}
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
                  Reçois des réductions après Votre panier est vide.
                  <br />
                  <br />
                  Commencez pas ajouter des plats à partir du menu de gauche.
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
              onRestaurantModalOpen={handleRestaurantModalOpen}
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

      <TransitionsModal
        open={openPaymentModal}
        handleClose={handlePaymentModalClose}
        body={
          <PaymentForm
            stripe={stripe}
            completeCardStatus={cardComplete}
            handleCompleteCard={handleCompleteCardStatus}
            handleSubmit={verifyOrder}
          />
        }
      />

      <TransitionsModal
        open={openRestaurantMenuModal}
        handleClose={handleRestaurantModalClose}
        body={
          <RestaurantMenuModal
            selectedDish={selectedDish}
            allDishes={selectedMenu}
            handleDishSelect={handleDishSelect}
          />
        }
      />
    </>
  );
};

export default Menu;
