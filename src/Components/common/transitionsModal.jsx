import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      borderRadius: "10px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 3),
      minWidth: "400px",
    },
  })
);

export default function TransitionsModal({ open, handleClose, body }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>{body}</div>
        </Fade>
      </Modal>
    </div>
  );
}
