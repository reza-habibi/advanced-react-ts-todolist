import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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

export default function ModalForm() {
  const classes = useStyles();

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
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Priority"
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
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Status"
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
                variant="outlined"
                required
                fullWidth
                id="deadline"
                label="Deadline"
                name="deadline"
                autoComplete="deadline"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              className="w-100 my-3 p-3"
              aria-label="Your Message"
              rowsMin={3}
              placeholder="Your Message"
            />
          </Grid>
          <Divider/>
        </form>
      </div>
    </Container>
  );
}
