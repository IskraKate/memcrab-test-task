import { useCallback, useState } from "react"
import { useMatrix } from "../hooks/useMatrix"
import type { Cell } from "../types/matrix"
import { nearestCellIds } from "../utils/utils"
import Row from "./RowItem"

const Table = () => {
  const { state, deleteRow } = useMatrix()
  const { nearestAmount, matrix } = state

  const [highlighted, setHighlighted] = useState<Set<number>>(new Set())

  const handleHighlight = useCallback(
    (cell: Cell) => {
      setHighlighted(new Set(nearestCellIds(matrix, cell, nearestAmount)))
    },
    [matrix, nearestAmount]
  )

  const clearHighlight = useCallback(() => setHighlighted(new Set()), [])

  if (!Array.isArray(matrix) || matrix.length === 0) {
    return <p>No data</p>
  }

  return (
    <table
      style={{ borderCollapse: "collapse", marginTop: "1rem", minWidth: 480 }}
    >
      <tbody>
        {matrix.map((row) => (
          <Row
            key={row.rowId}
            row={row}
            highlighted={highlighted}
            onRemove={(rowId: number) => deleteRow(rowId)}
            onHighlight={(cell: Cell) => handleHighlight(cell)}
            onClearHighlight={clearHighlight}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Table
