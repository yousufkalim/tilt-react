import "./App.css";
import React, { useEffect } from "react";
import {
  NavLink,
  Switch,
  Route,
  useLocation,
  Redirect,
  useHistory,
  BrowserRouter,
} from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ReactComponent as HomeIcon } from "./images/icons/home.svg";
import { ReactComponent as HistoricIcon } from "./images/icons/Historic.svg";
import { ReactComponent as UserIcon } from "./images/icons/user.svg";
import logo from "./images/Logo-white.png";
import Menu from "./screens/Menu/Menu";
import Orders from "./screens/orders/Orders";
import Signup from "./screens/signup/signup";
import { Box } from "@material-ui/core";
import HomePage from "./screens/HomePage/HomePage";
import { Store, UpdateStore } from "./context/StoreContext";
import auth from "./services/authService";
import {
  getLoggedinUser,
  getUserCart,
  getUserDiscounts,
} from "./services/userService";
import History from "./screens/History/history";
import Profile from "./screens/Profile/profile";
import { Logout } from "./images/images";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import RestaurantProfile from "./screens/Restaurant/restaurantProfile";
import AddBank from "./screens/Restaurant/addBank";
import Cgu from "../src/Components/Footer/cgu";
import { stripePK } from "../src/config";

const stripePromise = loadStripe(stripePK);

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      color: "#C72E54 !important",
      textDecoration: "none",
    },
  },

  active: {
    color: "#C72E54 !important",
    textDecoration: "none",
    width: "100%",
  },

  activeIcon: {
    backgroundColor: "#C72E54 !important",
    color: " #fff",
  },
  Link: {
    color: "black",
    "&:hover, :visited": {
      color: "#C72E54 !important",
    },
  },
  appBarHome: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBar: {
    marginLeft: `calc(${theme.spacing(9)}px)`,
    // paddingLeft: "10px",
    width: `calc(100% - ${theme.spacing(9)}px)`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: `calc(${drawerWidth}px)`,
    // paddingLeft: "10px",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 360,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(11) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
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
    backgroundColor: "rgb(210, 2, 73)",
    padding: "10px",
    marginRight: "15px",
    borderRadius: "50%",
  },
}));

