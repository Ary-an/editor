import axios from "axios";
import { Dispatch } from "redux";
import { IActionType } from "../actionTypes";
import { IAction } from "../actionTypes";
import bundle from "../../bundler";
import { ICell } from "../cellTypes";
import { IRootState } from "../reducers";

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: IActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: IActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<IAction>) => {
    dispatch({ type: IActionType.FETCH_CELLS });

    try {
      const { data }: { data: ICell[] } = await axios.get("/cells");

      dispatch({
        type: IActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: IActionType.FETCH_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<IAction>, getState: () => IRootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);

    try {
      await axios.post("/cells", { cells });
    } catch (err) {
      dispatch({
        type: IActionType.SAVE_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};
