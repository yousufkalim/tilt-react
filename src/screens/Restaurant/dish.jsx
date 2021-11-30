import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { EditIcon } from "../../images/images";
import Switch from "@material-ui/core/Switch";
import { baseUrl } from "../../config";

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "5px 10px",
  margin: "auto",
};

const useStyles = makeStyles({
  iconBtn: {
    "&:focus": {
      outline: "none",
    },
  },
  priceBox: {
    display: "flex",
    minWidth: "150px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switch: {
    "& .MuiSwitch-colorSecondary.Mui-checked": { color: "#EC008C" },
  },
});

const Dish = ({ dish, handleEdit, handleDelete, handleDishStatus }) => {
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        width="90%"
        justifyContent="space-between"
        alignItems="center"
        style={cardStyle}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <img
              style={{ height: "60px", width: "60px", borderRadius: "50%" }}
              src={`${baseUrl}/${dish.image}`}
              alt="dish"
            />
          </Box>
          <Box paddingLeft="10px">
            <Typography variant="body1" color="initial">
              {dish.name}
            </Typography>
            <Typography variant="caption" color="initial">
              {dish.specials.join(", ")}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.priceBox}>
          <Typography variant="body1" color="initial">
            <b>{dish.price}€</b>
          </Typography>
          <img
            src={EditIcon}
            alt=""
            style={{ cursor: "pointer", width: "20px", height: "25px" }}
            onClick={() => handleEdit(dish._id)}
          />
          <Switch
            className={classes.switch}
            checked={dish.status === "Active" ? true : false}
            onChange={(e) => handleDishStatus(e, dish._id, dish.dishType)}
            name="status"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <DeleteIcon
            style={{ color: "#EC008C", cursor: "pointer" }}
            onClick={() => handleDelete(dish._id)}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dish;
