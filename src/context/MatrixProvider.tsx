import { useState } from "react"
import type { Matrix } from "../types/matrix"
import { MatrixContext } from "./MatrixContext"
import { createMatrix } from "../utils/utils"

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [rows, setRows] = useState(5)
  const [columns, setColumns] = useState(5)
  const [nearestAmount, setNearestAmount] = useState(5)
  const matrix: Matrix = createMatrix(rows, columns)

  return (
    <MatrixContext.Provider
      value={{
        rows,
        columns,
        nearestAmount,
        setRows,
        setColumns,
        setNearestAmount,
        matrix,
      }}
    >
      {children}
    </MatrixContext.Provider>
  )
}
