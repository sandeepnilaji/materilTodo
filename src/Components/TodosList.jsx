import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { gettodoerror, gettodoload, gettodosucess } from "../Allredux/actions";
import { display } from "@mui/system";
function TodosList() {
  const [say, jstSay] = useState("");
  const [page, setPage] = useState(1);
  const { isloading, iserror, todo, flag } = useSelector((state) => state);
  const dispatch = useDispatch();
  //   console.log(todo);
  useEffect(() => {
    gettodolist();
  }, [page]);
  //page handler

  const handlePage = (e) => {
    setPage(page + e);
  };

  // for input edit
  const handleinn = async (el) => {
    // const s = todo.filter((e) => (e.id === el.id ? e : "hii"));
    await axios.put(`http://localhost:3001/todos/${el.id}`, {
      ...el,
      flag: true,
    });
    // console.log(s);
    gettodolist();
  };

  const handleChange = (e) => {
    jstSay(e.target.value);
  };
  //
  const handleDone = async (e) => {
    await axios.put(`http://localhost:3001/todos/${e.id}`, {
      ...e,
      flag: false,
      titel: say,
    });
    // console.log(s);
    gettodolist();
    alert("todo saved");
  };

  ///////
  async function gettodolist() {
    dispatch(gettodoload());
    try {
      const res = await axios.get(
        `http://localhost:3001/todos?_page=${page}&_limit=5`
      );
      dispatch(gettodosucess(res.data));
      //   console.log(res.data);
    } catch (err) {
      dispatch(gettodoerror(err));
    }
  }

  async function ondeleteclick(e) {
    await axios.delete(`http://localhost:3001/todos/${e}`);
    gettodolist();
    alert("todo deleted sucess");
  }
  //   console.log(inn);
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
        <div>
          <h1>Todo List</h1>
          {todo.map((el) => {
            return (
              <div key={el.id}>
                <div>
                  <div
                    style={
                      el.flag
                        ? {
                            display: "none",
                          }
                        : {
                            // color: "green",
                            display: "grid",
                            gridTemplateColumns: "repeat(2,50%)",
                            cursor: "pointer",
                          }
                    }
                  >
                    <div onDoubleClick={() => handleinn(el)}>
                      <h3>
                        Title: <br />
                        <span style={{ color: "green" }}> {el.titel}</span>
                      </h3>
                    </div>
                    <Button
                      onClick={() => {
                        ondeleteclick(el.id);
                      }}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                  </div>
                </div>
                <div
                  style={el.flag ? { display: "block" } : { display: "none" }}
                >
                  <input
                    type="text"
                    placeholder={el.titel}
                    onChange={handleChange}
                    onKeyDown={() => console.log("hii")}
                  />{" "}
                  <button onClick={() => handleDone(el)}>Submit</button>
                </div>
              </div>
            );
          })}
        </div>
      </Box>
      <div
        style={{
          width: 300,
          justifyContent: "center",
          justifyItems: "center",
          margin: "auto",
        }}
      >
        <Button disabled={page < 2} onClick={() => handlePage(-1)}>
          prev
        </Button>
        {page}
        <Button onClick={() => handlePage(1)}>next</Button>
      </div>
    </>
  );
}

export default TodosList;
