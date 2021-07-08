import "./App.css";
import React, { useEffect } from "react";
import { NavLink, Switch, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
    paddingLeft: "10px",
    width: `calc(100% - ${theme.spacing(9)}px)`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: `calc(${drawerWidth}px)`,
    paddingLeft: "10px",
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
      width: theme.spacing(9) + 1,
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
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    console.log("pathname", pathname);
  }, [pathname]);

  return (
    <React.Fragment>
      <>
        <ToastContainer />
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
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/menu">
                <Menu />
              </Route>
              <Route path="/order">
                <Orders />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Box>
          {pathname !== "/" && pathname !== "/signup" && (
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
                          activeClassName={classes.activeIcon}
                        >
                          <HomeIcon stroke="#6f7070" />
                        </ListItemIcon>
                        <ListItemText
                          activeClassName={classes.active}
                          primary="Accueil"
                        />
                      </ListItem>
                      <ListItem
                        button
                        to="/order"
                        component={NavLink}
                        activeClassName={classes.active}
                        className={classes.Link}
                      >
                        <ListItemIcon>
                          <HistoricIcon stroke="#6f7070" />
                        </ListItemIcon>
                        <ListItemText primary="Historique" />
                      </ListItem>
                      <ListItem
                        button
                        to="/"
                        component={NavLink}
                        className={classes.Link}
                        exact
                        activeClassName={classes.active}
                      >
                        <ListItemIcon>
                          <UserIcon fill="rgba(0,0,0,0)" stroke="#6f7070" />
                        </ListItemIcon>
                        <ListItemText primary="Mon compte" />
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </Box>
            </>
          )}
        </div>
      </>
    </React.Fragment>
  );
}

export default App;

const drawerWidth = 200;
