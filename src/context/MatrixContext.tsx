import { createContext } from "react"
import type { Matrix } from "../types/matrix"

type MatrixCtx = {
  rows: number
  columns: number
  nearestAmount: number
  setRows: (v: number) => void
  setColumns: (v: number) => void
  setNearestAmount: (v: number) => void
  matrix: Matrix
  // regenerate: () => void
  // incrementCell: (cellId: number) => void
  // addRow: () => void
  // removeRow: (rowIndex: number) => void
}

export const MatrixContext = createContext<MatrixCtx | null>(null)
