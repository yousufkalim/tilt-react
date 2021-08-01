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
    // backgroundColor: "#D20249",
    // color: "white",
    // "&:focus": {
    //   outline: "none",
    //   backgroundColor: "#D20249",
    //   color: "white",
    // },
    // "&:hover": {
    //   backgroundColor: "#D20249",
    //   color: "white",
    // },
  },
});

const BankDetailsModal = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">
        <b>Ajouter Une Banque</b>
      </Typography>

      <div className={classes.form}>
        <InputWithLabel
          // value={data["name"]}
          label="Phone Number"
          required={true}
          name="phone"
          type="text"
          // handleChange={handleChange}
          // error={errors["name"] ? true : false}
          // errorMessage={errors["name"]}
        />
        <InputWithLabel
          // value={data["name"]}
          label="Date de Naissance"
          required={true}
          name="dateOfBirth"
          type="text"
          // handleChange={handleChange}
          // error={errors["name"] ? true : false}
          // errorMessage={errors["name"]}
        />
        <InputWithLabel
          // value={data["name"]}
          label="Nom de banque"
          required={true}
          name="bankName"
          type="text"
          // handleChange={handleChange}
          // error={errors["name"] ? true : false}
          // errorMessage={errors["name"]}
        />
        <InputWithLabel
          // value={data["name"]}
          label="Iban"
          required={true}
          name="iban"
          type="text"
          // handleChange={handleChange}
          // error={errors["name"] ? true : false}
          // errorMessage={errors["name"]}
        />

        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

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
                // onChange={handleChange}
              />

              <Button
                variant="contained"
                component="span"
                color="secondary"
                style={{ fontSize: "10px" }}
              >
                Face Avant
              </Button>
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
                // onChange={handleChange}
              />

              <Button
                variant="contained"
                component="span"
                color="secondary"
                style={{ fontSize: "10px" }}
              >
                Face Arrière
              </Button>
            </label>
          </div>
        </div>

        <Button
          className={classes.submitBtn}
          color="secondary"
          variant="contained"
          // onClick={handleSubmit}
        >
          Mettre À jour
        </Button>
      </div>
    </div>
  );
};

export default BankDetailsModal;
