import React from "react";
import { Link } from "react-router-dom";
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
import CGV from "../../assets/CGV.pdf";

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
              label="Prénom"
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
          label="Adresse e-mail"
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
              label="Mot de passe"
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
              label="Confirmer le mot de passe"
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
          value={data["phone"]}
          label="Phone"
          required={true}
          name="phone"
          type="number"
          handleChange={handleFormChange}
          error={errors["phone"] ? true : false}
          errorMessage={errors["phone"]}
        />
        <InputWithLabel
          label="Code affilié"
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
            label="Sélectionner une entreprise"
            className={classes.outlined}
          >
            {companies.map((company) => (
              <MenuItem key={company._id} value={company._id}>
                {company.name}
              </MenuItem>
            ))}
            <MenuItem style={{ color: "#d10248" }} value={"suggest"}>
              Suggérer une entreprise
            </MenuItem>
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
              <>
                <Checkbox
                  checked={data["terms"]}
                  onChange={handleFormChange}
                  name="terms"
                  style={{ display: "inline" }}
                />
                <span>
                  Accepter les &nbsp;
                  <a target="blank" href={CGV}>
                    <span
                      style={{ textDecoration: "underline", color: "#d10248" }}
                    >
                      termes et conditions
                    </span>
                  </a>
                </span>
              </>
            }
          />
          {errors["terms"] && (
            <FormHelperText style={{ color: "#d10248" }}>
              {errors["terms"]}
            </FormHelperText>
          )}
        </FormControl>

        <button type="submit" className="signUpBtn" onClick={handleFormSubmit}>
          S’inscrire
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
