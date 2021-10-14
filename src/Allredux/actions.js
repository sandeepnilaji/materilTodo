import {
  ADD_TODO_ERROR,
  ADD_TODO_LOAD,
  ADD_TODO_SUCESS,
  GET_TODO_ERROR,
  GET_TODO_LOAD,
  GET_TODO_SUCESS,
} from "./actionTypes";

export const addtodoload = () => {
  return {
    type: ADD_TODO_LOAD,
  };
};

export const addtodosucess = (data) => {
  return {
    type: ADD_TODO_SUCESS,
    payload: data,
  };
};

export const addtodoerror = (data) => {
  return {
    type: ADD_TODO_ERROR,
  };
};

export const gettodoload = () => {
  return {
    type: GET_TODO_LOAD,
  };
};
export const gettodosucess = (data) => {
  return {
    type: GET_TODO_SUCESS,
    payload: data,
  };
};
export const gettodoerror = () => {
  return {
    type: GET_TODO_ERROR,
  };
};
