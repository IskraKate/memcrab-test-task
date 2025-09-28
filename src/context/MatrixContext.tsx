import { createContext } from "react"
import type { MatrixAction, MatrixState } from "../types/matrix"

type MatrixCtx = {
  state: MatrixState
  dispatch: React.Dispatch<MatrixAction>
}

export const MatrixContext = createContext<MatrixCtx | null>(null)
