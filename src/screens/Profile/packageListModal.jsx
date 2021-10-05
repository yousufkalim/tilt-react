import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  main: {
    maxWidth: "400px",
    paddingRight: "10px",
  },
  // packages: { marginTop: "15px" },
  singlePackage: {
    marginTop: "15px",
    borderBottom: "1px solid #D20249",
    paddingBottom: "10px",
  },
  packages: {
    maxHeight: "400px",
    marginBottom: "10px",
    overflowY: "auto",
    marginBottom: "15px",
    "&::-webkit-scrollbar": {
      width: "7px",
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
  formControl: { width: "100%", marginTop: "0px" },
  outlined: {
    textAlign: "left",
    "&.Mui-focused fieldset": {
      borderColor: "#d10248 !important",
    },
  },
  btn: {
    marginTop: "15px",
    backgroundColor: "#D20249",
    width: "100%",
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
  test: {
    "&:focus": {
      color: "#D20249",
      border: "2px solid #D20249",
      padding: "10px",
    },
  },
});
const fnc = () => {
  console.log("HELLOOOO");
};

const PackageListModal = ({ packages, handleChange, handleSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h6">
        <b>Sélectionnez un Forfait</b>
      </Typography>

      <div className={classes.packages}>
        {packages.map((item) => (
          <div className={classes.singlePackage}>
            <div
              className={classes.test}
              tabindex="0"
              onClick={() => handleChange(item)}
            >
              <Typography component="div" variant="body1">
                <b>{item.name}</b>
              </Typography>
              <Typography component="div" variant="caption">
                Prix: {item.price}€
              </Typography>
              <Typography component="div" variant="caption">
                Crédits offerts: {item.credits}
              </Typography>
              <Typography component="div" variant="caption">
                Réduction par crédit: {item.offPrice}€
              </Typography>
              <Typography component="div" variant="caption">
                Expire dans: {item.expiration} journees
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        className={classes.btn}
        color="secondary"
        onClick={handleSubmit}
      >
        Modifier
      </Button>
    </div>
  );
};

export default PackageListModal;
