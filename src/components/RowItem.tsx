import { useState } from "react"
import type { Cell, Row } from "../types/matrix"
import AlertDialog from "./Alert"

type RowItemProps = {
  row: Row
  highlighted: Set<number>
  onRemove: (rowId: number) => void
  onHighlight: (cell: Cell) => void
  onClearHighlight: () => void
}

const RowItem = ({
  row,
  highlighted,
  onRemove,
  onHighlight,
  onClearHighlight,
}: RowItemProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const rowSum = row.cells.reduce((acc, c) => acc + c.amount, 0)

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
      {row.cells.map((cell: Cell) => (
        <td
          key={cell.id}
          onMouseEnter={() => onHighlight(cell)}
          onMouseLeave={() => onClearHighlight()}
          style={{
            border: "1px solid #ccc",
            padding: ".5rem",
            textAlign: "right",
          }}
          className={highlighted.has(cell.id) ? "nearest" : undefined}
        >
          {cell.amount}
        </td>
      ))}
      <td
        key={`${row.rowId}-sum`}
        style={{
          border: "1px solid #ccc",
          padding: ".5rem",
          textAlign: "right",
          fontWeight: "bold",
        }}
      >
        {rowSum}
      </td>

      <AlertDialog
        open={confirmOpen}
        onConfirm={() => {
          setConfirmOpen(false)
          onRemove(row.rowId)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </tr>
  )
}

export default RowItem
