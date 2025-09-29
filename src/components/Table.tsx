import { useCallback, useMemo, useState } from "react"
import { useMatrix } from "../hooks/useMatrix"
import type { Cell } from "../types/matrix"
import { colPercentile, nearestCellIds, nf } from "../utils/utils"
import Row from "./RowItem"

const Table = () => {
  const { state } = useMatrix()
  const { nearestAmount, matrix } = state

  const [highlighted, setHighlighted] = useState<Set<number>>(new Set())

  const percentileResults = useMemo(() => colPercentile(matrix, 60), [matrix])

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
            onHighlight={(cell: Cell) => handleHighlight(cell)}
            onClearHighlight={clearHighlight}
          />
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td
            style={{
              padding: ".5rem",
              textAlign: "right",
              fontStyle: "italic",
            }}
          >
            60th percentile
          </td>
          {percentileResults.map((val, i) => (
            <td
              key={`p60-${i}`}
              style={{
                padding: ".5rem",
                textAlign: "right",
              }}
              title="60th percentile"
            >
              {nf.format(val)}
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  )
}

export default Table
