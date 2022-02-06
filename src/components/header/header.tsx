import React from "react";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SwipeAbleTemporaryDrawer from "../SideBar/SideBar";
import AddModal from "../AddModal/AddModal";
import "./header.css";
import { useAppDispatch } from "../../app/hooks";
import { searchTodo } from "../../redux/todoSlicer";

const Header = () => {
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchTodo(e.target.value));
  };

  return (
    <header
      className="w-100 d-flex align-items-center justify-content-between
      text-light p-2"
      style={{ backgroundColor: "#6200EA" }}
    >
      <div className=" d-flex align-items-center">
          <span>
            <MdPlaylistAddCheck className="icon"></MdPlaylistAddCheck>
          </span>
        <h4 className="mx-2 truncated">
          {""}
          MY To-Do Tasks
        </h4>
      </div>
      <div className=" d-flex justify-content-around align-items-center">
        <TextField
          onChange={handleChange}
          id="standard-basic"
          label="Search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <SwipeAbleTemporaryDrawer />
        <AddModal />
      </div>
    </header>
  );
};

export default Header;
