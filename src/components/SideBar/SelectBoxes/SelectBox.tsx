import React, { ChangeEvent} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

function SelectBox(props:any) {


  const classes = useStyles();
  
  const handleChange:any=(e:ChangeEvent<HTMLSelectElement>)=>{
      props.setFilteredData(e.target.value)
      console.log(props.filteredData)
  }

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
        >
          <MenuItem value="All">
            All
          </MenuItem>
          <MenuItem value={"Low"}>Low</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"High"}>High</MenuItem>
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
          defaultValue={"All"}
        >
          <MenuItem value="All">
            All
          </MenuItem>
          <MenuItem value={"Todo"}>Todo</MenuItem>
          <MenuItem value={"Doing"}>Doing</MenuItem>
          <MenuItem value={"Done"}>Done</MenuItem>
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
          defaultValue={"All"}
        >
          <MenuItem value="All">
            All
          </MenuItem>
          <MenuItem value={"Overdue"}>Overdue</MenuItem>
          <MenuItem value={"For today"}>For today</MenuItem>
          <MenuItem value={"For the future"}>For the future</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default SelectBox;
