import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputWithLabel from "../../Components/common/inputWithLabel";
import makeStyles from "@material-ui/styles/makeStyles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  form: { marginTop: "15px", maxWidth: "400px" },
  imgDiv: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
  submitBtn: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
  },
  textField: {
    width: "100%",
    // marginBottom: "15px",
    color: "red",
  },
});

const BankDetailsModal = ({
  data,
  errors,
  imageNames,
  handleChange,
  handleSubmit,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">
        <b>Ajouter Une Banque</b>
      </Typography>

      <div className={classes.form}>
        <InputWithLabel
          value={data["phone"]}
          label="Phone Number"
          required={true}
          name="phone"
          type="text"
          handleChange={handleChange}
          error={errors["phone"] ? true : false}
          errorMessage={errors["phone"]}
        />
        <InputWithLabel
          value={data["bankName"]}
          label="Nom de banque"
          required={true}
          name="bankName"
          type="text"
          handleChange={handleChange}
          error={errors["bankName"] ? true : false}
          errorMessage={errors["bankName"]}
        />
        <InputWithLabel
          value={data["iban"]}
          label="Iban"
          required={true}
          name="iban"
          type="text"
          placeholder="Entrez un numéro IBAN à 27 chiffres"
          handleChange={handleChange}
          error={errors["iban"] ? true : false}
          errorMessage={errors["iban"]}
        />

        <TextField
          value={data["dateOfBirth"]}
          name="dateOfBirth"
          id="dateOfBirth"
          label="Date de Naissance"
          type="date"
          color="secondary"
          className={classes.textField}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errors["dateOfBirth"] && (
          <Typography
            component="div"
            variant="caption"
            style={{ color: "red" }}
          >
            Date de Naissance is required and must be a valid Date
          </Typography>
        )}

        <Typography
          component="div"
          variant="caption"
          style={{ color: "#D20249", textAlign: "center" }}
        >
          <b>Télécharger l'identifiant Gouvernemental</b>
        </Typography>

        <div className={classes.imgDiv}>
          <div>
            <label htmlFor="front">
              <input
                style={{ display: "none" }}
                id="front"
                name="front"
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
                Face Avant
              </Button>{" "}
              <br />
              {imageNames.front ? imageNames.front : ""}
            </label>
          </div>

          <div>
            <label htmlFor="back">
              <input
                style={{ display: "none" }}
                id="back"
                name="back"
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
                Face Arrière
              </Button>
              <br />
              {imageNames.back ? imageNames.back : ""}
            </label>
          </div>
        </div>

        <Button
          className={classes.submitBtn}
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
        >
          Mettre À jour
        </Button>
      </div>
    </div>
  );
};

export default BankDetailsModal;
