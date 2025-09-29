import { useReducer } from "react"
import type { MatrixAction, MatrixState } from "../types/matrix"
import { MatrixContext } from "./MatrixContext"
import {
  calcMaxNearestAmount,
  clamp,
  countCells,
  createMatrix,
  createRow,
} from "../utils/utils"

function matrixReducer(state: MatrixState, action: MatrixAction): MatrixState {
  switch (action.type) {
    case "SET_ROWS": {
      const rows = clamp(action.rows, 0, 100)
      const columns = state.columns

      const newMatrix = createMatrix(rows, columns)
      const maxNearestAmount = calcMaxNearestAmount(rows, columns)

      return {
        ...state,
        rows,
        matrix: newMatrix,
        nearestAmount: clamp(state.nearestAmount, 0, maxNearestAmount),
        nextRowId: rows + 1,
        nextCellId: countCells(newMatrix) + 1,
      }
    }

    case "SET_COLUMNS": {
      const columns = clamp(action.columns, 0, 100)
      const rows = state.rows

      const newMatrix = createMatrix(rows, columns)
      const maxNearestAmount = calcMaxNearestAmount(rows, columns)

      return {
        ...state,
        columns,
        matrix: newMatrix,
        nearestAmount: clamp(state.nearestAmount, 0, maxNearestAmount),
        nextRowId: rows + 1,
        nextCellId: countCells(newMatrix) + 1,
      }
    }

    case "SET_NEAREST_AMOUNT": {
      const maxNearestAmount = calcMaxNearestAmount(state.rows, state.columns)

      return {
        ...state,
        nearestAmount: clamp(action.nearestAmount, 0, maxNearestAmount),
      }
    }

    case "ADD_ROW": {
      const { row, nextCellId } = createRow(
        state.columns,
        state.nextRowId,
        state.nextCellId
      )

      const rows = state.rows + 1
      const maxNearestAmount = calcMaxNearestAmount(rows, state.columns)

      return {
        ...state,
        rows,
        matrix: [...state.matrix, row],
        nextRowId: state.nextRowId + 1,
        nextCellId,
        nearestAmount: clamp(state.nearestAmount, 0, maxNearestAmount),
      }
    }

    case "DELETE_ROW": {
      const rowId = action.id
      const newMatrix = state.matrix.filter((r) => r.rowId !== rowId)
      const rows = newMatrix.length
      const maxNearestAmount = calcMaxNearestAmount(rows, state.columns)

      return {
        ...state,
        rows,
        matrix: newMatrix,
        nearestAmount: clamp(state.nearestAmount, 0, maxNearestAmount),
      }
    }

    case "INCREMENT_CELL": {
      const { id } = action

      return {
        ...state,
        matrix: state.matrix.map((row) => {
          const cellIndex = row.cells.findIndex((c) => c.id === id)
          if (cellIndex === -1) return row

          return {
            ...row,
            cells: row.cells.map((cell, index) =>
              index === cellIndex ? { ...cell, amount: cell.amount + 1 } : cell
            ),
          }
        }),
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
    nextRowId: 0,
    nextCellId: 0,
  })

  const setRows = (rows: number) => dispatch({ type: "SET_ROWS", rows })
  const setColumns = (columns: number) =>
    dispatch({ type: "SET_COLUMNS", columns })
  const setNearestAmount = (nearestAmount: number) =>
    dispatch({ type: "SET_NEAREST_AMOUNT", nearestAmount })
  const addRow = () => dispatch({ type: "ADD_ROW" })
  const deleteRow = (id: number) => dispatch({ type: "DELETE_ROW", id })
  const incrementCell = (id: number) => dispatch({ type: "INCREMENT_CELL", id })

  return (
    <MatrixContext.Provider
      value={{
        state,
        setRows,
        setColumns,
        setNearestAmount,
        deleteRow,
        incrementCell,
        addRow,
      }}
    >
      {children}
    </MatrixContext.Provider>
  )
}
