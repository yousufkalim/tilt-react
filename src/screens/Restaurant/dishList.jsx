import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import MenuList from "./menuList";

const useStyles = makeStyles({
  dishHeadings: {
    width: "100%",
    paddingLeft: "50px",
    marginTop: "10px",
    marginBottom: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    overflowY: "scroll",
    overflowX: "hidden",
    height: "60vh",
    width: "100%",
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
});

const DishList = ({ dishes, handleEditDish }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h5" className={classes.dishHeadings}>
          <b>Entrée</b>
        </Typography>

        {dishes.entrees.length > 0 ? (
          <MenuList dishes={dishes.entrees} handleEdit={handleEditDish} />
        ) : (
          <Typography variant="body1" className={classes.dishHeadings}>
            Pas de Entrée
          </Typography>
        )}

        <Typography variant="h5" className={classes.dishHeadings}>
          <b>Plats</b>
        </Typography>
        {dishes.plats.length > 0 ? (
          <MenuList dishes={dishes.plats} handleEdit={handleEditDish} />
        ) : (
          <Typography variant="body1" className={classes.dishHeadings}>
            Pas de Plats
          </Typography>
        )}

        <Typography variant="h5" className={classes.dishHeadings}>
          <b>Desserts</b>
        </Typography>
        {dishes.desserts.length > 0 ? (
          <MenuList dishes={dishes.desserts} handleEdit={handleEditDish} />
        ) : (
          <Typography variant="body1" className={classes.dishHeadings}>
            Pas de Desserts
          </Typography>
        )}

        <Typography variant="h5" className={classes.dishHeadings}>
          <b>Drinks</b>
        </Typography>
        {dishes.drinks.length > 0 ? (
          <MenuList dishes={dishes.drinks} handleEdit={handleEditDish} />
        ) : (
          <Typography variant="body1" className={classes.dishHeadings}>
            Pas de Drinks
          </Typography>
        )}
      </div>
    </div>
  );
};

export default DishList;
