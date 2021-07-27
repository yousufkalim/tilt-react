import React from "react";
import Typography from "@material-ui/core/Typography";
import InputWithLabel from "../../Components/common/inputWithLabel";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  form: { marginTop: "15px" },
});

const PaymentMethodModal = ({handlePaymentFormChange}) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6">
        <b>Ajouter une carte de crédit</b>
      </Typography>
      <div className={classes.form}>
        <InputWithLabel
          // value={data["firstName"]}
          label="Name"
          required={true}
          name="name"
          type="text"
          // handleChange={handleFormChange}
          // error={errors["firstName"] ? true : false}
          // errorMessage={errors["firstName"]}
        />
      </div>
    </div>
  );
};

export default PaymentMethodModal;
