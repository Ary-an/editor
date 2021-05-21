import { Middleware } from "./middleware";
import { IActionType } from "../actionTypes";
import bundle from "../../bundler";

let timer: any;
export const bundlerMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (action) => {
  next(action);

  if (action.type !== IActionType.UPDATE_CELL) {
    return;
  }

  const {
    cells: { data: cellData },
  } = getState();

  const cell = cellData[action.payload.id];

  if (cell.type === "text") {
    return;
  }

  clearTimeout(timer);
  timer = setTimeout(async () => {
    const result = await bundle(action.payload.content);
    dispatch({
      type: IActionType.BUNDLE_CREATED,
      payload: {
        cellId: action.payload.id,
        bundle: result,
      },
    });
  }, 750);
};
