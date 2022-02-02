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
} from "./todoSlicer";
import { TTask } from "../type";

export const newTodo = (formData: TTask) => (dispatch: any) => {
  try {
    dispatch(pendingNewTodo());

    dispatch(addNewTodo(formData));
  } catch (error) {
    dispatch(failNewTodo(error));
  }
};

export const removeTodos = (id: string) => (dispatch: any) => {
  dispatch(removeTodo(id));
};

export const filterSearchTodo = (str: string) => (dispatch: any) => {
  dispatch(searchTodo(str));
};

export const showCurrentTodo = (todo: TTask) => (dispatch: any) => {
  dispatch(showMode(true));
  dispatch(currentTodo(todo));
};

export const editCurrentTodo = (todo: TTask) => (dispatch: any) => {
  console.log(todo);
  dispatch(editMode(true));
  dispatch(editTodo(todo));
};
