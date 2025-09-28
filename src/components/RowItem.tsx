import type { Cell, Row } from "../types/matrix"

type RowItemProps = {
  row: Row
}

const RowItem = ({ row }: RowItemProps) => {
  const rowSum = row.cells.reduce((acc, c) => acc + c.amount, 0)

  return (
    <tr>
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
    </tr>
  )
}

export default RowItem
