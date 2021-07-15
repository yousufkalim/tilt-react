import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ProfileGrid from "./profileGrid";

const useStyles = makeStyles({
  main: {
    paddingTop: 20,
    backgroundColor: "#FAF9FB",
    minHeight: "100vh",
    paddingLeft: "40px",
    paddingRight: "50px",
    // minWidth: "100vw",
  },
  subheadingBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  affiliateCode: { margineLeft: "auto" },
  deleteBtn: {
    backgroundColor: "black",
    color: "white",
    fontSize: "10px",
    maxHeight: "100px",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

const Profile = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={2}>
          <Typography variant="h5">Mon Profil</Typography>
        </Grid>
        <Grid item xs={12} md={10} className={classes.subheadingBox}>
          <Typography variant="subtitle1" className={classes.affiliateCode}>
            Mon code affilié : Az124de
          </Typography>
          <Button className={classes.deleteBtn}>Delete account</Button>
        </Grid>
      </Grid>

      <ProfileGrid />
    </div>
  );
};

export default Profile;
