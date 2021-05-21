import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { IActionType } from "./actionTypes";
import { bundlerMiddleware } from "./middleware/bundler-middleware";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(bundlerMiddleware, thunk)
);

store.dispatch({
  type: IActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: IActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "text",
  },
});
