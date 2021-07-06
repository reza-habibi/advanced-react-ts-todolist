import { useState, useEffect, MouseEventHandler } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { tasks } from "../../Data/tasks";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const [task, setTask] = useState(tasks);

  useEffect(() => {
    let newTask = [...task];
    setTask(newTask);
  }, [tasks]);

  function handleRemove(index: number) {
    setTask(task.filter((item) => item.id !== index));
    console.log(index);
  }

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
          {task.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  {item.task}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={item.priority}
                    color={
                      item.priority.match("High")
                        ? "secondary"
                        : item.priority.match("Medium")
                        ? "primary"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={item.status}
                    color={
                      item.status.match("Todo")
                        ? "secondary"
                        : item.status.match("Doing")
                        ? "primary"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={item.deadline}
                    color="secondary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <div className="icons w-50 d-flex justify-content-between align-items-center mx-auto">
                    <VisibilityIcon />
                    <EditIcon />
                    <DeleteIcon
                      onClick={() => handleRemove(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function e(e: any): void {
  throw new Error("Function not implemented.");
}
