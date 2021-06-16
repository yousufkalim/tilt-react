import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { postContactForm } from "../../services/contactFormService";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#D10248",
  },
  contactForm: {
    textAlign: "center",
    alignItems: "center",
    marginBottom: "60px",
  },
  formDiv: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width: "500px",
  },
  contactField: {
    width: "100%",
    marginBottom: "20px",
    "& label.Mui-focused": {
      color: "#D10248",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#D10248",
      },
    },
  },
  form: {
    width: "45%",
  },
  resize: {
    height: "10px",
    fontSize: "14px",
  },
  font: {
    fontSize: "14px",
    outline: "#D10248",
  },
  labelRoot: {
    color: "#D10248",
    fontSize: "14px",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const ContactForm = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:768px)");
  const [data, setData] = useState({});

  const renderInput = (
    type,
    label,
    name,
    required,
    multiline = false,
    rows = 1
  ) => {
    return (
      <TextField
        id="outlined-basic"
        label={label}
        type={type}
        variant="outlined"
        rows={rows}
        required={required}
        name={name}
        multiline={multiline}
        className={classes.contactField}
        InputProps={{
          classes: !multiline
            ? { input: classes.resize }
            : { input: classes.font },
        }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
          },
        }}
        onChange={handleChange}
      />
    );
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const formData = { ...data };
    formData[name] = value;
    setData(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postContactForm(data);
  };

  return (
    <div className={classes.contactForm}>
      <h1 className={classes.heading}>Contact Us</h1>
      <div className={classes.formDiv}>
        <form
          autoComplete="on"
          className={classes.form}
          style={matches ? { width: "90%" } : {}}
        >
          {renderInput("text", "Prénom", "prenom", true)}
          {renderInput("text", "Nom", "nom", true)}
          {renderInput("number", "Numéro de téléphone", "phone", false)}
          {renderInput("email", "Adresse e-mail", "email", false)}
          {renderInput("text", "Message", "message", true, true, 5)}
          <div className={classes.buttonDiv}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
