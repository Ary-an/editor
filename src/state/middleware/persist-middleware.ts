import { Dispatch } from "redux";
import { IAction } from "../actionTypes";
import { IActionType } from "../actionTypes";
import { saveCells } from "../actionCreators";
import { IRootState } from "../reducers";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<IAction>;
  getState: () => IRootState;
}) => {
  let timer: any;

  return (next: (action: IAction) => void) => {
    return (action: IAction) => {
      next(action);

      if (
        [
          IActionType.MOVE_CELL,
          IActionType.UPDATE_CELL,
          IActionType.INSERT_CELL_AFTER,
          IActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
