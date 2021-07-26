import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  formControl: { width: "100%", marginTop: "15px" },
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

const CompanyModal = ({ companies, selectedCompany }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6">
        <b>Modifier l'entreprise</b>
      </Typography>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel style={{ color: "#d10248" }}>
          Selectionner une enterprise
        </InputLabel>
        <Select
          value={selectedCompany}
          name="companyId"
          // onChange={handleFormChange}
          label="Selectionner une enterprise"
          className={classes.outlined}
        >
          {companies.map((company) => (
            <MenuItem value={company._id}>{company.name}</MenuItem>
          ))}
        </Select>
        {/* {errors["companyId"] && (
          <FormHelperText style={{ color: "#d10248" }}>
            {errors["companyId"]}
          </FormHelperText>
        )} */}
      </FormControl>
    </div>
  );
};

export default CompanyModal;
