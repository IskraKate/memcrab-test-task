import { useState } from "react"
import type { Cell, Row } from "../types/matrix"
import AlertDialog from "./Alert"
import { useMatrix } from "../hooks/useMatrix"

type RowItemProps = {
  row: Row
  highlighted: Set<number>
  onHighlight: (cell: Cell) => void
  onClearHighlight: () => void
}

const RowItem = ({
  row,
  highlighted,
  onHighlight,
  onClearHighlight,
}: RowItemProps) => {
  const { deleteRow, incrementCell } = useMatrix()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [showPercents, setShowPercents] = useState(false)

  const cells = row.cells
  const values = cells.map((c) => c.amount)
  const rowSum = values.reduce((acc, c) => acc + c, 0)
  const maxInRow = values.length ? Math.max(...values) : 0

  return (
    <tr>
      <td
        style={{
          border: "1px solid #ccc",
          padding: ".5rem",
          textAlign: "right",
        }}
      >
        <button onClick={() => setConfirmOpen(true)}>-</button>
      </td>
      {cells.map((cell: Cell) => {
        const percentOfSum = rowSum > 0 ? (cell.amount / rowSum) * 100 : 0
        const percentOfMax = maxInRow > 0 ? (cell.amount / maxInRow) * 100 : 0

        return (
          <td
            key={cell.id}
            onMouseEnter={() => onHighlight(cell)}
            onMouseLeave={onClearHighlight}
            onClick={() => incrementCell(cell.id)}
            style={{
              border: "1px solid #ccc",
              padding: ".5rem",
              textAlign: "right",
              cursor: "pointer",
              background: showPercents
                ? `linear-gradient(to right, var(--accent, #cde) ${percentOfMax}%, transparent ${percentOfMax}%)`
                : undefined,
              backgroundRepeat: "no-repeat",
            }}
            className={highlighted.has(cell.id) ? "nearest" : ""}
          >
            {showPercents ? `${percentOfSum.toFixed(0)}%` : cell.amount}
          </td>
        )
      })}
      <td
        key={`${row.rowId}-sum`}
        style={{
          border: "1px solid #ccc",
          padding: ".5rem",
          textAlign: "right",
          fontWeight: "bold",
        }}
        onMouseEnter={() => setShowPercents(true)}
        onMouseLeave={() => setShowPercents(false)}
      >
        {rowSum}
      </td>

      <AlertDialog
        open={confirmOpen}
        onConfirm={() => {
          setConfirmOpen(false)
          deleteRow(row.rowId)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </tr>
  )
}

export default RowItem
