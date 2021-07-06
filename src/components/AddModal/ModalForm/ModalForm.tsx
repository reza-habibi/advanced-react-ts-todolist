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
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { tasks } from "../../../Data/tasks";
import "./ModalFrom.Style.css";

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

type TNewTask = {
  task: string;
  priority: string;
  status: string;
  deadline: string;
  message: string;
  id: number;
};

export default function ModalForm(props: { onClick: () => void }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [task, setTask] = useState(tasks);
  const [newTask, setNewTask] = useState<TNewTask>({
    id: task.length+1,
    task: "",
    priority: "",
    status: "",
    deadline: "",
    message: "",
  });
  const getValue: any = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
    console.log(newTask);
  };

  const addTask = (e: React.MouseEvent) => {
    e.preventDefault();
    task.push(newTask);
    setTask(task);
    console.log(tasks);
    props.onClick();
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
                required
                fullWidth
                id="task"
                label="New Task"
                autoFocus
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
                  required
                >
                  <MenuItem value={"Low"}>Low</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
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
                >
                  <MenuItem value={"Todo"}>Todo</MenuItem>
                  <MenuItem value={"Doing"}>Doing</MenuItem>
                  <MenuItem value={"Done"}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={getValue}
                variant="outlined"
                required
                fullWidth
                id="deadline"
                label="deadline"
                name="deadline"
                autoComplete="deadline"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              onChange={getValue}
              className="w-100 my-3 p-3"
              aria-label="Your Message"
              rowsMin={3}
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
                Cancel
              </Button>
              <Button onClick={addTask} variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
