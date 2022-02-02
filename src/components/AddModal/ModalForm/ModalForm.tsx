import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {
  TextareaAutosize,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./ModalFrom.Style.css";
import { useAppDispatch, useAppSelector } from "./../../../app/hooks";
import { editCurrentTodo, newTodo } from "./../../../redux/newTodoAction";
import { v4 as uuidv4 } from "uuid";
import { openModal, showMode, editMode } from "../../../redux/todoSlicer";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ModalForm = (props: any) => {
  const dispatch = useAppDispatch();
  const { currentTodo, edit, show } = useAppSelector((state) => state.todos);

  const [value, setValue] = useState<any>(
    show || edit
      ? new DateObject({
          date: `${currentTodo.deadline.year}/${currentTodo.deadline.month}/${currentTodo.deadline.day}`,
          calendar: "persian",
          locale: "fa",
        })
      : new DateObject({ calendar: "persian" })
  );
  const classes = useStyles();


  const [task, setTask] = useState(show || edit ? currentTodo.task : "");
  const [priority, setPriority] = useState(
    show || edit ? currentTodo.priority : 1
  );
  const [status, setStatus] = useState(show || edit ? currentTodo.status : 1);
  const [message, setMessage] = useState("");

  const addTask = (e: React.MouseEvent) => {
    let valueRegex = /^(?!\s*$).+/;

    e.preventDefault();

    if (valueRegex.test(task) && priority && status) {
      edit
        ? dispatch(
            editCurrentTodo({
              id: currentTodo.id,
              task,
              priority,
              status,
              deadline: {
                day: value.day,
                month: value.month.number,
                year: value.year,
                unix: value.unix,
              },
              message,
            })
          )
        : dispatch(
            newTodo({
              id: uuidv4(),
              task,
              priority,
              status,
              deadline: {
                day: value.day,
                month: value.month.number,
                year: value.year,
                unix: value.unix,
              },
              message,
            })
          );
      dispatch(openModal(false));
    } else {
      alert("fill all fields");
    }
  };

  const handleClose = () => {
    dispatch(openModal(false));
    dispatch(show ? showMode(false) : editMode(false));
  };

  return (
    <Container className="modal-form" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Task
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e: any) => setTask(e.target.value)}
                value={task}
                autoComplete="task "
                name="task"
                variant="outlined"
                fullWidth
                id="task"
                label="New Task *"
                autoFocus
                disabled={show ? true : false}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" className="w-100">
                <InputLabel id="demo-simple-select-outlined-label">
                  Priority *
                </InputLabel>
                <Select
                  onChange={(e: any) => setPriority(e.target.value)}
                  value={priority}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Priority"
                  name="priority"
                  disabled={show ? true : false}
                  required
                >
                  <MenuItem value={1}>Low</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" className="w-100">
                <InputLabel id="demo-simple-select-outlined-label">
                  Status *
                </InputLabel>
                <Select
                  onChange={(e: any) => setStatus(e.target.value)}
                  value={status}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Status"
                  name="status"
                  required
                  disabled={show ? true : false}
                >
                  <MenuItem value={1}>Todo</MenuItem>
                  <MenuItem value={2}>Doing</MenuItem>
                  <MenuItem value={3}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                value={value}
                onChange={setValue}
                calendar="persian"
                locale="fa"
                calendarPosition="bottom-right"
                disabled={show ? true : false}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              onChange={(e: any) => setMessage(e.target.value)}
              value={show || edit ? currentTodo.message : message}
              className="w-100 my-3 p-3"
              aria-label="Your Message"
              rowsMin={3}
              placeholder="Your Message"
              name="message"
              disabled={show ? true : false}
            />
          </Grid>
          <Divider />
          <Grid container justify="flex-end">
            <Grid
              className="w-100 mt-5 d-flex justify-content-between align-items-center"
              item
            >
              <Button color="primary" onClick={handleClose}>
                {show ? "Close" : "Cancel"}
              </Button>
              {props.open === true ? (
                show ? null : (
                  <Button onClick={addTask} variant="contained" color="primary">
                    {edit ? "Edit" : "Save"}
                  </Button>
                )
              ) : null}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ModalForm;
