import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputWithLabel from "../../Components/common/inputWithLabel";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  main: {
    maxHeight: "400px",
    overflowY: "scroll",
    paddingRight: "10px",
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
  imgDiv: { display: "flex", flexDirection: "column", alignItems: "center" },
  form: { marginTop: "15px", maxWidth: "400px" },
  submitBtn: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "transparent",
    color: "#D20249",
    border: "1px solid #D20249",
    "&:focus": {
      outline: "none",
      backgroundColor: "transparent",
      color: "#D20249",
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: "#D20249",
    },
  },
  changeBtn: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    backgroundColor: "#D20249",
    color: "white",
    "&:focus": {
      outline: "none",
      backgroundColor: "#D20249",
      color: "white",
    },
    "&:hover": {
      backgroundColor: "#D20249",
      color: "white",
    },
  },
});

const RestaurantModal = ({
  data,
  errors,
  formType,
  imageBlob,
  passwordDetails,
  passwordErrors,
  onFormTypeChange,
  handleChange,
  handleSubmit,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h6">
        <b>
          {formType === "profile" ? "Mon Profil" : "Changer le mot de passe"}
        </b>
      </Typography>

      {formType === "profile" ? (
        <>
          <div className={classes.imgDiv}>
            <label htmlFor="image">
              <input
                style={{ display: "none" }}
                id="image"
                name="image"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleChange}
              />

              <Button
                variant="contained"
                component="span"
                color="secondary"
                style={{ fontSize: "10px" }}
              >
                Upload Image
              </Button>
            </label>

            {imageBlob.length > 0 && (
              <div>
                <img
                  src={imageBlob}
                  alt="thumbnail"
                  width="100px"
                  height="80px"
                />
              </div>
            )}
          </div>

          <div className={classes.form}>
            <InputWithLabel
              value={data["name"]}
              label="Nom"
              required={true}
              name="name"
              type="text"
              handleChange={handleChange}
              error={errors["name"] ? true : false}
              errorMessage={errors["name"]}
            />
            <InputWithLabel
              value={data["email"]}
              label="Address e-mail"
              required={true}
              name="email"
              type="email"
              handleChange={handleChange}
              error={errors["email"] ? true : false}
              errorMessage={errors["email"]}
            />
            <InputWithLabel
              value={data["street"]}
              label="Rue"
              required={true}
              name="street"
              type="text"
              handleChange={handleChange}
              error={errors["street"] ? true : false}
              errorMessage={errors["street"]}
            />
            <InputWithLabel
              value={data["city"]}
              label="Ville"
              required={true}
              name="city"
              type="text"
              handleChange={handleChange}
              error={errors["city"] ? true : false}
              errorMessage={errors["city"]}
            />
            <InputWithLabel
              value={data["postalCode"]}
              label="Code Postal"
              required={true}
              name="postalCode"
              type="text"
              handleChange={handleChange}
              error={errors["postalCode"] ? true : false}
              errorMessage={errors["postalCode"]}
            />
            <InputWithLabel
              value={data["pickupPlace"]}
              label="Pickup Place"
              required={true}
              name="pickupPlace"
              type="text"
              handleChange={handleChange}
              error={errors["pickupPlace"] ? true : false}
              errorMessage={errors["pickupPlace"]}
            />
            <InputWithLabel
              value={data["googleLink"]}
              label="Google Link"
              required={true}
              name="googleLink"
              type="text"
              handleChange={handleChange}
              error={errors["googleLink"] ? true : false}
              errorMessage={errors["googleLink"]}
            />
          </div>
          <Button
            className={classes.submitBtn}
            color="secondary"
            onClick={handleSubmit}
          >
            Mettre À jour
          </Button>
        </>
      ) : (
        <>
          <div className={classes.form}>
            <InputWithLabel
              value={passwordDetails.password}
              label="Motte de passe"
              required={true}
              name="password"
              type="password"
              handleChange={handleChange}
              error={passwordErrors["password"] ? true : false}
              errorMessage={passwordErrors["password"]}
            />
            <InputWithLabel
              value={passwordDetails.confirmPassword}
              label="Confirmer le mot de passe"
              required={true}
              name="confirmPassword"
              type="password"
              handleChange={handleChange}
              error={passwordErrors["confirmPassword"] ? true : false}
              errorMessage={passwordErrors["confirmPassword"]}
            />
            <Button
              className={classes.submitBtn}
              color="secondary"
              onClick={handleSubmit}
            >
              Mettre a jour
            </Button>
          </div>
        </>
      )}
      <Button
        variant="contained"
        className={classes.changeBtn}
        color="secondary"
        onClick={onFormTypeChange}
      >
        Changer le mot de passe
      </Button>
    </div>
  );
};

export default RestaurantModal;
