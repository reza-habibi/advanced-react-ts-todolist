import {
  addNewTodo,
  pendingNewTodo,
  failNewTodo,
  removeTodo,
  searchTodo,
  showMode,
  currentTodo,
  editMode,
  editTodo,
  filteredTodo,
} from "./todoSlicer";
import { TTask } from "../type";

export const newTodo =
  (formData: TTask) =>
  (dispatch: (arg0: { payload: any; type: string }) => void) => {
    try {
      dispatch(pendingNewTodo());

      dispatch(addNewTodo(formData));
    } catch (error) {
      dispatch(failNewTodo(error));
    }
  };

export const removeTodos =
  (id: string) =>
  (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(removeTodo(id));
  };

export const filterSearchTodo =
  (str: string) =>
  (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(searchTodo(str));
  };

export const showCurrentTodo =
  (todo: TTask) =>
  (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(showMode(true));
    dispatch(currentTodo(todo));
  };

export const editCurrentTodo =
  (todo: TTask) =>
  (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(editMode(true));
    dispatch(editTodo(todo));
  };

export const filterTodos =
  (filter: { priority: number; status: number; deadline: number }) =>
  (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(filteredTodo(filter));
  };
