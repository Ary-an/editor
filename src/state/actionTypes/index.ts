import { ICellType, ICell } from "../cellTypes";

export enum IActionType {
  MOVE_CELL = "move_cell",
  DELETE_CELL = "delete_cell",
  INSERT_CELL_AFTER = "insert_cell_after",
  UPDATE_CELL = "update_cell",
  BUNDLE_START = "bundle_start",
  BUNDLE_COMPLETE = "bundle_complete",
  FETCH_CELLS = "fetch_cells",
  FETCH_CELLS_COMPLETE = "fetch_cells_complete",
  FETCH_CELLS_ERROR = "fetch_cells_error",
  SAVE_CELLS_ERROR = "save_cells_error",
}

export type IDirection = "up" | "down";

export interface IMoveCellAction {
  type: IActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: IDirection;
  };
}

export interface IDeleteCellAction {
  type: IActionType.DELETE_CELL;
  payload: string;
}

export interface IUpdateCellAction {
  type: IActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface IInsertCellAfterAction {
  type: IActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: ICellType;
  };
}

export interface IBundleStartAction {
  type: IActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface IBundleCompleteAction {
  type: IActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface IFetchCellsAction {
  type: IActionType.FETCH_CELLS;
}

export interface IFetchCellsCompleteAction {
  type: IActionType.FETCH_CELLS_COMPLETE;
  payload: ICell[];
}

export interface IFetchCellsErrorAction {
  type: IActionType.FETCH_CELLS_ERROR;
  payload: string;
}

export interface ISaveCellsErrorAction {
  type: IActionType.SAVE_CELLS_ERROR;
  payload: string;
}

export type IAction =
  | IMoveCellAction
  | IDeleteCellAction
  | IUpdateCellAction
  | IInsertCellAfterAction
  | IBundleStartAction
  | IBundleCompleteAction
  | IFetchCellsAction
  | IFetchCellsCompleteAction
  | IFetchCellsErrorAction
  | ISaveCellsErrorAction;
