import { useState } from "react"
import type { Cell, Row } from "../types/matrix"
import AlertDialog from "./Alert"
import { useMatrix } from "../hooks/useMatrix"
import trashIcon from "../assets/trash.svg"
import styles from "./RowItem.module.css"

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
      <td>
        <button onClick={() => setConfirmOpen(true)}>
          <img src={trashIcon} width={30} alt="Remove row" />
        </button>
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
              background: showPercents
                ? `linear-gradient(to right, var(--accent, #cde) ${percentOfMax}%, transparent ${percentOfMax}%)`
                : undefined,
            }}
            className={`${styles["data-cell"]} ${
              highlighted.has(cell.id) ? styles.nearest : ""
            }`}
          >
            {showPercents ? `${percentOfSum.toFixed(0)}%` : cell.amount}
          </td>
        )
      })}
      <td
        key={`${row.rowId}-sum`}
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
