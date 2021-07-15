import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { historyData } from "../../mock/historyData";

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

const HistoryTable = () => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
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
        <TableBody>
          {historyData.map((row) => (
            <TableRow classes={{ root: classes.row }} key={row._id}>
              <TableCell classes={{ root: classes.cell }} align="center">
                {row.date}
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="center">
                {row.restaurant}
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="center">
                {row.statut}
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="center">
                {row.total}
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="center">
                {row.credit}
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align="center">
                <Button size="small" className={classes.btn}>
                  Voir détail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
