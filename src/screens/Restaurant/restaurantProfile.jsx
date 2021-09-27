import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  createDish,
  deleteDish,
  editRestaurant,
  editRestaurantBank,
  getDishById,
  getDishes,
  updateDish,
  updateDishStatus,
  addPremiumDish,
  removePremiumDish,
} from "../../services/restaurantService";
import { Store, UpdateStore } from "../../context/StoreContext";
import {
  deleteProfile,
  editUserPassword,
  getRestaurantReviews,
} from "../../services/userService";
import { toast } from "react-toastify";
import TransitionsModal from "../../Components/common/transitionsModal";
import DishList from "./dishList";
import DishModal from "./dishModal";
import { EditIcon } from "../../images/images";
import RestaurantModal from "./restaurantModal";
import BankDetailsModal from "./bankDetailsModal";
import ReviewsModal from "./reviewsModal";

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
});

const RestaurantProfile = ({ onLogout }) => {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_API_URL;

  const { user } = Store();
  const updateStore = UpdateStore();
  const [openDishModal, setOpenDishModal] = useState(false);
  const [openBankInfoModal, setOpenBankInfoModal] = useState(false);
  const [openRestaurantModal, setOpenRestaurantModal] = useState(false);
  const [openReviewsModal, setOpenReviewsModal] = useState(false);
  const [dishes, setDishes] = useState({
    entrees: [],
    plats: [],
    desserts: [],
    drinks: [],
  });
  const [dishData, setDishData] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    description: "",
    specials: [],
    isPromoted: "",
  });
  const [unchangedDishData, setUnchangedDishData] = useState({});
  const [dishImageBlob, setDishImageBlob] = useState("");
  const [dishUpdate, setDishUpdate] = useState(false);
  const [promoteStatusChanged, setPromoteStatusChanged] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState("");
  const [dishErrors, setDishErrors] = useState({});
  const [restaurantPassword, setRestaurantPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const [profileImageBlob, setProfileImageBlob] = useState("");
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    pickupPlace: "",
    image: "",
    googleLink: "",
  });
  const [restaurantErrors, setRestaurantErrors] = useState({});
  const [profileFormType, setProfileFormType] = useState("profile");
  const [bankDetails, setBankDetails] = useState({
    phone: "",
    dateOfBirth: "",
    bankName: "",
    iban: "",
    front: "",
    back: "",
  });
  const [bankErrors, setBankErrors] = useState({});
  const [imageNames, setImageNames] = useState({ front: "", back: "" });
  const [reviews, setReviews] = useState([]);

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

  const getReviews = async () => {
    const data = await getRestaurantReviews(user._id);
    setReviews(data);
  };

  useEffect(() => {
    getRestaurantDishes();
    getReviews();
  }, []);

  const handleDishModalOpen = () => setOpenDishModal(true);
  const handleRestaurantModalOpen = () => {
    setRestaurantData({
      name: user.firstName,
      email: user.email,
      street: user.address.street,
      city: user.address.city,
      postalCode: user.address.zip,
      pickupPlace: user.restaurant.pickupPlace,
      googleLink: user.restaurant.googleLink ? user.restaurant.googleLink : "",
    });
    setProfileImageBlob(`${baseUrl}/${user.restaurant.image}`);
    setOpenRestaurantModal(true);
  };

  const handleDishModalClose = () => {
    setOpenDishModal(false);
    setUnchangedDishData();
    setDishData({
      name: "",
      price: "",
      type: "",
      image: "",
      description: "",
      specials: [],
      isPromoted: "",
    });
    setDishErrors({});
    setDishImageBlob("");
    setDishUpdate(false);
    setSelectedDishId("");
    setPromoteStatusChanged(false);
  };

  const handleRestaurantModalClose = () => {
    setOpenRestaurantModal(false);
    setRestaurantData({
      name: "",
      email: "",
      street: "",
      city: "",
      postalCode: "",
      pickupPlace: "",
      image: "",
      googleLink: "",
    });
    setRestaurantErrors({});
    setProfileFormType("profile");
    setRestaurantPassword({ password: "", confirmPassword: "" });
    setPasswordErrors({});
    setProfileImageBlob("");
    // setDishUpdate(false);
  };

  const handleBankInfoOpen = () => setOpenBankInfoModal(true);
  const handleBankInfoClose = () => {
    setOpenBankInfoModal(false);
    setBankDetails({
      phone: "",
      dateOfBirth: "",
      bankName: "",
      iban: "",
      front: "",
      back: "",
    });
    setBankErrors({});
    setImageNames({ front: "", back: "" });
  };

  const handleBankInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === "front" || name === "back") {
      const formData = { ...bankDetails };
      formData[name] = e.target.files[0];
      setBankDetails(formData);
      setImageNames({ ...imageNames, [name]: e.target.files[0].name });
    } else {
      const formData = { ...bankDetails };
      const allErrors = { ...bankErrors };
      const errorMessage = validateProperty(name, value, bankSchema);
      if (errorMessage) allErrors[name] = errorMessage;
      else delete allErrors[name];
      setBankErrors(allErrors);

      formData[name] = value;
      setBankDetails(formData);
    }
  };

  const handleBankInfoSubmit = async () => {
    let errors = validate(bankDetails, bankSchema);
    setBankErrors(errors || {});
    if (errors) return;

    const bankInfo = { ...bankDetails };
    if (!bankInfo.front || !bankInfo.back) {
      toast.error("Face Avant and Face Arrière are required");
    }

    try {
      const data = await editRestaurantBank(appendBankInforToFormData());
      updateStore({ user: data.restaurant });
      handleBankInfoClose();
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const appendBankInforToFormData = () => {
    const fd = new FormData();
    const date = JSON.stringify(new Date(bankDetails.dateOfBirth));
    fd.append("phone", bankDetails.phone);
    fd.append("DOB", date);
    fd.append("bankName", bankDetails.bankName);
    fd.append("iban", bankDetails.iban);
    fd.append("front", bankDetails.front);
    fd.append("back", bankDetails.back);

    return fd;
  };

  const handleReviewsModalOpen = () => setOpenReviewsModal(true);
  const handleReviewsModalClose = () => setOpenReviewsModal(false);

  const bankSchema = {
    phone: Joi.string().required().label("Phone Number"),
    dateOfBirth: Joi.date().required().label("Date de Naissance"),
    bankName: Joi.string().required().label("Nom de banque"),
    iban: Joi.string().min(27).required().label("Iban"),
    front: Joi.required().label("Face Avant"),
    back: Joi.required().label("Face Arrière"),
  };

  const restaurantSchema = {
    name: Joi.string().min(3).required().label("Nom"),
    email: Joi.string().email().required().label("Address e-mail"),
    street: Joi.string().required().label("Rue"),
    city: Joi.string().min(2).required().label("Ville"),
    postalCode: Joi.string().min(3).required().label("Code Postal"),
    pickupPlace: Joi.string().min(3).required().label("Pickup Place"),
    image: Joi.allow(""),
    googleLink: Joi.string().min(3).required(),
  };

  const handleFormTypeChange = () => {
    if (profileFormType === "profile") {
      setProfileFormType("password");
      setRestaurantErrors({});
      setRestaurantData({
        name: "",
        email: "",
        street: "",
        city: "",
        postalCode: "",
        pickupPlace: "",
        image: "",
        googleLink: "",
      });
    } else {
      setProfileFormType("profile");
      setPasswordErrors({});
      setRestaurantPassword({ password: "", confirmPassword: "" });
    }
  };

  const handleRestaurantDataChange = (e) => {
    const { name, value } = e.target;

    if (profileFormType === "profile") {
      const formData = { ...restaurantData };

      if (name === "image") {
        formData[name] = e.target.files[0];
        if (e.target.files[0]) {
          setProfileImageBlob(URL.createObjectURL(e.target.files[0]));
        }
      } else {
        const allErrors = { ...restaurantErrors };
        const errorMessage = validateProperty(name, value, restaurantSchema);
        if (errorMessage) allErrors[name] = errorMessage;
        else delete allErrors[name];
        setRestaurantErrors(allErrors);

        formData[name] = value;
      }
      setRestaurantData(formData);
    }
    if (profileFormType === "password") {
      const formData = { ...restaurantPassword };
      formData[name] = value;
      setRestaurantPassword(formData);
    }
  };

  const appendRestaurantToFormData = () => {
    const data = { ...restaurantData };
    const address = {
      street: data.street,
      city: data.city,
      zip: data.postalCode,
    };

    var fd = new FormData();
    fd.append("email", data.email);
    fd.append("name", data.name);
    fd.append("address", JSON.stringify(address));
    fd.append("pickupPlace", data.pickupPlace);
    fd.append("googleLink", data.googleLink);
    if (data.image) {
      fd.append("image", data.image);
    }
    return fd;
  };

  const handleRestaurantDataSubmit = async () => {
    if (profileFormType === "profile") {
      let errors = validate(restaurantData, restaurantSchema);
      setRestaurantErrors(errors || {});
      if (errors) return;

      try {
        const data = await editRestaurant(appendRestaurantToFormData());
        updateStore({ user: data.restaurant });
        handleRestaurantModalClose();
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
    if (profileFormType === "password") {
      const { password, confirmPassword } = restaurantPassword;
      if (password.length === 0 || confirmPassword.length === 0) {
        setPasswordErrors({
          password: "Both Fields are required",
          confirmPassword: "Both Fields are required",
        });
      } else if (password.length < 5 || confirmPassword.length < 5) {
        setPasswordErrors({
          password: "Password cannot be less than 5 characters",
          confirmPassword: "Password cannot be less than 5 characters",
        });
      } else if (password !== confirmPassword) {
        setPasswordErrors({
          password: "Password does not match",
          confirmPassword: "Password does not match",
        });
      } else {
        setPasswordErrors({});
        try {
          await editUserPassword({
            password: password,
          });
          handleRestaurantModalClose();
        } catch (err) {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  const handleDeleteProfile = async () => {
    const check = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ?"
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

  const dishSchema = {
    name: Joi.string().min(3).required().label("Name"),
    price: Joi.number().min(1).required().label("Price"),
    image: Joi.required().label("Dish Image"),
    type: Joi.string().required().label("Type"),
    description: Joi.string().required().min(5).label("Description"),
    specials: Joi.array(),
    isPromoted: Joi.boolean(),
  };

  const validateProperty = (name, value, schemaName) => {
    const obj = { [name]: value };
    const schema = {
      [name]: schemaName[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const validate = (data, schema) => {
    const options = { abortEarly: false };
    let errors = {};
    const result = Joi.validate(data, schema, options);
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path] = item.message;
    }

    return errors;
  };

  const handleDishDataChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "specials") {
      const allSpecials = [...dishData.specials];
      if (checked) {
        allSpecials.push(value);
        setDishData({ ...dishData, specials: allSpecials });
      } else {
        const index = allSpecials.indexOf(value);
        allSpecials.splice(index, 1);
        setDishData({ ...dishData, specials: allSpecials });
      }
    } else {
      const allErrors = { ...dishErrors };
      const errorMessage = validateProperty(name, value, dishSchema);
      if (errorMessage) allErrors[name] = errorMessage;
      else delete allErrors[name];
      setDishErrors(allErrors);

      const formData = { ...dishData };
      if (name === "image") {
        formData[name] = e.target.files[0];
        if (e.target.files[0]) {
          setDishImageBlob(URL.createObjectURL(e.target.files[0]));
        }
      } else {
        formData[name] = value;
      }
      setDishData(formData);
    }
  };

  const handleEditDish = async (_id) => {
    setDishUpdate(true);
    setSelectedDishId(_id);
    try {
      const data = await getDishById(_id);
      setDishData({
        name: data.name,
        price: data.price,
        specials: data.specials,
        type: data.dishType,
        description: data.description,
        isPromoted: data.isPromoted ? true : false,
        image: "",
      });
      setUnchangedDishData({ isPromoted: data.isPromoted ? true : false });
      setDishImageBlob(`${baseUrl}/${data.image}`);
      handleDishModalOpen();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleDishPromoteStatus = ({ target }, _id) => {
    const dish = { ...dishData };
    if (unchangedDishData.isPromoted !== target.checked) {
      setPromoteStatusChanged(true);
    } else setPromoteStatusChanged(false);

    dish.isPromoted = target.checked;
    setDishData(dish);
  };

  const handleDishDelete = async (_id) => {
    const check = window.confirm("Êtes-vous sûr de vouloir supprimer cela ?");
    if (check) {
      try {
        await deleteDish(_id);
        getRestaurantDishes();
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleDishSubmit = async () => {
    let errors = validate(dishData, dishSchema);
    if (dishUpdate && errors) {
      delete errors.image;
    }

    setDishErrors(errors || {});
    if (errors) return;

    const data = { ...dishData };
    if (dishUpdate) {
      if (data.image.length < 1) {
        delete data.image;
      }
      data._id = selectedDishId;
      try {
        if (promoteStatusChanged) {
          const body = {
            restaurantId: user._id,
            dishId: selectedDishId,
          };
          if (data.isPromoted) {
            await addPremiumDish(body);
          } else {
            await removePremiumDish(body);
          }
        }
        await updateDish(appendToFormData(data));
        getRestaurantDishes();
        handleDishModalClose();
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      try {
        await createDish(appendToFormData(data));
        getRestaurantDishes();
        handleDishModalClose();
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  const appendToFormData = (data) => {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("price", data.price);
    fd.append("dishType", data.type);
    fd.append("description", data.description);
    fd.append("isPromoted", data.isPromoted);
    fd.append("specials", JSON.stringify(data.specials));
    if (data.image) {
      fd.append("image", data.image);
    }
    if (data._id) {
      fd.append("dishId", data._id);
    }
    return fd;
  };

  const handleDishStatus = async ({ target }, _id, dishType) => {
    const body = {
      dishId: _id,
      status: target.checked ? "Active" : "Inactive",
    };
    try {
      await updateDishStatus(body);
      getRestaurantDishes();
    } catch (error) {
      toast.error("Ann Error Occurred");
    }
  };

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

                <DishList
                  dishes={dishes}
                  handleEditDish={handleEditDish}
                  handleDishDelete={handleDishDelete}
                  handleDishStatus={handleDishStatus}
                />
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.restaurantDetails}>
              <Typography variant="h5">
                {user.firstName}{" "}
                <img
                  src={EditIcon}
                  alt=""
                  style={{ cursor: "pointer", marginLeft: "6px" }}
                  onClick={handleRestaurantModalOpen}
                />
              </Typography>
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
                onClick={handleBankInfoOpen}
              >
                Informations bancaires
              </Button>

              <Button
                variant="contained"
                size="small"
                className={classes.dishBtn}
                onClick={handleReviewsModalOpen}
              >
                Voir avis
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={handleDeleteProfile}
                className={classes.deleteBtn}
              >
                Supprimer le compte
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
            dish={dishData}
            errors={dishErrors}
            handleChange={handleDishDataChange}
            handleSubmit={handleDishSubmit}
            imageBlob={dishImageBlob}
            handleDishPromoteStatus={handleDishPromoteStatus}
            update={dishUpdate}
          />
        }
      />
      <TransitionsModal
        open={openRestaurantModal}
        handleClose={handleRestaurantModalClose}
        body={
          <RestaurantModal
            formType={profileFormType}
            data={restaurantData}
            errors={restaurantErrors}
            onFormTypeChange={handleFormTypeChange}
            handleChange={handleRestaurantDataChange}
            passwordDetails={restaurantPassword}
            passwordErrors={passwordErrors}
            handleSubmit={handleRestaurantDataSubmit}
            imageBlob={profileImageBlob}
          />
        }
      />

      <TransitionsModal
        open={openBankInfoModal}
        handleClose={handleBankInfoClose}
        body={
          <BankDetailsModal
            data={bankDetails}
            errors={bankErrors}
            imageNames={imageNames}
            handleChange={handleBankInfoChange}
            handleSubmit={handleBankInfoSubmit}
          />
        }
      />

      <TransitionsModal
        open={openReviewsModal}
        handleClose={handleReviewsModalClose}
        body={<ReviewsModal data={reviews} />}
      />
    </div>
  );
};

export default RestaurantProfile;
