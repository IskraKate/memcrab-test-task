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
          onMouseLeave={onClearHighlight}
          onClick={() => incrementCell(cell.id)}
          style={{
            border: "1px solid #ccc",
            padding: ".5rem",
            textAlign: "right",
            cursor: "pointer",
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
          deleteRow(row.rowId)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </tr>
  )
}

export default RowItem
