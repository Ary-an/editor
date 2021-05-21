import produce from "immer";
import { IActionType, IAction } from "../actionTypes";

interface IBundLessState {
  [key: string]: {
    code: string;
    err: string;
  };
}

const initialState: IBundLessState = {};

const reducer = produce(
  (state: IBundLessState = initialState, action: IAction): IBundLessState => {
    switch (action.type) {
      case IActionType.BUNDLE_CREATED:
        state[action.payload.cellId] = action.payload.bundle;

        return state;

      default:
        return state;
    }
  }
);

export default reducer;
