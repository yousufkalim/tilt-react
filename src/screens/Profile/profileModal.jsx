import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputWithLabel from "../../Components/common/inputWithLabel";

const useStyles = makeStyles({
  changeBtn: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "#EC008C",
    color: "white",
    "&:focus": {
      outline: "none",
      backgroundColor: "#EC008C",
      color: "white",
    },
    "&:hover": {
      backgroundColor: "#EC008C",
      color: "white",
    },
  },
  submitBtn: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "transparent",
    color: "#EC008C",
    border: "1px solid #EC008C",
    "&:focus": {
      outline: "none",
      backgroundColor: "transparent",
      color: "#EC008C",
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: "#EC008C",
    },
  },
  form: { marginTop: "15px", maxWidth: 400 },
});

const ProfileModal = ({
  formType,
  errors,
  handleFormChange,
  profileDetails,
  passwordDetails,
  handleProfileFormChange,
  handlePasswordChange,
  handleProfileSubmit,
  handlePasswordSubmit,
}) => {
  const classes = useStyles();

  return (
    <div>
      {formType === "profile" && (
        <>
          <Typography variant="h6">
            <b>Mon Profil</b>
          </Typography>

          <div className={classes.form}>
            <InputWithLabel
              value={profileDetails.firstName}
              label="Prenom"
              required={true}
              name="firstName"
              type="text"
              handleChange={handleProfileFormChange}
              error={errors["firstName"] ? true : false}
              errorMessage={errors["firstName"]}
            />
            <InputWithLabel
              value={profileDetails.lastName}
              label="Nom"
              required={true}
              name="lastName"
              type="text"
              handleChange={handleProfileFormChange}
              error={errors["lastName"] ? true : false}
              errorMessage={errors["lastName"]}
            />
            <InputWithLabel
              value={profileDetails.email}
              label="Addresse e-mail"
              required={true}
              name="email"
              type="text"
              handleChange={handleProfileFormChange}
              error={errors["email"] ? true : false}
              errorMessage={errors["email"]}
            />

            <InputWithLabel
              value={profileDetails.phone}
              label="Phone"
              required={true}
              name="phone"
              type="number"
              handleChange={handleProfileFormChange}
              error={errors["phone"] ? true : false}
              errorMessage={errors["phone"]}
            />
            <Button
              className={classes.submitBtn}
              color="secondary"
              onClick={handleProfileSubmit}
            >
              Mettre a jour
            </Button>
          </div>

          <Button
            variant="contained"
            className={classes.changeBtn}
            color="secondary"
            onClick={handleFormChange}
          >
            Changer le mot de passe
          </Button>
        </>
      )}

      {formType === "password" && (
        <>
          <Typography variant="h6">
            <b>Changer le mot de passe</b>
          </Typography>

          <div className={classes.form}>
            <InputWithLabel
              value={passwordDetails.password}
              label="Motte de passe"
              required={true}
              name="password"
              type="password"
              handleChange={handlePasswordChange}
              error={errors["password"] ? true : false}
              errorMessage={errors["password"]}
            />
            <InputWithLabel
              value={passwordDetails.confirmPassword}
              label="Confirmer le mot de passe"
              required={true}
              name="confirmPassword"
              type="password"
              handleChange={handlePasswordChange}
              error={errors["confirmPassword"] ? true : false}
              errorMessage={errors["confirmPassword"]}
            />
            <Button
              className={classes.submitBtn}
              color="secondary"
              onClick={handlePasswordSubmit}
            >
              Mettre a jour
            </Button>
          </div>
          <Button
            variant="contained"
            className={classes.changeBtn}
            color="secondary"
            onClick={handleFormChange}
          >
            Mon Profil
          </Button>
        </>
      )}
    </div>
  );
};

export default ProfileModal;
