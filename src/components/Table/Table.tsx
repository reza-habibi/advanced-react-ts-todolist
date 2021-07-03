import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Chip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  Task: string,
  Priority: string,
  Status: string,
  Deadline: string
) {
  return { Task, Priority, Status, Deadline };
}

const rows = [
  createData("Frozen yoghurt", "low", "Doing", "1400/4/15"),
  createData("Ice cream sandwich", "high", "Doing", "1400/4/15"),
  createData("Eclair", "high", "Doing", "1400/4/15"),
  createData("Cupcake", "high", "Doing", "1400/4/15"),
  createData("Gingerbread", "high", "Doing", "1400/4/15"),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
              >
                Task
              </TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Deadline</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  {row.Task}
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.Priority} color="secondary" />
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.Status} color="primary" />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.Deadline}
                    color="secondary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <div className="icons w-50 d-flex justify-content-between align-items-center mx-auto">
                    <VisibilityIcon />
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}