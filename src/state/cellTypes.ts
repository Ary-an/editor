export interface ICell {
  id: string;
  type: ICellType;
  content: string;
}

export type ICellType = "code" | "text";
