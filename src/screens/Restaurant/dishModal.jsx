import React, { useRef, useEffect } from "react";
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
import { Switch } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Store } from "../../context/StoreContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  main: {
    height: "600px",
    width: "600px",
    overflowY: "scroll",
    paddingRight: "10px",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#EC008C",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#D2025a",
    },
  },
  imgDiv: { display: "flex", flexDirection: "column", alignItems: "center" },
  form: { marginTop: "15px", maxWidth: "600px" },
  outlined: {
    textAlign: "left",
    "&.Mui-focused fieldset": {
      borderColor: "#EC008C !important",
    },
  },
  formControl: { width: "100%", marginBottom: "20px" },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "none",
    borderRadius: "10px",
    minWidth: "400px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  listIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    marginRight: "15px",
    borderRadius: "50%",
  },
  activeListIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EC008C",
    padding: "10px",
    marginRight: "15px",
    borderRadius: "50%",
  },
  Link: {
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover, :visited": {
      color: "#EC008C !important",
    },
  },
});
const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const DishModal = ({
  dish,
  errors,
  imageBlob,
  handleChange,
  handleDishPromoteStatus,
  handleSubmit,
  update,
}) => {
  const classes = useStyles();
  const { user } = Store();
  const [addOption, setAddOption] = React.useState(false);
  const [addChoice, setAddChoice] = React.useState(false);
  const [editOpt, setEditOpt] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [addOn, setAddOn] = React.useState(
    dish["addOns"].length > 0 ? dish["addOns"] : []
  );
  const [optionError, setOptionError] = React.useState("");

  const [choice, setChoice] = React.useState([]);
  const [choiceError, setChoiceError] = React.useState("");

  const [choiceName, setChoiceName] = React.useState("");
  const [choicePrice, setChoicePrice] = React.useState(0);
  const [optionName, setOptionName] = React.useState("");
  const [optionMin, setOptionMin] = React.useState(0);
  const [optionMax, setOptionMax] = React.useState(0);
  const [optionIndex, setOptionIndex] = React.useState(0);

  const handleAddOption = (e) => {
    setOptionError("");
    setChoice([]);
    setOptionName("");
    setOptionMin(0);
    setOptionMax(0);
    setChoiceName("");
    setChoicePrice(0);
    setAddOption(!addOption);
  };

  const handleAddChoice = (e) => {
    setAddChoice(!addChoice);
  };

  const handleAdd = (e) => {
    if (optionName === "") {
      setOptionError("Name Cannot be empty!");
    } else if (choice.length === 0) {
      setOptionError("Merci d'ajouter des choix!");
    } else if (optionMin > optionMax) {
      setOptionError("Minimum value cannot be greater than max value!");
    } else if (optionMax === 0 && optionMin === 0) {
      setOptionError("Maximum and minimum values cannot be zero");
    } else if (optionMax > choice.length) {
      setOptionError("Maximum value cannot be greater than all choices");
    } else {
      setOptionError("");
      setAddOn((prev) => [
        ...prev,
        { name: optionName, min: optionMin, max: optionMax, choice: choice },
      ]);

      let arr = [
        ...addOn,
        { name: optionName, min: optionMin, max: optionMax, choice: choice },
      ];

      handleChange(arr);
      setChoice([]);
      setOptionName("");
      setOptionMin(0);
      setOptionMax(0);
      setChoiceName("");
      setChoicePrice(0);
      setAddOption(!addOption);
    }
  };

  const removeOption = (index) => {
    setAddOn((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
    let arr = addOn;
    handleChange(arr);
  };

  const editOption = (index) => {
    setOptionError("");
    setChoice(addOn[index].choice);
    setOptionName(addOn[index].name);
    setOptionMin(addOn[index].min);
    setOptionMax(addOn[index].max);
    setOptionIndex(index);
    setAddOption(true);
    setEditOpt(true);
  };

  const handleOptionEdit = () => {
    if (optionName === "") {
      setOptionError("Name Cannot be empty!");
    } else if (choice.length === 0) {
      setOptionError("Merci d'ajouter des choix!");
    } else if (optionMin > optionMax) {
      setOptionError("Minimum value cannot be greater than max value!");
    } else if (optionMax === 0 && optionMin === 0) {
      setOptionError("Maximum and minimum values cannot be zero");
    } else if (optionMax > choice.length) {
      setOptionError("Maximum value cannot be greater than all choices");
    } else {
      setOptionError("");
      setAddOn((prev) => {
        prev[optionIndex] = {
          name: optionName,
          min: optionMin,
          max: optionMax,
          choice: choice,
        };
        return [...prev];
      });

      let temp = addOn;
      temp[optionIndex] = {
        name: optionName,
        min: optionMin,
        max: optionMax,
        choice: choice,
      };

      handleChange(temp);
      setChoice([]);
      setOptionName("");
      setOptionMin(0);
      setOptionMax(0);
      setChoiceName("");
      setChoicePrice(0);
      setEditOpt(false);
      setAddOption(!addOption);
    }
  };

  const OnAddChoice = (e) => {
    if (choiceName === "") {
      setChoiceError("Name Cannot be empty!");
    } else {
      setChoiceError("");
      setChoice((prev) => [
        ...prev,
        { name: choiceName, price: choicePrice ? choicePrice : 0 },
      ]);
      setChoiceName("");
      setChoicePrice(0);
      setAddChoice(!addChoice);
    }
  };

  const removeChoice = (index) => {
    setChoice((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

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
            Télécharger une image
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
        {user.restaurant?.isPremium && (
          <FormControlLabel
            style={{ width: "100%", justifyContent: "center" }}
            control={
              <Switch
                checked={dish["isPromoted"]}
                name="promote"
                onChange={handleDishPromoteStatus}
              />
            }
            label="Promote Dish"
          />
        )}
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
          <InputLabel style={{ color: "#EC008C" }}>Type de plat</InputLabel>
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
            <FormHelperText style={{ color: "#EC008C" }}>
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
          <FormLabel component="legend" style={{ color: "#EC008C" }}>
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

        <div>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{
                color: "#EC008C",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Options
              {!addOption ? (
                <AddCircleIcon
                  style={{ marginLeft: "10px" }}
                  onClick={handleAddOption}
                />
              ) : (
                <RemoveCircleIcon
                  style={{ marginLeft: "10px" }}
                  onClick={handleAddOption}
                />
              )}
              {optionError ? (
                <FormLabel
                  component="legend"
                  style={{
                    color: "#f44336",
                    fontSize: "0.75rem",
                    marginLeft: "20px",
                    marginTop: "6px",
                  }}
                >
                  {optionError}
                </FormLabel>
              ) : (
                <></>
              )}
            </FormLabel>
          </FormControl>
        </div>

        {addOption ? (
          <div style={{ padding: "20px", border: "1px solid lightgrey" }}>
            <InputWithLabel
              value={optionName}
              label="Nom de l'option"
              required={true}
              name="optionName"
              type="text"
              handleChange={(e) => setOptionName(e.target.value)}
              // error={errors["name"] ? true : false}
              // errorMessage={errors["name"]}
            />
            <FormLabel
              component="legend"
              style={{
                color: "#EC008C",
              }}
            >
              Nombre de choix à faire par le client :
            </FormLabel>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "10px",
              }}
            >
              <div style={{ width: "48%" }}>
                <InputWithLabel
                  value={optionMin}
                  label="Minimum"
                  required={true}
                  name="min"
                  type="number"
                  handleChange={(e) => setOptionMin(e.target.value)}
                  // error={errors["phone"] ? true : false}
                  // errorMessage={errors["phone"]}
                />
              </div>
              <div style={{ width: "48%" }}>
                <InputWithLabel
                  value={optionMax}
                  label="Maximum"
                  required={true}
                  name="max"
                  type="number"
                  handleChange={(e) => setOptionMax(e.target.value)}

                  // error={errors["phone"] ? true : false}
                  // errorMessage={errors["phone"]}
                />
              </div>
            </div>
            <FormLabel
              component="legend"
              style={{
                color: "#EC008C",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              Choix
              <Button
                variant="contained"
                component="span"
                color="secondary"
                style={{ fontSize: "10px", marginLeft: "20px" }}
                onClick={handleAddChoice}
              >
                AJOUTER DES CHOIX
              </Button>
            </FormLabel>
            {choice.length > 0 ? (
              <List>
                {choice.map((e, index) => {
                  return (
                    <ListItem button className={classes.Link}>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Name:
                        <ListItemText
                          style={{
                            marginLeft: "20px",
                            whiteSpace: "unset",
                            wordBreak: "break-all",
                          }}
                          primary={e.name}
                        />
                      </div>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Price:
                        <ListItemText
                          style={{
                            marginLeft: "20px",
                            whiteSpace: "unset",
                            wordBreak: "break-all",
                          }}
                          primary={e.price}
                        />
                      </div>
                      <ListItemIcon
                        className={classes.listIcon}
                        onClick={(o) => removeChoice(index)}
                      >
                        <CloseIcon style={{ color: "red" }} />
                      </ListItemIcon>
                    </ListItem>
                  );
                })}
              </List>
            ) : null}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {editOpt ? (
                <Button
                  variant="contained"
                  component="span"
                  color="secondary"
                  style={{ fontSize: "10px" }}
                  onClick={handleOptionEdit}
                >
                  MODIFIER LES OPTIONS
                </Button>
              ) : (
                <Button
                  variant="contained"
                  component="span"
                  color="secondary"
                  style={{ fontSize: "10px" }}
                  onClick={handleAdd}
                >
                  AJOUTER DES OPTIONS
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </div>
      {addOn.length > 0 ? (
        <List>
          {addOn.map((e, index) => {
            return (
              <ListItem button className={classes.Link}>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Name:
                  <ListItemText
                    style={{
                      marginLeft: "20px",
                      whiteSpace: "unset",
                      wordBreak: "break-all",
                    }}
                    primary={e.name}
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Minimum:
                  <ListItemText
                    style={{
                      marginLeft: "20px",
                      whiteSpace: "unset",
                      wordBreak: "break-all",
                    }}
                    primary={e.min}
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Maximum:
                  <ListItemText
                    style={{
                      marginLeft: "20px",
                      whiteSpace: "unset",
                      wordBreak: "break-all",
                    }}
                    primary={e.max}
                  />
                </div>
                <ListItemIcon
                  className={classes.listIcon}
                  onClick={(o) => removeOption(index)}
                >
                  <CloseIcon style={{ color: "red" }} />
                </ListItemIcon>
                <ListItemIcon
                  className={classes.listIcon}
                  onClick={(o) => editOption(index)}
                >
                  <EditIcon style={{ color: "#EC008C" }} />
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          component="span"
          color="secondary"
          style={{ fontSize: "12px" }}
          onClick={handleSubmit}
        >
          Soumettre
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addChoice}
        onClose={handleAddChoice}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addChoice}>
          <div className={classes.paper}>
            <FormLabel
              component="legend"
              style={{
                color: "#EC008C",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              Ajouter des Choix
            </FormLabel>
            <InputWithLabel
              value={choiceName}
              label="Nom du choix"
              required={true}
              name="choiceName"
              type="text"
              handleChange={(e) => setChoiceName(e.target.value)}
            />
            <InputWithLabel
              value={choicePrice}
              label="Prix"
              required={true}
              name="price"
              type="number"
              handleChange={(e) => setChoicePrice(e.target.value)}
              // error={errors["name"] ? true : false}
              // errorMessage={errors["name"]}
            />
            {choiceError ? (
              <FormLabel
                component="legend"
                style={{
                  color: "#f44336",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  fontSize: "0.75rem",
                }}
              >
                {choiceError}
              </FormLabel>
            ) : (
              <></>
            )}

            <Button
              variant="contained"
              component="span"
              color="secondary"
              style={{ fontSize: "10px" }}
              onClick={(e) => OnAddChoice(e)}
            >
              AJOUTER
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DishModal;
