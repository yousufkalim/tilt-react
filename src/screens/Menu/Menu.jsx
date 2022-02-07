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
import { Package } from "../../images/images";
import Basket from "./Basket";
import DishCategoryList from "./DishCategoryList";
import DishList from "./DishList";
import {
  getFilteredDishes,
  addToCart,
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
import { Link, useHistory } from "react-router-dom";
import RestaurantMenuModal from "./restaurantMenuModal";
import axios from "axios";
import { baseUrl } from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAF9FB",
    width: "100%",
    minHeight: "100vh",
  },
  ButtonStyle: {
    backgroundColor: "#EC008C",
    color: "#fff",
    fontSize: ".7rem",
    fontWeight: "600",
    textTransform: "capitalize",
    margin: "10px 30px auto auto",
    height: "31px",
    paddingLeft: "60px",
    paddingRight: "60px",
    ["@media (max-width:1200px)"]: {
      // eslint-disable-line no-useless-computed-key
      margin: "10px 0px auto auto",
    },
  },

  CheckPackageButtonStyle: {
    backgroundColor: "#EC008C",
    color: "#fff",
    fontSize: ".7rem",
    fontWeight: "600",
    textTransform: "capitalize",
    margin: "auto 10px auto 10px",
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
    backgroundColor: "#EC008C",
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
  divider: { backgroundColor: "black", broder: "2px solid black" },
}));

