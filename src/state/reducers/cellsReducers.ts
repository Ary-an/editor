import produce from "immer";
import { IActionType, IAction } from "../actionTypes";
import { ICell } from "../cellTypes";

interface ICellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: ICell;
  };
}

const initialState: ICellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: ICellsState = initialState, action: IAction) => {
    switch (action.type) {
      case IActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;

        return state;

      case IActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);

        return state;

      case IActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;

      case IActionType.INSERT_CELL_AFTER:
        const cell: ICell = {
          content: "",
          type: action.payload.type,
          id: randomID(),
        };

        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, cell.id);
        }

        return state;

      case IActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;

        return state;

      case IActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;

        return state;

      case IActionType.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map((cell) => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as ICellsState["data"]);

        return state;

      case IActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;

        return state;

      default:
        return state;
    }
  }
);

const randomID = () => Math.random().toString(36).substr(2, 5);
export default reducer;
