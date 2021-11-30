import React from "react";
import Typography from "@material-ui/core/Typography";
import InputWithLabel from "../../Components/common/inputWithLabel";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  form: { marginTop: "15px", maxWidth: "400px" },
  btn: {
    marginTop: "15px",
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
});

const PaymentMethodModal = ({ data, errors, handleChange, handleSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6">
        <b>Ajouter une carte de crédit</b>
      </Typography>
      <div className={classes.form}>
        <InputWithLabel
          value={data["name"]}
          label="Name"
          required={true}
          name="name"
          type="text"
          handleChange={handleChange}
          error={errors["name"] ? true : false}
          errorMessage={errors["name"]}
        />
        <InputWithLabel
          value={data["number"]}
          label="Number"
          required={true}
          name="number"
          type="text"
          handleChange={handleChange}
          error={errors["number"] ? true : false}
          errorMessage={errors["number"]}
        />

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <InputWithLabel
              value={data["cvc"]}
              label="Cvv"
              required={true}
              name="cvc"
              type="text"
              handleChange={handleChange}
              error={errors["cvc"] ? true : false}
              errorMessage={errors["cvc"]}
            />
          </Grid>
          <Grid item xs={4}>
            <InputWithLabel
              value={data["expiryMonth"]}
              label="Expiry Month"
              required={true}
              name="expiryMonth"
              type="text"
              handleChange={handleChange}
              error={errors["expiryMonth"] ? true : false}
              errorMessage={errors["expiryMonth"]}
            />
          </Grid>
          <Grid item xs={4}>
            <InputWithLabel
              value={data["expiryYear"]}
              label="Expiry Year"
              required={true}
              name="expiryYear"
              type="text"
              handleChange={handleChange}
              error={errors["expiryYear"] ? true : false}
              errorMessage={errors["expiryYear"]}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.btn}
          color="secondary"
          onClick={handleSubmit}
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
