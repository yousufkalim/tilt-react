import React from "react";
import Typography from "@material-ui/core/Typography";
import InputWithLabel from "../../Components/common/inputWithLabel";
import makeStyles from "@material-ui/styles/makeStyles";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
  form: { marginTop: "15px", maxWidth: "400px" },
});

const DishModal = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">
        <b>Ajouter </b>
      </Typography>
      <div className={classes.form}>
        <InputWithLabel
          // value={data["firstName"]}
          label="Nom du Plat"
          required={true}
          name="name"
          type="text"
          // handleChange={handleFormChange}
          // error={errors["firstName"] ? true : false}
          // errorMessage={errors["firstName"]}
        />
        <InputWithLabel
          // value={data["firstName"]}
          label="Prix"
          required={true}
          name="name"
          type="text"
          // handleChange={handleFormChange}
          // error={errors["firstName"] ? true : false}
          // errorMessage={errors["firstName"]}
        />
        <InputWithLabel
          // value={data["firstName"]}
          label="Type de plat"
          required={true}
          name="name"
          type="text"
          // handleChange={handleFormChange}
          // error={errors["firstName"] ? true : false}
          // errorMessage={errors["firstName"]}
        />
        <InputWithLabel
          // value={data["firstName"]}
          label="Description"
          required={true}
          name="name"
          type="text"
          multiline={true}
          // handleChange={handleFormChange}
          // error={errors["firstName"] ? true : false}
          // errorMessage={errors["firstName"]}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Specificite</FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={<Checkbox color="primary" size="small" />}
              label="Top"
            />
            <FormControlLabel
              value="start"
              control={<Checkbox color="primary" size="small" />}
              label="Start"
            />
            <FormControlLabel
              value="bottom"
              control={<Checkbox color="primary" size="small" />}
              label="Bottom"
            />
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" size="small" />}
              label="End"
            />
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
};

export default DishModal;
