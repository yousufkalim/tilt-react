import React from "react";
import { makeStyles, Box, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DishImg from "../../images/Dish.png";
import { EditIcon } from "../../images/images";

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
    minWidth: "100px",
    justifyContent: "space-between",
  },
});

const Dish = ({ dish, handleEdit, handleDelete }) => {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_API_URL;

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
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(dish._id)}
          />
          <DeleteIcon
            style={{ color: "#C72E54", cursor: "pointer" }}
            onClick={() => handleDelete(dish._id)}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dish;
