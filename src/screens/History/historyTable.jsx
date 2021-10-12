import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Store } from "../../context/StoreContext";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderSpacing: "0 1em",
    borderCollapse: "separate",
    margin: "1rem auto",
  },
  row: {
    backgroundColor: "white",
    fontSize: "10px",
    border: "2px red solid",
    borderRadius: "10px",
    "& :first-child": {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    "& :last-child": {
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
    },
  },
  cell: { border: "none" },
  headerCells: {
    border: "none",
    fontWeight: "bold",
  },
  btn: {
    background: "#C72E54",
    color: "white",
    fontSize: "10px",
    padding: "8px",
    borderRadius: "20px !important",
    border: "none",
    outline: "none",
    "&:hover": {
      background: "#C72E54",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

const HistoryTable = ({ history, handleOpen }) => {
  const classes = useStyles();
  const { role } = Store();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        {role === "user" ? (
          <TableHead>
            <TableRow classes={{ root: classes.row }}>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Date
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Restaurant
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Statut
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Total
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Crédit livraison
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
        ) : (
          <TableHead>
            <TableRow classes={{ root: classes.row }}>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Date
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Client Code
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Company
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Status
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Gain Restaurant
              </TableCell>
              <TableCell classes={{ root: classes.headerCells }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {role === "user" ? (
            <>
              {history.map((row) => (
                <TableRow classes={{ root: classes.row }} key={row._id}>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {moment(row.time).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {row.order[0].restaurant.firstName}
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {row.status == "In progress"
                      ? "En cours"
                      : row.status == "Completed"
                      ? "Terminé"
                      : row.status}
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {row.totalPrice}
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    Pas de forfait
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    <Button
                      size="small"
                      className={classes.btn}
                      onClick={() => handleOpen(row._id)}
                    >
                      Voir détail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            //Changes made to Restaurat Table
            <>
              {history.map((row) => (
                <TableRow classes={{ root: classes.row }} key={row._id}>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {moment(row?.completedAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {row.carts.map((cart) => (
                      <span key={cart._id}>
                        {cart.id ? cart?.id?.userCode : "N/A"} <br />
                      </span>
                    ))}
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {row?.company ? row?.company?.name : "N/A"}
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {row.status == "In progress"
                      ? "En cours"
                      : row.status == "Completed"
                      ? "Terminé"
                      : row.status}
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    {row.gain} €
                  </TableCell>
                  <TableCell classes={{ root: classes.cell }} align="center">
                    <Button
                      size="small"
                      className={classes.btn}
                      onClick={() => handleOpen(row._id)}
                    >
                      Voir détail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
