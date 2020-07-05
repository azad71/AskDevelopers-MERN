import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const middlewares = [thunk];

let devTools = null;

if (process.env.NODE_ENV !== "production") {
  devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), devTools)
);
