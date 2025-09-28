import { useReducer } from "react"
import type { MatrixAction, MatrixState } from "../types/matrix"
import { MatrixContext } from "./MatrixContext"
import { createMatrix } from "../utils/utils"

function matrixReducer(state: MatrixState, action: MatrixAction): MatrixState {
  switch (action.type) {
    case "SET_ROWS": {
      const { rows } = action
      return {
        ...state,
        rows,
        nearestAmount: Math.min(state.nearestAmount, rows * state.columns - 1),
        matrix: createMatrix(rows, state.columns),
      }
    }
    case "SET_COLUMNS": {
      const { columns } = action
      return {
        ...state,
        columns,
        nearestAmount: Math.min(state.nearestAmount, state.rows * columns - 1),
        matrix: createMatrix(state.rows, columns),
      }
    }
    case "SET_NEAREST_AMOUNT":
      return {
        ...state,
        nearestAmount: Math.min(
          action.nearestAmount,
          state.rows * state.columns - 1
        ),
      }

    default:
      return state
  }
}

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(matrixReducer, {
    rows: 0,
    columns: 0,
    nearestAmount: 0,
    matrix: [],
  })

  return (
    <MatrixContext.Provider value={{ state, dispatch }}>
      {children}
    </MatrixContext.Provider>
  )
}
