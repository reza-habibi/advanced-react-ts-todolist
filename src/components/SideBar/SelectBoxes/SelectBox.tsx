import React, { ChangeEvent, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import { useAppDispatch } from "../../../app/hooks";
import { filterTodos } from "../../../redux/newTodoAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

function SelectBox(props: any) {
  const classes = useStyles();
  const [filters, setFilters] = useState({
    priority: 0,
    status: 0,
    deadline: 0,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterTodos(filters));
  }, [dispatch, filters]);

  const handleChange: any = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleOnReset = () => {
    setFilters({ priority: 0, status: 0, deadline: 0 });
  };

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
        <Select
          onChange={handleChange}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="priority"
          name="priority"
          value={filters.priority}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          onChange={handleChange}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="status"
          name="status"
          value={filters.status}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Todo</MenuItem>
          <MenuItem value={2}>Doing</MenuItem>
          <MenuItem value={3}>Done</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">DeadLine</InputLabel>
        <Select
          onChange={handleChange}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="deadline"
          name="deadline"
          value={filters.deadline}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Overdue</MenuItem>
          <MenuItem value={2}>For today</MenuItem>
          <MenuItem value={3}>For the future</MenuItem>
        </Select>
      </FormControl>

      <Button color={"primary"} variant={"outlined"} onClick={handleOnReset}>
        Reset
      </Button>
    </>
  );
}

export default SelectBox;
