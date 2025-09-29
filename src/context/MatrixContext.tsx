import { createContext } from "react"
import type { MatrixState } from "../types/matrix"

type MatrixCtx = {
  state: MatrixState
  setRows: (rows: number) => void
  setColumns: (columns: number) => void
  setNearestAmount: (nearestAmount: number) => void
  deleteRow: (id: number) => void
  incrementCell: (id: number) => void
}

export const MatrixContext = createContext<MatrixCtx | null>(null)
