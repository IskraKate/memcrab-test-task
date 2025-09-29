import { useCallback, useMemo, useState } from "react"
import { useMatrix } from "../hooks/useMatrix"
import type { Cell } from "../types/matrix"
import { colPercentile, nearestCellIds, nf } from "../utils/utils"
import Row from "./RowItem"
import styles from "./Table.module.css"

const Table = () => {
  const { state, addRow } = useMatrix()
  const { nearestAmount, matrix, columns } = state

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
    <>
      <button
        type="button"
        onClick={addRow}
        disabled={columns === 0}
        title={columns === 0 ? "Add columns first" : "Add a new row"}
        className={styles["add-button"]}
      >
        + Add row
      </button>
      <div className={styles["matrix-scroll"]}>
        <table className={styles.matrix}>
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
              <td>60th</td>
              {percentileResults.map((val, i) => (
                <td key={`p60-${i}`} title="60th percentile">
                  {nf.format(val)}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

export default Table
