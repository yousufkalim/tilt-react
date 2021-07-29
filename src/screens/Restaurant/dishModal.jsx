import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputWithLabel from "../../Components/common/inputWithLabel";
import makeStyles from "@material-ui/styles/makeStyles";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  main: {
    height: "400px",
    overflowY: "scroll",
    paddingRight: "10px",
    "&::-webkit-scrollbar": {
      width: "10px",
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
  imgDiv: { display: "flex", flexDirection: "column", alignItems: "center" },
  form: { marginTop: "15px", maxWidth: "400px" },
  outlined: {
    textAlign: "left",
    "&.Mui-focused fieldset": {
      borderColor: "#d10248 !important",
    },
  },
  formControl: { width: "100%", marginBottom: "20px" },
});

const DishModal = ({ handleChange, dish, errors, imageBlob, handleSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h6">
        <b>Ajouter </b>
      </Typography>
      <div className={classes.imgDiv}>
        <label htmlFor="image">
          <input
            style={{ display: "none" }}
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />

          <Button
            variant="contained"
            component="span"
            color="secondary"
            style={{ fontSize: "10px" }}
          >
            Upload Image
          </Button>
        </label>
        {errors["image"] && (
          <Typography
            variant="caption"
            style={{ color: "red", marginLeft: "5px" }}
          >
            <b>{errors["image"]}</b>
          </Typography>
        )}
        {imageBlob.length > 0 && (
          <div className={classes.thumbnailDiv}>
            <img
              src={imageBlob}
              alt="thumbnail"
              width="100px"
              height="80px"
              className={classes.thumbnails}
            />
          </div>
        )}
      </div>
      <div className={classes.form}>
        <InputWithLabel
          value={dish["name"]}
          label="Nom du Plat"
          required={true}
          name="name"
          type="text"
          handleChange={handleChange}
          error={errors["name"] ? true : false}
          errorMessage={errors["name"]}
        />
        <InputWithLabel
          value={dish["price"]}
          label="Prix"
          required={true}
          name="price"
          type="number"
          handleChange={handleChange}
          error={errors["price"] ? true : false}
          errorMessage={errors["price"]}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel style={{ color: "#d10248" }}>Type de plat</InputLabel>
          <Select
            value={dish["type"]}
            name="type"
            onChange={handleChange}
            label="Type de plat"
            className={classes.outlined}
          >
            <MenuItem value="Starter">Entrées</MenuItem>
            <MenuItem value="Dish">Plat</MenuItem>
            <MenuItem value="Dessert">Dessert</MenuItem>
            <MenuItem value="Drink">Boissons</MenuItem>
          </Select>
          {errors["type"] && (
            <FormHelperText style={{ color: "#d10248" }}>
              {errors["type"]}
            </FormHelperText>
          )}
        </FormControl>
        <InputWithLabel
          value={dish["description"]}
          label="Description"
          required={true}
          name="description"
          type="text"
          multiline={true}
          handleChange={handleChange}
          error={errors["description"] ? true : false}
          errorMessage={errors["description"]}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ color: "#d10248" }}>
            Specificite
          </FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="Végétarien"
              name="specials"
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={dish.specials.includes("Végétarien")}
                />
              }
              onChange={handleChange}
              label="Végétarien"
            />
            <FormControlLabel
              value="Gluten-free"
              name="specials"
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={dish.specials.includes("Gluten-free")}
                />
              }
              onChange={handleChange}
              label="Gluten-free"
            />
            <FormControlLabel
              value="Halal"
              name="specials"
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={dish.specials.includes("Halal")}
                />
              }
              onChange={handleChange}
              label="Halal"
            />
            <FormControlLabel
              value="Sans allergènes"
              name="specials"
              control={
                <Checkbox
                  color="secondary"
                  size="small"
                  checked={dish.specials.includes("Sans allergènes")}
                />
              }
              onChange={handleChange}
              label="Sans allergènes"
            />
          </FormGroup>
        </FormControl>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maarginTop: "10px",
          maarginBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          component="span"
          color="secondary"
          style={{ fontSize: "12px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DishModal;
