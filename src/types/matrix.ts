type CellId = number
type CellValue = number

export type Cell = {
  id: CellId
  amount: CellValue
}

export type Matrix = Cell[][]
