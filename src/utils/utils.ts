import type { Cell } from "../types/matrix"

export function createMatrix(M: number, N: number): Cell[][] {
  let idCounter = 1

  return Array.from({ length: M }, () =>
    Array.from({ length: N }, () => {
      const cell: Cell = {
        id: idCounter++,
        amount: Math.floor(Math.random() * 900) + 100,
      }
      return cell
    })
  )
}
