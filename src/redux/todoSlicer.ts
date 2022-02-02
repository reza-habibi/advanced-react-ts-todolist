import { createSlice } from "@reduxjs/toolkit";
import { TTask } from "../type";

const initialState: {
  loading: boolean;
  todos: TTask[];
  error: string;
  searchTodo: TTask[];
  showMode: boolean;
  editMode: boolean;
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
  showMode: false,
  editMode: false,
  currentTodo: {
    task: "",
    priority: 0,
    status: 0,
    deadline: '',
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
    showTodo: (state, { payload }) => {
      state.showMode = payload;
    },
    currentTodo: (state, { payload }) => {
      state.currentTodo = payload;
    },
    editTodo: (state, { payload }) => {
      state.editMode = payload;
    },
    openModal: (state, { payload }) => {
      state.opened = payload;
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
  showTodo,
  currentTodo,
  editTodo,
  openModal,
} = actions;

export default reducer;
