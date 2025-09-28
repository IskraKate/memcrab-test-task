import type { Row, Cell } from "../types/matrix"

export function createMatrix(rows: number, columns: number): Row[] {
  let idCounter = 1

  return Array.from({ length: rows }).map((_, rowIndex) => {
    const cells: Cell[] = Array.from({ length: columns }).map(() => {
      return {
        id: idCounter++,
        amount: Math.floor(Math.random() * 900) + 100,
      }
    })

    return {
      rowId: rowIndex + 1,
      cells,
    }
  })
}

export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

export const calcMaxNearestAmount = (rows: number, columns: number) =>
  Math.max(0, rows * columns - 1)
