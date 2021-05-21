import { IActionType } from "../actionTypes";
import {
  IDeleteCellAction,
  IInsertCellAfterAction,
  IMoveCellAction,
  IUpdateCellAction,
  IDirection,
} from "../actionTypes";
import { ICellType } from "../cellTypes";

export const updateCell = (id: string, content: string): IUpdateCellAction => {
  return {
    type: IActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): IDeleteCellAction => {
  return {
    type: IActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (
  id: string,
  direction: IDirection
): IMoveCellAction => {
  return {
    type: IActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  type: ICellType
): IInsertCellAfterAction => {
  return {
    type: IActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};
