import { createSlice } from "@reduxjs/toolkit";
import { TTask } from "../type";
import { DateObject } from "react-multi-date-picker";

const initialState: {
  loading: boolean;
  todos: TTask[];
  error: string;
  searchTodo: TTask[];
  show: boolean;
  edit: boolean;
  currentTodo: TTask;
  opened: boolean;
  filteredData: TTask[];
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
    deadline: { day: 0, unix: 0, year: 0, month: 0 },
    message: "",
    id: "",
  },
  opened: false,
  filteredData: [],
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
    filteredTodo: (
      state,
      {
        payload,
      }: { payload: { priority: number; status: number; deadline: number } }
    ) => {
      const today = new DateObject({ calendar: "persian", locale: "fa" });
      state.filteredData = state.todos
        .filter((todo: TTask) =>
          payload.priority ? todo.priority === payload.priority : todo
        )
        .filter((todo: TTask) =>
          payload.status ? todo.status === payload.status : todo
        )
        .filter((todo: TTask) => {
          if (payload.deadline) {
            if (payload.deadline === 1) {
              return (
                new DateObject({ date: today.unix * 1000 }).format() >
                new DateObject({ date: todo.deadline.unix * 1000 }).format()
              );
            } else if (payload.deadline === 2) {
              return (
                new DateObject({ date: today.unix * 1000 }).format() ===
                new DateObject({ date: todo.deadline.unix * 1000 }).format()
              );
            } else if (payload.deadline === 3) {
              return (
                new DateObject({ date: today.unix * 1000 }).format() <
                new DateObject({ date: todo.deadline.unix * 1000 }).format()
              );
            }
          } else {
            return todo;
          }
        });
      state.searchTodo = state.filteredData;
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
  filteredTodo,
} = actions;

export default reducer;
