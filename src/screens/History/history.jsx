import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import HistoryTable from "./historyTable";
import { getOrderHistory } from "../../services/userService";
import { getOrderHistory as restaurantHistory } from "../../services/restaurantService";
import { Store } from "../../context/StoreContext";
import TransitionsModal from "../../Components/common/transitionsModal";
import UserHistoryModal from "./userHistoryModal";
import RestaurantHistoryModal from "./restaurantHistoryModal";

const useStyles = makeStyles({
  main: {
    paddingTop: 20,
    backgroundColor: "#FAF9FB",
    minHeight: "100vh",
    paddingLeft: "40px",
    paddingRight: "50px",
    // minWidth: "100vw",
  },
  historyGrid: { marginTop: "40px" },
  container: {
    backgroundColor: "white",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "700px",
  },
});

const History = () => {
  const classes = useStyles();
  const { role } = Store();
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState({});
  const [openUserHistory, setOpenUserHistory] = useState(false);
  const [openRestHistory, setOpenRestHistory] = useState(false);

  const handleUserHistoryOpen = (_id) => {
    const index = history.findIndex((h) => h._id === _id);
    setSelectedHistory(history[index]);
    setOpenUserHistory(true);
  };

  const handleUserHistoryClose = () => {
    setOpenUserHistory(false);
  };

  const handleRestHistoryOpen = (_id) => {
    const index = history.findIndex((h) => h._id === _id);
    setSelectedHistory(history[index]);
    setOpenRestHistory(true);
  };

  const handleRestHistoryClose = () => {
    setOpenRestHistory(false);
  };

  const getUserOrderHistory = async () => {
    const orderHistory = await getOrderHistory();
    setHistory(orderHistory);
  };

  const getRestaurantOrderHistory = async () => {
    const orderHistory = await restaurantHistory();
    setHistory(orderHistory);
  };

  useEffect(() => {
    if (role === "user") {
      getUserOrderHistory();
    } else if (role === "restaurant") {
      getRestaurantOrderHistory();
    }
  }, []);

  return (
    <div className={classes.main}>
      <Typography variant="h5">Historique des commandes</Typography>

      <HistoryTable
        history={history}
        handleOpen={
          role === "user" ? handleUserHistoryOpen : handleRestHistoryOpen
        }
      />

      {role === "user" && (
        <TransitionsModal
          open={openUserHistory}
          handleClose={handleUserHistoryClose}
          body={<UserHistoryModal data={selectedHistory} />}
        />
      )}

      {role === "restaurant" && (
        <TransitionsModal
          open={openRestHistory}
          handleClose={handleRestHistoryClose}
          body={<RestaurantHistoryModal data={selectedHistory} />}
        />
      )}
    </div>
  );
};

export default History;
