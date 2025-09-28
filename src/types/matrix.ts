type CellId = number
type CellValue = number

export type Cell = {
  id: CellId
  amount: CellValue
}

export type Matrix = Cell[][]

export type MatrixAction =
  | { type: "SET_DIMENSIONS"; rows: number; columns: number }
  | { type: "SET_NEAREST_AMOUNT"; nearestAmount: number }

export type MatrixState = {
  rows: number
  columns: number
  nearestAmount: number
  matrix: Cell[][]
}
