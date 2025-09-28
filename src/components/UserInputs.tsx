import { useMatrix } from "../hooks/useMatrix"

const UserInputs = () => {
  const {
    rows,
    setRows,
    columns,
    setColumns,
    nearestAmount,
    setNearestAmount,
  } = useMatrix()
  const maxNearestAmount = rows * columns - 1

  return (
    <div>
      <label htmlFor="rows">Rows:</label>
      <input
        type="number"
        id="rows"
        name="rows"
        min={0}
        max={100}
        value={rows}
        onChange={(e) => setRows(Number(e.target.value))}
      />

      <label htmlFor="columns">Columns:</label>
      <input
        type="number"
        id="columns"
        name="columns"
        min={0}
        max={100}
        value={columns}
        onChange={(e) => setColumns(Number(e.target.value))}
      />

      <label htmlFor="nearest">Nearest cells:</label>
      <input
        type="number"
        id="nearest"
        name="nearest"
        min={0}
        max={maxNearestAmount}
        value={nearestAmount}
        onChange={(e) => setNearestAmount(Number(e.target.value))}
      />
    </div>
  )
}

export default UserInputs
