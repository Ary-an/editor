import produce from "immer";
import { IActionType, IAction } from "../actionTypes";

interface IBundLessState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: IBundLessState = {};

const reducer = produce(
  (state: IBundLessState = initialState, action: IAction): IBundLessState => {
    switch (action.type) {
      case IActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;
      case IActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);
export default reducer;
