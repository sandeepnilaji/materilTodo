import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

import {
  addtodoload,
  addtodoerror,
  addtodosucess,
  gettodosucess,
} from "../Allredux/actions";

function Todo() {
  const [text, setText] = useState("");
  const { isloading, iserror } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    gettodosucess();
  }, []);
  async function addtodo() {
    dispatch(addtodoload());
    try {
      await axios.post("http://localhost:3001/todos", {
        titel: text,
        status: false,
        flag: false,
      });
      dispatch(addtodosucess());
      alert("todo added to the list");
      //   dispatch(gettodosucess());
    } catch (err) {
      dispatch(addtodoerror(err));
    }
  }

  // get todo

  return isloading ? (
    "Loading..."
  ) : iserror ? (
    "Error 404"
  ) : (
    <>
      <Box
        sx={{
          width: 300,
          justifyContent: "center",
          justifyItems: "center",
          margin: "auto",
        }}
      >
        <div style={{ marginBottom: "20px" }}>ENTER TODO HERE</div>
        <TextField
          id="outlined-primary"
          label="Add todo"
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          color="success"
          onClick={addtodo}
          sx={{ height: "55px" }}
        >
          ADD
        </Button>
      </Box>
    </>
  );
}

export default Todo;
