import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { getDishes } from "../../services/restaurantService";
import { Store } from "../../context/StoreContext";
import { deleteProfile } from "../../services/userService";
import { toast } from "react-toastify";
import TransitionsModal from "../../Components/common/transitionsModal";
import DishList from "./dishList";
import DishModal from "./dishModal";

const useStyles = makeStyles({
  main: {
    paddingTop: 20,
    backgroundColor: "#FAF9FB",
    minHeight: "100vh",
    paddingLeft: "40px",
    paddingRight: "50px",
  },
  menu: {
    marginTop: "50px",
    marginBottom: "20px",
  },
  details: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: 20,
    paddingBottom: "40px",
  },
  restaurantDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "15px",
    padding: 20,
    paddingTop: 40,
  },
  dishBtn: {
    backgroundColor: "#D20249",
    color: "white",
    fontSize: "10px",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#D20249",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
  deleteBtn: {
    backgroundColor: "black",
    color: "white",
    fontSize: "10px",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
  dishHeadings: {
    width: "100%",
    paddingLeft: "50px",
    marginTop: "10px",
    marginBottom: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    overflowY: "scroll",
    overflowX: "hidden",
    height: "60vh",
    width: "100%",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#D20249",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#D2025a",
    },
  },
});

const RestaurantProfile = ({ onLogout }) => {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_API_URL;

  const { user } = Store();
  const [openDishModal, setOpenDishModal] = useState(false);
  const [specials, setSpecials] = useState(false);
  const [dishes, setDishes] = useState({
    entrees: [],
    plats: [],
    desserts: [],
    drinks: [],
  });

  const getRestaurantDishes = async () => {
    const data = await getDishes();
    const entrees = data.filter((d) => d.dishType === "Starter");
    const plats = data.filter((d) => d.dishType === "Dish");
    const desserts = data.filter((d) => d.dishType === "Dessert");
    const drinks = data.filter((d) => d.dishType === "Drink");
    setDishes({
      entrees,
      plats,
      desserts,
      drinks,
    });
  };

  useEffect(() => {
    getRestaurantDishes();
  }, []);

  const handleEditDish = (_id) => {
    console.log(_id);
  };

  const handleDishModalOpen = () => setOpenDishModal(true);

  const handleDishModalClose = () => setOpenDishModal(false);

  const handleDeleteProfile = async () => {
    const check = window.confirm(
      "Are you Sure you want to delete tyour account?"
    );
    if (check) {
      try {
        await deleteProfile(user._id);
        onLogout();
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  // console.log(user);

  return (
    <div className={classes.main}>
      <Typography variant="h5">Mon Compte</Typography>

      <div className={classes.menu}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <div className={classes.details}>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h5">Mon Menu</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h5">
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.dishBtn}
                      onClick={handleDishModalOpen}
                    >
                      Ajouter un plat
                    </Button>
                  </Typography>
                </Grid>

                <DishList dishes={dishes} handleEditDish={handleEditDish} />
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.restaurantDetails}>
              <Typography variant="h5">{user.firstName}</Typography>
              <img
                src={`${baseUrl}/${user.restaurant.image}`}
                alt="Restaurant"
                width="200px"
              />
              <Typography variant="body2">{user.address.street}</Typography>
              <Typography variant="body2">{user.address.city}</Typography>
              <Button
                variant="contained"
                size="small"
                className={classes.dishBtn}
              >
                Informations bancaires
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={handleDeleteProfile}
                className={classes.deleteBtn}
              >
                Delete account
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <TransitionsModal
        open={openDishModal}
        handleClose={handleDishModalClose}
        body={
          <DishModal
          //     companies={companies}
          //     selectedCompany={selectedCompany}
          //     handleChange={handleCompanyChange}
          //     handleProfileSubmit={handleCompanySubmit}
          />
        }
      />
    </div>
  );
};

export default RestaurantProfile;