function App() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const { token: authToken, role, user } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const getLoggedUser = async (token) => {
    const { data } = await getLoggedinUser();
    updateStore({ token, role: data.user.role, user: data.user });
  };

  const getDiscounts = async () => {
    const discount = await getUserDiscounts();
    updateStore({ discount });
  };

  const handleGetUserCart = async () => {
    const cart = await getUserCart();
    updateStore({ cart });
  };

  const handleLogout = () => {
    auth.logout();
    updateStore({ token: "", role: "", user: {}, cart: [], discount: {} });
    window.location = "/signup";
  };

  useEffect(() => {
    const token = auth.getJwt();
    if (token) {
      getLoggedUser(token);
      handleGetUserCart();
      getDiscounts();
    }
  }, [pathname, authToken]);
  let TOKEN = auth.getJwt();

  return (
    <Elements stripe={stripePromise}>
      <>
        <ToastContainer limit={1} />
        <div
          className={clsx(
            pathname === "/" || pathname === "/signup"
              ? classes.appBarHome
              : classes.appBar,
            {
              [classes.appBarShift]: open,
            }
          )}
        >
          <Box flexGrow={1}>
            {!TOKEN ? (
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/signup" component={Signup} />
                <Route path="/cgu" component={Cgu} />
                <Redirect from="*" to="/signup" />
              </Switch>
            ) : (
              <Switch>
                <Route
                  path="/signup"
                  render={() =>
                    !TOKEN ? (
                      <Signup />
                    ) : role === "user" ? (
                      history.push("/menu")
                    ) : (
                      history.push("/order")
                    )
                  }
                />
                {(role === "user" || role === "restaurant") && (
                  <Route path="/history">
                    <History />
                  </Route>
                )}
                {role === "user" && (
                  <Route path="/profile">
                    <Profile onLogout={handleLogout} />
                  </Route>
                )}
                {role === "user" && (
                  <Route path="/menu">
                    <Menu />
                  </Route>
                )}
                {role === "restaurant" && (
                  <Route path="/order">
                    <Orders />
                  </Route>
                )}
                {role === "restaurant" && (
                  <Route path="/profile">
                    <RestaurantProfile onLogout={handleLogout} />
                  </Route>
                )}
                {role === "restaurant" && (
                  <Route path="/addbank">
                    {user.restaurant.bank ? (
                      <RestaurantProfile onLogout={handleLogout} />
                    ) : (
                      <AddBank onLogout={handleLogout} />
                    )}
                  </Route>
                )}
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            )}
          </Box>
          {pathname !== "/" && pathname !== "/signup" && pathname !== "/cgu" && (
            <>
              <Box>
                <Drawer
                  variant="permanent"
                  className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                  })}
                  classes={{
                    paper: clsx({
                      [classes.drawerOpen]: open,
                      [classes.drawerClose]: !open,
                    }),
                  }}
                >
                  <div className={classes.toolbar}>
                    <div
                      style={{
                        marginTop: "20px",
                        textAlign: "center",
                        width: "100%",
                      }}
                      onClick={handleDrawerClose}
                    >
                      <img src={logo} alt="Home Icon" />
                    </div>
                  </div>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                    style={{ height: "100%" }}
                  >
                    <List>
                      {role === "user" && (
                        <>
                          {" "}
                          <ListItem
                            to="/menu"
                            component={NavLink}
                            activeClassName={
                              open ? classes.active : classes.activeOpen
                            }
                            className={classes.Link}
                          >
                            <ListItemIcon
                              to="/menu"
                              component={NavLink}
                              className={
                                pathname === "/menu"
                                  ? classes.activeListIcon
                                  : classes.listIcon
                              }
                            >
                              <HomeIcon
                                stroke={
                                  pathname === "/menu" ? "white" : "#6f7070"
                                }
                              />
                            </ListItemIcon>
                            <ListItemText
                              activeClassName={classes.active}
                              primary="Accueil"
                            />
                          </ListItem>
                          <ListItem
                            button
                            to="/history"
                            component={NavLink}
                            activeClassName={classes.active}
                            className={classes.Link}
                          >
                            <ListItemIcon
                              className={
                                pathname === "/history"
                                  ? classes.activeListIcon
                                  : classes.listIcon
                              }
                            >
                              <HistoricIcon
                                stroke={
                                  pathname === "/history" ? "white" : "#6f7070"
                                }
                              />
                            </ListItemIcon>
                            <ListItemText primary="Historique" />
                          </ListItem>
                          <ListItem
                            button
                            to="/profile"
                            component={NavLink}
                            className={classes.Link}
                            exact
                            activeClassName={classes.active}
                          >
                            <ListItemIcon
                              className={
                                pathname === "/profile"
                                  ? classes.activeListIcon
                                  : classes.listIcon
                              }
                            >
                              <UserIcon
                                fill="rgba(0,0,0,0)"
                                stroke={
                                  pathname === "/profile" ? "white" : "#6f7070"
                                }
                              />
                            </ListItemIcon>
                            <ListItemText primary="Mon compte" />
                          </ListItem>
                        </>
                      )}
                      {role === "restaurant" && (
                        <>
                          <ListItem
                            to="/order"
                            component={NavLink}
                            activeClassName={
                              open ? classes.active : classes.activeOpen
                            }
                            className={classes.Link}
                          >
                            <ListItemIcon
                              className={
                                pathname === "/order"
                                  ? classes.activeListIcon
                                  : classes.listIcon
                              }
                            >
                              <HomeIcon
                                stroke={
                                  pathname === "/order" ? "white" : "#6f7070"
                                }
                              />
                            </ListItemIcon>
                            <ListItemText
                              activeClassName={classes.active}
                              primary="Accueil"
                            />
                          </ListItem>
                          <ListItem
                            button
                            to="/history"
                            component={NavLink}
                            activeClassName={
                              open ? classes.active : classes.activeOpen
                            }
                            className={classes.Link}
                          >
                            <ListItemIcon
                              className={
                                pathname === "/history"
                                  ? classes.activeListIcon
                                  : classes.listIcon
                              }
                            >
                              <HistoricIcon
                                stroke={
                                  pathname === "/history" ? "white" : "#6f7070"
                                }
                              />
                            </ListItemIcon>
                            <ListItemText primary="Historique" />
                          </ListItem>
                          <ListItem
                            button
                            to="/profile"
                            component={NavLink}
                            className={classes.Link}
                            exact
                            activeClassName={classes.active}
                          >
                            <ListItemIcon
                              className={
                                pathname === "/profile"
                                  ? classes.activeListIcon
                                  : classes.listIcon
                              }
                            >
                              <UserIcon
                                fill="rgba(0,0,0,0)"
                                stroke={
                                  pathname === "/profile" ? "white" : "#6f7070"
                                }
                              />
                            </ListItemIcon>
                            <ListItemText primary="Mon compte" />
                          </ListItem>
                        </>
                      )}
                    </List>
                  </Box>

                  <List>
                    <ListItem
                      component="nav"
                      button
                      className={classes.Link}
                      onClick={handleLogout}
                    >
                      <ListItemIcon className={classes.listIcon}>
                        <img src={Logout} alt="logout" />
                      </ListItemIcon>
                      <ListItemText primary="Déconnexion" />
                    </ListItem>
                  </List>
                </Drawer>
              </Box>
            </>
          )}
        </div>
      </>
    </Elements>
  );
}

export default App;

const drawerWidth = 200;
