import { useRef, useState } from "react"
import type { Cell, Row } from "../types/matrix"
import AlertDialog from "./Alert"
import { useMatrix } from "../hooks/useMatrix"
import trashIcon from "../assets/trash.svg"
import styles from "./RowItem.module.css"
import { applyPercentBg } from "../utils/utils"

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
  const rowRef = useRef<HTMLTableRowElement>(null)

  const cells = row.cells
  const values = cells.map((c) => c.amount)
  const rowSum = values.reduce((acc, c) => acc + c, 0)
  const maxInRow = values.length ? Math.max(...values) : 0

  return (
    <tr ref={rowRef}>
      <td>
        <button title="Remove the row" onClick={() => setConfirmOpen(true)}>
          <img src={trashIcon} width={30} alt="Remove row" />
        </button>
      </td>

      {cells.map((cell) => {
        const percentOfSum = rowSum > 0 ? (cell.amount / rowSum) * 100 : 0

        return (
          <td
            key={cell.id}
            data-cell="initial-data"
            onMouseEnter={() => onHighlight(cell)}
            onMouseLeave={onClearHighlight}
            onClick={() => incrementCell(cell.id)}
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
        onMouseEnter={() => {
          setShowPercents(true)
          applyPercentBg(
            rowRef.current,
            cells,
            maxInRow,
            true,
            styles["percent-bg"]
          )
        }}
        onMouseLeave={() => {
          setShowPercents(false)
          applyPercentBg(
            rowRef.current,
            cells,
            maxInRow,
            false,
            styles["percent-bg"]
          )
        }}
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
