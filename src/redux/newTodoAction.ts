import {
  addNewTodo,
  pendingNewTodo,
  failNewTodo,
  removeTodo,
  searchTodo,
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
