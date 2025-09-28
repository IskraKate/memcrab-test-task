import { useMatrix } from "../hooks/useMatrix"
import Row from "./RowItem"

const Table = () => {
  const { state, deleteRow } = useMatrix()
  const matrix = state?.matrix ?? []

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
            onRemove={(rowId) => deleteRow(rowId)}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Table
