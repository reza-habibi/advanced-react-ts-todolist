import { Edit, Delete, Visibility } from "@material-ui/icons";
import { TableCell, TableRow, Chip } from "@material-ui/core";
import { useAppDispatch } from "../../../app/hooks";
import {
  removeTodos,
  showCurrentTodo,
  editCurrentTodo,
} from "../../../redux/newTodoAction";
import { openModal } from "../../../redux/todoSlicer";
import { DateObject } from "react-multi-date-picker";
import { TTask } from "../../../type";

function TableBodyRow({ item }: { item: TTask }) {
  const dispatch = useAppDispatch();
  const { id, task, priority, status, deadline } = item;

  const today = new DateObject({ calendar: "persian" });

  const handleView = () => {
    dispatch(showCurrentTodo(item));
    dispatch(openModal(true));
  };

  const handleEdit = () => {
    dispatch(editCurrentTodo(item));
    dispatch(openModal(true));
  };

  return (
    <TableRow>
      <TableCell
        component="th"
        scope="row"
        style={{
          borderRight: "1px solid rgba(224, 224, 224, 1)",
        }}
      >
        {task}
      </TableCell>
      <TableCell align="center">
        <Chip
          label={priority === 3 ? "High" : priority === 2 ? "Medium" : "Low"}
          color={
            priority === 3
              ? "secondary"
              : priority === 2
              ? "primary"
              : "default"
          }
        />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={status === 3 ? "Done" : status === 2 ? "Doing" : "Todo"}
          color={
            status === 3 ? "secondary" : status === 2 ? "primary" : "default"
          }
        />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={`${deadline.year}/${deadline.month}/${deadline.day}`}
          color={
            deadline.dayOfBeginning >= today.dayOfBeginning
              ? "primary"
              : "secondary"
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell align="center">
        <div className="icons w-50 d-flex justify-content-between align-item-center mx-auto">
          <Visibility
            onClick={() => handleView()}
            style={{ cursor: "pointer" }}
          />
          <Edit onClick={() => handleEdit()} style={{ cursor: "pointer" }} />
          <Delete
            onClick={() => dispatch(removeTodos(id))}
            style={{ cursor: "pointer" }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableBodyRow;