const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const Menu = () => {
  const classes = useStyles();
  const [dishes, setDishes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedDish, setSelectedDish] = useState({});
  const [addOns, setAddOns] = useState([]);
  const [restaurantDrinks, setRestaurantDrinks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [openDishModal, setOpenDishModal] = useState(false);
  const [openDrinkModal, setOpenDrinkModal] = useState(false);
  const [openRestaurantMenuModal, setOpenRestaurantMenuModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [preCheckoutModal, setPreCheckoutModal] = useState(false);

  const [openmodal, setOpenmodal] = useState(false);
  const [disableCheck, setDisableCheck] = useState(false);

  const { user: currentUser, cart, discount } = Store();
  const updateStore = UpdateStore();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

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

  const handlePackageCheckClose = () => {
    setPreCheckoutModal(false);
  };

  const packageCheck = () => {
    if (currentUser.user.package && currentUser.user.packageExpiration) {
      checkout();
    } else {
      setPreCheckoutModal(true);
    }
  };

  const goToPackages = () => {
    handlePackageCheckClose();
    history.push("/profile");
  };

  const checkout = async () => {
    try {
      handlePackageCheckClose();
      setDisableCheck(true);
      let line_items = [];
      let restaurantTransferData = [];
      let discount = 0;

      if (
        moment().isBefore(currentUser.user.packageExpiration) &&
        currentUser.user.credits > 0
      ) {
        discount = currentUser.user.package.offPrice;
      }

      currentUser.user.cart.userCarts.map(async (restaurantCart) => {
        let total = 0;
        Promise.all(
          restaurantCart.dishes.map((restaurantItem) => {
            total +=
              parseFloat(restaurantItem.count) *
              parseFloat(restaurantItem.id.price) *
              100;

            total = String(total);
            if (total.indexOf(".") >= 0) {
              total = parseFloat(total.substring(0, total.indexOf(".")));
            }
            total = parseFloat(total);
            var s = String(restaurantItem.id.price * 100);
            if (s.indexOf(".") >= 0) {
              s = s.substring(0, s.indexOf("."));
            }
            line_items.push({
              price_data: {
                currency: "eur",
                product_data: {
                  name: restaurantItem.id.name,
                },
                unit_amount_decimal: parseFloat(s),
              },
              quantity: restaurantItem.count,
            });
            if (restaurantItem.addOns) {
              if (restaurantItem.addOns.length > 0) {
                restaurantItem.addOns.map((addOn) => {
                  addOn.choice.map((c) => {
                    {
                      var s = String(c.price * 100);
                      if (s.indexOf(".") >= 0) {
                        s = s.substring(0, s.indexOf("."));
                      }
                      total += parseFloat(c.price) * 100;
                      line_items.push({
                        price_data: {
                          currency: "eur",
                          product_data: {
                            name: c.name,
                          },
                          unit_amount_decimal: parseFloat(s),
                        },
                        quantity: 1,
                      });
                    }
                  });
                });
              }
            }
          })
        );
        restaurantTransferData.push({
          name: restaurantCart.restaurant.firstName,
          stripeId: restaurantCart.restaurant.restaurant.bank
            ? restaurantCart.restaurant.restaurant.bank.stripeID
            : "",
          totalAmmount: total,
          cartId: currentUser.user.cart._id,
          userId: currentUser.user.cart.user,
        });
      });

      var s = String(currentUser.user.company.block.deliveryCost * 100);
      if (s.indexOf(".") >= 0) {
        s = s.substring(0, s.indexOf("."));
      }

      line_items.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Frais de livraison",
          },
          unit_amount_decimal: parseFloat(s),
        },
        quantity: 1,
      });
      getSessionUrl(line_items, restaurantTransferData, discount);
    } catch (error) {
      console.log(error);
    }
  };

  const getSessionUrl = async (line_items, Tdata, discount) => {
    await axios
      .post(`${baseUrl}/user/checkout`, {
        line_items: line_items,
        restaurantTransferData: Tdata,
        discount: discount,
      })
      .then((data) => {
        window.location = data.data.url;
      })
      .catch((err) => {
        setDisableCheck(false);
        console.log(err);
      });
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
    let timeForOrder = moment()
      .hour(currentUser.user.company.block.timeForOrder.split("h")[0])
      .minute(
        currentUser.user.company.block.timeForOrder.split("h")[1].split("m")[0]
      );
    if (moment().isBefore(timeForOrder)) {
      handleRestaurantModalClose();
      setQuantity(1);
      const index = dishes.findIndex((d) => d._id === _id);
      setSelectedDish(dishes[index]);
      setOpenDishModal(true);
    } else {
      toast.info(
        "Les restaurants ne prennent plus de commandes aujourd'hui. Merci de revenir demain.",
        options
      );
    }
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

  const handleAddToCart = async (addOns) => {
    try {
      let addonsToSend = [];
      let selectedChoices = [];
      let error = false;
      toast.clearWaitingQueue();
      addOns.map((addOn) => {
        if (
          selectedDish.addOns[addOn.aIndex].min > 0 &&
          selectedDish.addOns[addOn.aIndex].min <
            selectedDish.addOns[addOn.aIndex].max
        ) {
          if (
            addOn.cIndex.length < selectedDish.addOns[addOn.aIndex].min ||
            addOn.cIndex.length > selectedDish.addOns[addOn.aIndex].max
          ) {
            error = true;
            return toast.info(
              "seulement " +
                selectedDish.addOns[addOn.aIndex].min +
                " à " +
                selectedDish.addOns[addOn.aIndex].max +
                " choix possibles pour " +
                selectedDish.addOns[addOn.aIndex].name,
              options
            );
          }
        } else if (
          selectedDish.addOns[addOn.aIndex].min ===
          selectedDish.addOns[addOn.aIndex].max
        ) {
          if (
            addOn.cIndex.length != selectedDish.addOns[addOn.aIndex].min ||
            addOn.cIndex.length != selectedDish.addOns[addOn.aIndex].max
          ) {
            error = true;
            return toast.info(
              "Sélectionnez " +
                selectedDish.addOns[addOn.aIndex].max +
                " choix en " +
                selectedDish.addOns[addOn.aIndex].name,
              options
            );
          }
        } else if (selectedDish.addOns[addOn.aIndex].min === 0) {
          if (addOn.cIndex.length < selectedDish.addOns[addOn.aIndex].max) {
            error = true;
            return toast.info(
              "Sélectionnez jusqu'à " +
                selectedDish.addOns[addOn.aIndex].max +
                " choix en " +
                selectedDish.addOns[addOn.aIndex].name,
              options
            );
          }
        }
        addOn.cIndex.map((c) => {
          selectedChoices.push(selectedDish.addOns[addOn.aIndex].choice[c]);
        });
        addonsToSend.push({
          name: selectedDish.addOns[addOn.aIndex].name,
          choice: selectedChoices,
        });
        selectedChoices = [];
      });

      if (!error) {
        const cart = await addToCart({
          dishId: selectedDish._id,
          dishPrice: selectedDish.price,
          dishCount: quantity,
          addOns: JSON.stringify(addonsToSend),
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
      } else {
        error = false;
      }
    } catch (error) {
      console.log(error);
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
        dishCartId: item._id,
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
                  justifyContent="left"
                  alignItems="center"
                  padding="10px"
                >
                  <Box marginLeft="6%" marginRight="6%">
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
                    <Button
                      variant="contained"
                      onClick={() => setOpenmodal(true)}
                      className={classes.contained}
                    >
                      En savoir plus
                    </Button>
                    <TransitionsModal
                      open={openmodal}
                      handleClose={() => setOpenmodal(false)}
                      body={
                        <div style={{ width: "34vw" }}>
                          <Typography variant="h6">
                            <b>
                              Invite des collègues et gagne des réductions !
                            </b>
                          </Typography>
                          <br />
                          <Typography variant="h8">
                            Partage ton code de parrainage à tes collègues.
                            Lorsqu’ils l’informent durant leur inscription, tu
                            obtiens gratuitement des réductions pour ta
                            prochaine commande !
                          </Typography>
                          <br />
                          <br />
                          <Typography variant="h8">
                            Ton code parrainage :{" "}
                            {currentUser.user.affiliateCode}
                          </Typography>
                          <br />
                          <br />
                          <Typography variant="h8">
                            Réduction obtenue par parrainage :{" "}
                            {discount.referralDiscount}€
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
                  src={Package}
                  alt="Delivery Bike"
                  style={{ height: "100px" }}
                />
              </Box>
              <Box>
                {currentUser.user && currentUser.user.package ? (
                  <>
                    <Typography style={{ color: "#EC008C" }} variant="body1">
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
                    <Typography style={{ color: "#EC008C" }} variant="body1">
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
                        <Basket
                          item={dish}
                          restaurant={item.restaurant}
                          onDelete={handleDeleteDish}
                        />
                      </>
                    ))
                  ) : (
                    <></>
                  )
                )}
                {cart.userCarts.some((item) => item.dishes.length > 0) ? (
                  <>
                    <Box>
                      <hr className={classes.divider} />
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body" style={{ fontSize: "0.9rem" }}>
                        Sous-Total
                      </Typography>
                      <Typography variant="subtitle2">
                        {String(currentUser.user.cart.totalPrice).indexOf(
                          "."
                        ) >= 0
                          ? String(currentUser.user.cart.totalPrice).substring(
                              0,
                              String(currentUser.user.cart.totalPrice).indexOf(
                                "."
                              ) + 3
                            )
                          : currentUser.user.cart.totalPrice}
                        €
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body" style={{ fontSize: "0.9rem" }}>
                        Frais de livraison
                      </Typography>
                      <Typography variant="subtitle2">
                        {currentUser.user.cart &&
                        String(
                          currentUser.user.company.block.deliveryCost
                        ).indexOf(".") >= 0
                          ? String(
                              currentUser.user.company.block.deliveryCost
                            ).substring(
                              0,
                              String(
                                currentUser.user.company.block.deliveryCost
                              ).indexOf(".") + 3
                            )
                          : currentUser.user.company.block.deliveryCost}
                        €
                      </Typography>
                    </Box>

                    {moment().isBefore(currentUser.user.packageExpiration) &&
                    currentUser.user.credits > 0 ? (
                      <Box
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body"
                          style={{ fontSize: "0.9rem" }}
                        >
                          Réduction
                        </Typography>
                        <Typography variant="subtitle2">
                          -{currentUser.user.package.offPrice}€
                        </Typography>
                      </Box>
                    ) : (
                      ""
                    )}

                    <Box>
                      <hr className={classes.divider} />
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body" style={{ fontSize: "0.9rem" }}>
                        Payé
                      </Typography>
                      <Typography variant="subtitle2">
                        {String(totalPrice()).indexOf(".") >= 0
                          ? String(totalPrice()).substring(
                              0,
                              String(totalPrice()).indexOf(".") + 3
                            )
                          : totalPrice()}
                        €
                      </Typography>
                    </Box>
                    <Box>
                      <hr className={classes.divider} />
                    </Box>
                    <Button
                      variant="contained"
                      className={classes.ButtonStyle}
                      onClick={() => {
                        packageCheck();
                      }}
                      disabled={disableCheck}
                    >
                      Checkout
                    </Button>
                  </>
                ) : (
                  <div className={classes.emptyCart}>
                    <img src={EmptyCart} alt="emptyCart" width="130px" />
                    <Typography
                      variant="caption"
                      color="initial"
                      style={{ paddingLeft: "5px" }}
                    >
                      Votre panier est vide.
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
                  Votre panier est vide.
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
              addOns={addOns}
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
      {preCheckoutModal && (
        <TransitionsModal
          open={preCheckoutModal}
          handleClose={() => handlePackageCheckClose()}
          body={
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Vous n’avez pas de packs de livraison, voulez-vous en acheter un
                ?
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  className={classes.CheckPackageButtonStyle}
                  onClick={() => {
                    goToPackages();
                  }}
                >
                  Oui
                </Button>
                <Button
                  variant="contained"
                  className={classes.CheckPackageButtonStyle}
                  onClick={() => {
                    checkout();
                  }}
                >
                  Non
                </Button>
              </div>
            </>
          }
        ></TransitionsModal>
      )}
    </>
  );
};

export default Menu;
