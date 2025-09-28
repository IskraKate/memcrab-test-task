import { useReducer } from "react"
import type { MatrixAction, MatrixState } from "../types/matrix"
import { MatrixContext } from "./MatrixContext"
import { calcMaxNearestAmount, clamp, createMatrix } from "../utils/utils"

function matrixReducer(state: MatrixState, action: MatrixAction): MatrixState {
  switch (action.type) {
    case "SET_ROWS": {
      const rows = clamp(action.rows, 0, 100)
      const columns = state.columns

      const maxNearestAmount = calcMaxNearestAmount(rows, columns)

      return {
        ...state,
        rows,
        nearestAmount: clamp(state.nearestAmount, 0, maxNearestAmount),
        matrix: createMatrix(rows, columns),
      }
    }
    case "SET_COLUMNS": {
      const columns = clamp(action.columns, 0, 100)
      const rows = state.rows

      const maxNearestAmount = calcMaxNearestAmount(rows, columns)

      return {
        ...state,
        columns,
        nearestAmount: clamp(state.nearestAmount, 0, maxNearestAmount),
        matrix: createMatrix(rows, columns),
      }
    }

    case "SET_NEAREST_AMOUNT": {
      const maxNearestAmount = calcMaxNearestAmount(state.rows, state.columns)

      return {
        ...state,
        nearestAmount: clamp(action.nearestAmount, 0, maxNearestAmount),
      }
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

  const setRows = (rows: number) => dispatch({ type: "SET_ROWS", rows })
  const setColumns = (columns: number) =>
    dispatch({ type: "SET_COLUMNS", columns })
  const setNearestAmount = (nearestAmount: number) =>
    dispatch({ type: "SET_NEAREST_AMOUNT", nearestAmount })

  return (
    <MatrixContext.Provider
      value={{ state, setRows, setColumns, setNearestAmount }}
    >
      {children}
    </MatrixContext.Provider>
  )
}
