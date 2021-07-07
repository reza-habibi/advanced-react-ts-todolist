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
import "./ModalFrom.Style.css";
import { TNewTask , TModal } from "../../../Types";
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



const ModalForm: React.FC<TModal> = (props) => {
  const classes = useStyles();
  const [newTask, setNewTask] = useState<TNewTask>({
    id: props.myTask.length + 1,
    task: "",
    priority: 0,
    status: 0,
    deadline: 0,
    message: "",
  });

  const getValue: any = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = (e: React.MouseEvent) => {
    e.preventDefault();
    props.myTask.push(newTask);
    props.setMyTask(props.myTask);
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
                  defaultValue={""}
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
                  defaultValue={""}
                  required
                >
                  <MenuItem value={0}>Todo</MenuItem>
                  <MenuItem value={1}>Doing</MenuItem>
                  <MenuItem value={2}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>

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
};

export default ModalForm;
