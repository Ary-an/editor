import { ICellType } from "../cellTypes";

export enum IActionType {
  MOVE_CELL = "move_cell",
  DELETE_CELL = "delete_cell",
  INSERT_CELL_AFTER = "insert_cell_after",
  UPDATE_CELL = "update_cell",
  BUNDLE_CREATED = "bundle_created",
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

export interface IBundleCreatedAction {
  type: IActionType.BUNDLE_CREATED;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export type IAction =
  | IMoveCellAction
  | IDeleteCellAction
  | IUpdateCellAction
  | IInsertCellAfterAction
  | IBundleCreatedAction;
