import React from "react";
import InputWithLabel from "../../Components/common/inputWithLabel";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/styles/makeStyles";
import "../../styles/signup.css";

const useStyles = makeStyles({
  formControl: { width: "100%" },
  checkBox: {
    width: "100%",
    color: "#d10248",
  },
  outlined: {
    textAlign: "left",
    "&.Mui-focused fieldset": {
      borderColor: "#d10248 !important",
    },
  },
});

const cities = [
  {
    name: "Riviére Salée",
    value: "RS",
  },
  {
    name: "Ducos",
    value: "DU",
  },
  {
    name: "Fort-de-France",
    value: "FDF",
  },
  {
    name: "Le Lamentin",
    value: "LAM",
  },
  {
    name: "Schoelcher",
    value: "SCH",
  },
  {
    name: "Sainte Luce",
    value: "SL",
  },
];

const AddCompany = ({ handleFormChange, handleFormSubmit, errors, data }) => {
  const classes = useStyles();
  return (
    <div className="formDiv">
      <form>
        <Grid container spacing={2} style={{ marginTop: "-15px" }}>
          <Grid item zeroMinWidth xs>
            <InputWithLabel
              value={data["name"]}
              label="Nom"
              required={true}
              name="name"
              type="text"
              handleChange={handleFormChange}
              error={errors["name"] ? true : false}
              errorMessage={errors["name"]}
            />
          </Grid>
          <Grid item zeroMinWidth xs>
            <InputWithLabel
              value={data["phone"]}
              label="Phone"
              required={true}
              name="phone"
              type="number"
              handleChange={handleFormChange}
              error={errors["phone"] ? true : false}
              errorMessage={errors["phone"]}
            />
          </Grid>
        </Grid>

        <InputWithLabel
          label="Delivery Place"
          value={data["deliveryPlace"]}
          required={true}
          name="deliveryPlace"
          type="text"
          handleChange={handleFormChange}
          error={errors["deliveryPlace"] ? true : false}
          errorMessage={errors["deliveryPlace"]}
        />
        <InputWithLabel
          value={data["street"]}
          label="Street"
          required={true}
          name="street"
          type="text"
          handleChange={handleFormChange}
          error={errors["street"] ? true : false}
          errorMessage={errors["street"]}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel shrink={true} style={{ color: "#d10248", zIndex: "100" }}>
            City
          </InputLabel>
          <Select
            value={data["city"]}
            name="city"
            onChange={handleFormChange}
            label="City"
            className={classes.outlined}
          >
            {cities.map((city) => (
              <MenuItem key={city.name} value={city.value}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
          {errors["city"] && (
            <FormHelperText style={{ color: "#d10248" }}>
              {errors["city"]}
            </FormHelperText>
          )}
        </FormControl>

        <button type="submit" className="signUpBtn" onClick={handleFormSubmit}>
          Ajouter une Entreprise
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
