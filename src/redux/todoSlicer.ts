import { createSlice } from "@reduxjs/toolkit";
import { TTask } from "../type";

const initialState: {
  loading: boolean;
  todos: TTask[];
  error: string;
  searchTodo: TTask[];
} = {
  loading: false,
  todos: [],
  error: "",
  searchTodo: [],
};

const NewTodoSlicer = createSlice({
  name: "todo",
  initialState,
  reducers: {
    pendingNewTodo: (state) => {
      state.loading = true;
    },
    addNewTodo: (state, { payload }) => {
      state.loading = false;
      state.todos = [...state.todos, payload];
      state.searchTodo = [...state.todos];
    },
    failNewTodo: (state, { payload }) => {
      state.error = payload;
    },
    removeTodo: (state, { payload }) => {
      state.searchTodo = state.searchTodo.filter(
        (item: TTask) => item.id !== payload
      );
      state.todos = state.todos.filter((item: TTask) => item.id !== payload);
    },
    searchTodo: (state, { payload }) => {
      state.searchTodo = state.todos.filter((todo) => {
        if (!payload) return todo;

        return todo.task.includes(payload);
      });
    },
  },
});

const { actions, reducer } = NewTodoSlicer;

export const {
  pendingNewTodo,
  addNewTodo,
  failNewTodo,
  removeTodo,
  searchTodo,
} = actions;

export default reducer;
