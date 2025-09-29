type CellId = number
type CellValue = number

export type Cell = {
  id: CellId
  amount: CellValue
}

export type Row = {
  rowId: number
  cells: Cell[]
}

export type Matrix = Row[]

export type MatrixAction =
  | { type: "SET_ROWS"; rows: number }
  | { type: "SET_COLUMNS"; columns: number }
  | { type: "SET_NEAREST_AMOUNT"; nearestAmount: number }
  | { type: "DELETE_ROW"; id: number }
  | { type: "INCREMENT_CELL"; id: number }

export type MatrixState = {
  rows: number
  columns: number
  nearestAmount: number
  matrix: Row[]
}

export type Distance = { id: number; diff: number }
