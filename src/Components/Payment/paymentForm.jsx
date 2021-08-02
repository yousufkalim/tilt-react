import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import { CardElement } from "@stripe/react-stripe-js";
import "../../styles/paymentForm.css";

const useStyles = makeStyles({
  btnDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "12px",
  },
});

const PaymentForm = ({
  stripe,
  completeCardStatus,
  handleSubmit,
  handleCompleteCard,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">Payment Form</Typography>
      <form className="Form">
        <fieldset className="FormGroup">
          <CardElement onChange={(e) => handleCompleteCard(e.complete)} />
        </fieldset>
        {/* {error && <ErrorMessage>{error.message}</ErrorMessage>}*/}
        <div className={classes.btnDiv}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!stripe || !completeCardStatus}
            onClick={handleSubmit}
            style={{ fontSize: "10px" }}
          >
            Payer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
