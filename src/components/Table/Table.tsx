import { useEffect, useState } from "react";
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
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { Edit, Delete, Visibility } from "@material-ui/icons";
import { TListSort } from "../../Types";
import tasks from "../../Data/tasks";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable(props: any) {
  const classes = useStyles();

  useEffect(() => {
    props.setMyTask(props.myTask);
    console.log(tasks);
  }, [props.myTask]);

  console.log(props.myTask);

  
  const [todoData, setTodoData] = useState([...props.myTask]);

  const [listSort, setListSort] = useState<TListSort>({
    priority: 0,
    status: 0,
    deadline: 0,
  });

  function sortChangeButton(sort: string) {
    sort === "priority" &&
      (listSort.priority < 2
        ? setListSort({
            priority: listSort.priority + 1,
            status: 0,
            deadline: 0,
          })
        : setListSort({ priority: 0, status: 0, deadline: 0 }));

    sort === "status" &&
      (listSort.status < 2
        ? setListSort({ priority: 0, status: listSort.status + 1, deadline: 0 })
        : setListSort({ priority: 0, status: 0, deadline: 0 }));

    sort === "deadline" &&
      (listSort.deadline < 2
        ? setListSort({
            priority: 0,
            status: 0,
            deadline: listSort.deadline + 1,
          })
        : setListSort({ priority: 0, status: 0, deadline: 0 }));
  }

  useEffect(() => {
    setTodoData([...props.myTask]);
    listSort.status === 1 &&
      setTodoData([...todoData.sort((a, b) => a.status - b.status)]);
    listSort.status === 2 &&
      setTodoData([...todoData.sort((a, b) => b.status - a.status)]);

    listSort.priority === 1 &&
      setTodoData([...todoData.sort((a, b) => a.priority - b.priority)]);
    listSort.priority === 2 &&
      setTodoData([...todoData.sort((a, b) => b.priority - a.priority)]);

    listSort.deadline === 1 &&
      setTodoData([
        ...todoData.sort((a, b) => a.deadline.getTime() - b.deadline.getTime()),
      ]);
    listSort.deadline === 2 &&
      setTodoData([
        ...todoData.sort((a, b) => b.deadline.getTime() - a.deadline.getTime()),
      ]);
  }, [listSort]);

  function handleRemove(index: number) {
    setTodoData(todoData.filter((item: any) => item.id !== index));
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
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => sortChangeButton("priority")}
            >
              Priority
              {listSort.priority === 0 ? (
                <MdKeyboardArrowLeft size={24} />
              ) : listSort.priority === 1 ? (
                <MdKeyboardArrowDown size={24} />
              ) : (
                <MdKeyboardArrowUp size={24} />
              )}
            </TableCell>
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => sortChangeButton("status")}
            >
              Status
              {listSort.status === 0 ? (
                <MdKeyboardArrowLeft size={24} />
              ) : listSort.status === 1 ? (
                <MdKeyboardArrowDown size={24} />
              ) : (
                <MdKeyboardArrowUp size={24} />
              )}
            </TableCell>
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => sortChangeButton("deadline")}
            >
              Deadline
              {listSort.deadline === 0 ? (
                <MdKeyboardArrowLeft size={24} />
              ) : listSort.deadline === 1 ? (
                <MdKeyboardArrowDown size={24} />
              ) : (
                <MdKeyboardArrowUp size={24} />
              )}
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoData.map((item: any, index: number) => {
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
                    label={
                      item.priority === 2
                        ? "High"
                        : item.priority === 1
                        ? "Medium"
                        : "Low"
                    }
                    color={
                      item.priority === 2
                        ? "secondary"
                        : item.priority === 1
                        ? "primary"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={
                      item.status === 2
                        ? "Done"
                        : item.status === 1
                        ? "Doing"
                        : "Todo"
                    }
                    color={
                      item.status === 2
                        ? "secondary"
                        : item.status === 1
                        ? "primary"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${item.deadline.getFullYear()}/${
                      item.deadline.getMonth() + 1
                    }/${item.deadline.getDate()}`}
                    color={
                      item.deadline >=
                      new Date(Date.now() + 1000 * 60 * 60 * 24)
                        ? "primary"
                        : "secondary"
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <div className="icons w-50 d-flex justify-content-between align-items-center mx-auto">
                    <Visibility />
                    <Edit />
                    <Delete
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
