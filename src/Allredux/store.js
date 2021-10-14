import { createStore } from "redux";

import { todoreducer } from "./reducers";

export const store = createStore(todoreducer);
