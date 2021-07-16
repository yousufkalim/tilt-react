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
  getDishesForUser,
  getFilteredDishes,
} from "../../services/userService";
import { Store } from "../../context/StoreContext";

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
    margin: "5px 0 auto auto",
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
}));

const Menu = () => {
  const classes = useStyles();
  const [dishes, setDishes] = useState([]);
  const [filter, setFilter] = useState("all");
  const { user: currentUser } = Store();

  const getDishes = async () => {
    const dishesInDB = await getFilteredDishes(filter);
    setDishes(dishesInDB);
  };

  const handleFilterChange = async (filt) => {
    setFilter(filt);

    const dishesInDB = await getFilteredDishes(filt);
    setDishes(dishesInDB);
  };

  useEffect(() => {
    getDishes();
  }, []);

  return (
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
              <DishList dishes={dishes} />
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
              <img src={bike} alt="Delivery Bike" style={{ height: "100px" }} />
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
              <Button variant="contained" className={classes.Primarycontained}>
                En savoir plus
              </Button>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" padding="10px">
          <Typography variant="h6" color="initial">
            Votre panier
          </Typography>

          <Basket />
          <Basket />
          <Basket />
          <Button variant="contained" className={classes.ButtonStyle}>
            En savoir plus
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Menu;
