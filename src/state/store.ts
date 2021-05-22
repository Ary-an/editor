import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { IActionType } from "./actionTypes";
import { persistMiddleware } from "./middleware/persist-middleware";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

store.dispatch({
  type: IActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});
