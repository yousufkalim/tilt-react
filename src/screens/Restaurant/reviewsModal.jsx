import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import StarIcon from "@material-ui/icons/Star";
import moment from "moment";

const useStyles = makeStyles({
  reviewsDiv: {
    marginTop: "20px",
    minWidth: "60vh",
    maxHeight: "400px",
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
  review: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #EC008C",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "10px",
  },
  starIcon: {
    color: "#EC008C",
    transform: "translateY(5px)",
  },
});

const ReviewsModal = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6">
        <b>Voir Avis</b>
      </Typography>

      <div className={classes.reviewsDiv}>
        {data.map((item) => (
          <div className={classes.review}>
            <div>
              <Typography variant="body1">
                <b>{item.user.firstName + " " + item.user.lastName}</b>
              </Typography>
              <Typography variant="body1">
                {item.comment && `Revoir: ${item.comment}`}
              </Typography>
              <Typography variant="caption">
                Date: {moment(item.createdAt).format("DD/MM/YYYY")}
              </Typography>
            </div>
            <div>
              <Typography variant="body1">
                <StarIcon className={classes.starIcon} /> &nbsp;
                {item.rating}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsModal;
