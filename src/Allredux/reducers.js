import {
  ADD_TODO_LOAD,
  ADD_TODO_SUCESS,
  ADD_TODO_ERROR,
  GET_TODO_ERROR,
  GET_TODO_SUCESS,
  GET_TODO_LOAD,
} from "./actionTypes";

const initialstate = {
  isloading: false,
  iserror: false,
  todo: [],
};

export const todoreducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case ADD_TODO_LOAD:
      return {
        ...state,
        isloading: true,
      };
    case ADD_TODO_SUCESS:
      return {
        ...state,
        isloading: false,
      };
    case ADD_TODO_ERROR:
      return {
        ...state,
        isloading: false,
        iserror: true,
      };
    case GET_TODO_LOAD:
      return {
        ...state,
        isloading: true,
      };
    case GET_TODO_SUCESS:
      return {
        ...state,
        isloading: false,
        todo: [...payload],
      };
    case GET_TODO_ERROR:
      return {
        isloading: false,
        iserror: true,
      };
    default:
      return { ...state };
  }
};
