import React, { ChangeEvent, useState } from "react";
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
import DatePicker from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./ModalFrom.Style.css";
import { TNewTask } from "../../../Types";

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
  const [value, setValue] = useState<Value>(new Date());
  const classes = useStyles();
  const [newTask, setNewTask] = useState<TNewTask>({
    id: props.editMode?props.value.id:props.myTask.length + 1,
    task: props.editMode?props.value.task:"",
    priority: props.editMode?props.value.priority:0,
    status: props.editMode?props.value.status:0,
    deadline: props.editMode?props.value.deadLine:0,
    message: props.editMode?props.value.message:"",
    unix: props.editMode?props.value.unix:0
  });

  const getValue: any = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = (e: React.MouseEvent) => {
    e.preventDefault();

    if (props.editMode) {
      setValue(value)
      let oldTasks = props.myTask;
      oldTasks = oldTasks.filter((item: { id: number; })=>item.id!==props.value.id)
      let editTask = newTask;
      oldTasks.push(editTask);
      console.log(oldTasks)
      props.setMyTask(oldTasks)
      props.onClick();
      props.setEditMode(false)
      props.setValue('')

    } else {
      newTask.deadline = value;
      props.setMyTask([...props.myTask, newTask]);
      props.onClick();
      props.setEditMode(false);

    }


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
                onChange={getValue}
                autoComplete="task"
                name="task"
                variant="outlined"
                defaultValue={props.value.task ? props.value.task:""}
                required
                fullWidth
                id="task"
                label="New Task"
                autoFocus
                disabled={props.viewMode ? true : false}

              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" className="w-100">
                <InputLabel id="demo-simple-select-outlined-label">
                  Priority
                </InputLabel>
                <Select
                  onChange={getValue}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Priority"
                  name="priority"
                  defaultValue={props.value.priority}
                  disabled={props.viewMode ? true : false}
                  required
                >
                  <MenuItem value={0}>Low</MenuItem>
                  <MenuItem value={1}>Medium</MenuItem>
                  <MenuItem value={2}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" className="w-100">
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  onChange={getValue}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Status"
                  name="status"
                  required
                  disabled={props.viewMode ? true : false}
                  defaultValue={props.value.status}
                >
                  <MenuItem value={0}>Todo</MenuItem>
                  <MenuItem value={1}>Doing</MenuItem>
                  <MenuItem value={2}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                value={props.value.deadline}
                onChange={setValue}
                locale="fa"
                calendar="persian"
                disabled={props.viewMode ? true : false}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              onChange={getValue}
              className="w-100 my-3 p-3"
              aria-label="Your Message"
              rowsMin={3}
              defaultValue={props.value.message}
              placeholder="Your Message"
              name="message"
            />
          </Grid>
          <Divider />
          <Grid container justify="flex-end">
            <Grid
              className="w-100 mt-5 d-flex justify-content-between align-items-center"
              item
            >
              <Button color="primary" onClick={props.onClick}>
                {props.viewMode ? 'Close' : 'Cancel'}
              </Button>
              {
                props.viewMode ? null : <Button onClick={addTask} variant="contained" color="primary">
                  {props.editMode ? 'Edit' : 'Save'}
                </Button>
              }
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ModalForm;
