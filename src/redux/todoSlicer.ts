import { createSlice } from "@reduxjs/toolkit";
import { TTask } from "../type";

const initialState: {
  loading: boolean;
  todos: TTask[];
  error: string;
  searchTodo: TTask[];
  show: boolean;
  edit: boolean;
  currentTodo: TTask;
  opened: boolean;
} = {
  loading: false,
  todos: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks") || "")
    : [],
  error: "",
  searchTodo: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks") || "")
    : [],
  show: false,
  edit: false,
  currentTodo: {
    task: "",
    priority: 0,
    status: 0,
    deadline: "",
    message: "",
    id: "",
  },
  opened: false,
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
      state.todos.push(payload);
      localStorage.setItem("tasks", JSON.stringify(state.todos));
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
      localStorage.setItem("tasks", JSON.stringify(state.todos));
    },
    searchTodo: (state, { payload }) => {
      state.searchTodo = state.todos.filter((todo) => {
        if (!payload) return todo;

        return todo.task.includes(payload);
      });
    },
    showMode: (state, { payload }) => {
      state.show = payload;
    },
    currentTodo: (state, { payload }) => {
      state.currentTodo = payload;
    },
    editMode: (state, { payload }) => {
      state.edit = payload;
    },
    openModal: (state, { payload }) => {
      state.opened = payload;
    },
    editTodo: (state, { payload }) => {
      state.currentTodo = payload;
      const index = state.todos.findIndex(
        (todo: TTask) => todo.id === payload.id
      );
      state.todos[index] = payload;
      state.searchTodo[index] = payload;
      localStorage.setItem("tasks", JSON.stringify(state.todos));
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
  showMode,
  currentTodo,
  editMode,
  openModal,
  editTodo,
} = actions;

export default reducer;
