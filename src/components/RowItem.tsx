import { useState } from "react"
import type { Cell, Row } from "../types/matrix"
import AlertDialog from "./Alert"

type RowItemProps = {
  row: Row
  onRemove: (rowId: number) => void
}

const RowItem = ({ row, onRemove }: RowItemProps) => {
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
          style={{
            border: "1px solid #ccc",
            padding: ".5rem",
            textAlign: "right",
          }}
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
          console.log(row.rowId)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </tr>
  )
}

export default RowItem
