import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Joi from "joi-browser";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ProfileGrid from "./profileGrid";
import { Store, UpdateStore } from "../../context/StoreContext";
import TransitionsModal from "../../Components/common/transitionsModal";
import CompanyModal from "./companyModal";
import { getAllCompanies } from "../../services/companyService";
import {
  payForUserPackage,
  deleteProfile,
  editUserCompany,
  editUserDetails,
  editUserPassword,
  updateUserCard,
  addPackageToUser,
} from "../../services/userService";
import PaymentMethodModal from "./paymentMethodModal";
import ProfileModal from "./profileModal";
import { toast } from "react-toastify";
import { getAllPackages } from "../../services/packageService";
import PackageListModal from "./packageListModal";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import PaymentForm from "../../Components/Payment/paymentForm";

const useStyles = makeStyles({
  main: {
    paddingTop: 20,
    backgroundColor: "#FAF9FB",
    minHeight: "100vh",
    paddingLeft: "40px",
    paddingRight: "50px",
    // minWidth: "100vw",
  },
  subheadingBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  affiliateCode: { margineLeft: "auto" },
  deleteBtn: {
    backgroundColor: "black",
    color: "white",
    fontSize: "10px",
    maxHeight: "100px",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

const Profile = ({ onLogout }) => {
  const classes = useStyles();
  const { user } = Store();
  const stripe = useStripe();
  const elements = useElements();
  const updateStore = UpdateStore();

  const [openCompanyModal, setOpenCompanyModal] = useState(false);
  const [openPaymentyModal, setOpenPaymentyModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openPackageListModal, setOpenPackageListModal] = useState(false);
  const [openPackagePaymentModal, setOpenPackagePaymentModal] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const [profileFormType, setProfileFormType] = useState("profile");
  const [companies, setCompanies] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedCompany, setselectedCompany] = useState("");
  const [profileErrors, setProfileErrors] = useState({});
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });
  const [cardErrors, setCardErrors] = useState({});
  const [passwordDetails, setPasswordDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    getCompanies();
    getPackages();
    setProfileDetails({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setselectedCompany(user.user.company._id);
  }, []);

  const handleCompanyModalOpen = () => setOpenCompanyModal(true);
  const handleCompanyModalClose = () => setOpenCompanyModal(false);

  const handlePackageListModalOpen = () => setOpenPackageListModal(true);
  const handlePackageListModalClose = () => setOpenPackageListModal(false);

  const handlePackageChange = ({ target }) => {
    setSelectedPackage(target.value);
  };
  const handleCompleteCardStatus = (status) => setCardComplete(status);

  const handlePackagePaymentModalOpen = () => setOpenPackagePaymentModal(true);
  const handlePackagePaymentModalClose = () => {
    setOpenPackagePaymentModal(false);
    setSelectedPackage("");
  };

  const handlePackageSelectionSubmit = () => {
    if (selectedPackage) {
      handlePackageListModalClose();
      handlePackagePaymentModalOpen();
    } else {
      toast.error("Select a Package First");
    }
  };

  const handlePackagePayment = async () => {
    const cardElement = elements.getElement(CardElement);
    const cardObjectWithToken = await stripe.createToken(cardElement);
    const card = { card: { id: cardObjectWithToken.token.card.id } };

    try {
      await payForUserPackage({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        token: cardObjectWithToken.token.id,
        card: card,
        amount: selectedPackage.price,
      });

      const data = await addPackageToUser(selectedPackage._id);
      updateStore({ user: data.user });
      handlePackagePaymentModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentModalOpen = () => setOpenPaymentyModal(true);
  const handlePaymentModalClose = () => {
    setOpenPaymentyModal(false);
    setCardErrors({});
    setCardDetails({
      name: "",
      number: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    });
  };

  const handleProfileModalOpen = () => setOpenProfileModal(true);
  const handleProfileModalClose = () => {
    setOpenProfileModal(false);
    setProfileDetails({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setPasswordDetails({ password: "", confirmPassword: "" });
    setProfileErrors({});
    setProfileFormType("profile");
  };

  const handleProfileFormTypeChange = () => {
    if (profileFormType === "profile") {
      setProfileFormType("password");
    } else {
      setProfileFormType("profile");
    }
  };

  const getCompanies = async () => {
    const data = await getAllCompanies();
    setCompanies(data);
  };

  const getPackages = async () => {
    const data = await getAllPackages();
    setPackages(data);
  };

  const handleCompanyChange = ({ target }) => {
    setselectedCompany(target.value);
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: paymentSchema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const paymentSchema = {
    name: Joi.string().min(3).required().label("Name"),
    number: Joi.string().min(16).max(16).required().label("Card Number"),
    expiryMonth: Joi.string().min(2).min(2).required().label("Expiry Month"),
    expiryYear: Joi.string().min(2).min(2).required().label("Expiry Year"),
    cvc: Joi.string().min(3).max(3).required().label("CVC"),
  };

  const handlePaymentFormChange = ({ target }) => {
    const { name, value } = target;
    const allErrors = { ...cardErrors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) allErrors[name] = errorMessage;
    else delete allErrors[name];
    setCardErrors(allErrors);

    const formData = { ...cardDetails };
    formData[name] = value;
    setCardDetails(formData);
  };

  const handlePaymentFormSubmit = async () => {
    let errors = validate(cardDetails, paymentSchema);
    setCardErrors(errors || {});
    if (errors) return;

    try {
      const { name, number, expiryMonth, expiryYear, cvc } = cardDetails;
      const data = await updateUserCard({
        number,
        name,
        date: expiryMonth,
        year: expiryYear,
        code: cvc,
      });
      updateStore({ user: data.user });
      handlePaymentModalClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompanySubmit = async () => {
    const data = await editUserCompany(selectedCompany);
    updateStore({ user: data.user });
    handleCompanyModalClose();
  };

  const profileSchema = {
    firstName: Joi.string().min(3).required().label("First Name"),
    lastName: Joi.string().min(3).required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
  };

  const handleProfileForm = ({ target }) => {
    const { name, value } = target;
    const allErrors = { ...profileErrors };
    const errorMessage = validateProfileProperty(name, value);
    if (errorMessage) allErrors[name] = errorMessage;
    else delete allErrors[name];
    setProfileErrors(allErrors);

    const formData = { ...profileDetails };
    formData[name] = value;
    setProfileDetails(formData);
  };

  const validateProfileProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: profileSchema[name],
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

  const handleProfileFormSubmit = async () => {
    let errors = validate(profileDetails, profileSchema);
    setProfileErrors(errors || {});

    if (errors) return;
    try {
      const data = await editUserDetails(user._id, profileDetails);
      updateStore({ user: data.user });
      handleProfileModalClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePasswordChange = ({ target }) => {
    const { name, value } = target;
    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  const handlePasswordChangeSubmit = async () => {
    const { password, confirmPassword } = passwordDetails;

    if (password.length < 5 || confirmPassword.length < 5) {
      toast.error("Password Length cannot be less than 5 characters");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Password Does Not Match");
      return;
    }

    try {
      await editUserPassword({
        password: passwordDetails.password,
      });
      handleProfileModalClose();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

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

  return (
    <div className={classes.main}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={2}>
          <Typography variant="h5">Mon Profil</Typography>
        </Grid>
        <Grid item xs={12} md={10} className={classes.subheadingBox}>
          <Typography variant="subtitle1" className={classes.affiliateCode}>
            Mon code affilié : {user.user.affiliateCode}
          </Typography>
          <Button className={classes.deleteBtn} onClick={handleDeleteProfile}>
            Delete account
          </Button>
        </Grid>
      </Grid>

      <ProfileGrid
        user={user}
        handleCompanyModal={handleCompanyModalOpen}
        handlePaymentyModal={handlePaymentModalOpen}
        handleProfileModal={handleProfileModalOpen}
        handlePackageListModal={handlePackageListModalOpen}
      />

      <TransitionsModal
        open={openPaymentyModal}
        handleClose={handlePaymentModalClose}
        body={
          <PaymentMethodModal
            data={cardDetails}
            errors={cardErrors}
            handleChange={handlePaymentFormChange}
            handleSubmit={handlePaymentFormSubmit}
          />
        }
      />

      <TransitionsModal
        open={openCompanyModal}
        handleClose={handleCompanyModalClose}
        body={
          <CompanyModal
            companies={companies}
            selectedCompany={selectedCompany}
            handleChange={handleCompanyChange}
            handleSubmit={handleCompanySubmit}
          />
        }
      />

      <TransitionsModal
        open={openProfileModal}
        handleClose={handleProfileModalClose}
        body={
          <ProfileModal
            formType={profileFormType}
            errors={profileErrors}
            profileDetails={profileDetails}
            passwordDetails={passwordDetails}
            handleProfileSubmit={handleProfileFormSubmit}
            handlePasswordSubmit={handlePasswordChangeSubmit}
            handleFormChange={handleProfileFormTypeChange}
            handleProfileFormChange={handleProfileForm}
            handlePasswordChange={handlePasswordChange}
          />
        }
      />

      <TransitionsModal
        open={openPackageListModal}
        handleClose={handlePackageListModalClose}
        body={
          <PackageListModal
            packages={packages}
            handleSubmit={handlePackageSelectionSubmit}
            handleChange={handlePackageChange}
          />
        }
      />

      <TransitionsModal
        open={openPackagePaymentModal}
        handleClose={handlePackagePaymentModalClose}
        body={
          <PaymentForm
            stripe={stripe}
            completeCardStatus={cardComplete}
            handleCompleteCard={handleCompleteCardStatus}
            handleSubmit={handlePackagePayment}
          />
        }
      />
    </div>
  );
};

export default Profile;
