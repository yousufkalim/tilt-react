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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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

const SignupForm = ({
  handleFormChange,
  handleFormSubmit,
  errors,
  data,
  companies,
}) => {
  const classes = useStyles();
  return (
    <div className="formDiv">
      <form>
        <Grid container spacing={2} style={{ marginTop: "-15px" }}>
          <Grid item zeroMinWidth xs>
            <InputWithLabel
              value={data["firstName"]}
              label="Prenom"
              required={true}
              name="firstName"
              type="text"
              handleChange={handleFormChange}
              error={errors["firstName"] ? true : false}
              errorMessage={errors["firstName"]}
            />
          </Grid>
          <Grid item zeroMinWidth xs>
            <InputWithLabel
              value={data["lastName"]}
              label="Nom"
              required={true}
              name="lastName"
              type="text"
              handleChange={handleFormChange}
              error={errors["lastName"] ? true : false}
              errorMessage={errors["lastName"]}
            />
          </Grid>
        </Grid>

        <InputWithLabel
          label="Email"
          value={data["email"]}
          required={true}
          name="email"
          type="email"
          handleChange={handleFormChange}
          error={errors["email"] ? true : false}
          errorMessage={errors["email"]}
        />
        <Grid container spacing={2} style={{ marginTop: "-15px" }}>
          <Grid item zeroMinWidth xs>
            <InputWithLabel
              value={data["password"]}
              label="Password"
              required={true}
              name="password"
              type="password"
              handleChange={handleFormChange}
              error={errors["password"] ? true : false}
              errorMessage={errors["password"]}
            />
          </Grid>
          <Grid item zeroMinWidth xs>
            <InputWithLabel
              value={data["confirmPassword"]}
              label="Confirm Password"
              required={true}
              name="confirmPassword"
              type="password"
              handleChange={handleFormChange}
              error={errors["confirmPassword"] ? true : false}
              errorMessage={errors["confirmPassword"]}
            />
          </Grid>
        </Grid>
        <InputWithLabel
          label="Code affilie"
          value={data["affiliate"]}
          name="affiliate"
          type="text"
          handleChange={handleFormChange}
          error={errors["affiliate"] ? true : false}
          errorMessage={errors["affiliate"]}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel style={{ color: "#d10248" }}>
            Selectionner une enterprise
          </InputLabel>
          <Select
            value={data["companyId"]}
            name="companyId"
            onChange={handleFormChange}
            label="Selectionner une enterprise"
            className={classes.outlined}
          >
            {companies.map((company) => (
              <MenuItem value={company._id}>{company.name}</MenuItem>
            ))}
          </Select>
          {errors["companyId"] && (
            <FormHelperText style={{ color: "#d10248" }}>
              {errors["companyId"]}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormControlLabel
            className={classes.checkBox}
            control={
              <Checkbox
                checked={data["terms"]}
                onChange={handleFormChange}
                name="terms"
              />
            }
            label="Terms and Conditions"
          />
          {errors["terms"] && (
            <FormHelperText style={{ color: "#d10248" }}>
              {errors["terms"]}
            </FormHelperText>
          )}
        </FormControl>

        <button type="submit" className="signUpBtn" onClick={handleFormSubmit}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
