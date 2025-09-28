import { useMatrix } from "../hooks/useMatrix"

const UserInputs = () => {
  const { state, dispatch } = useMatrix()
  const { rows, columns, nearestAmount } = state
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
        onChange={(e) =>
          dispatch({
            type: "SET_ROWS",
            rows: Number(e.target.value),
          })
        }
      />

      <label htmlFor="columns">Columns:</label>
      <input
        type="number"
        id="columns"
        name="columns"
        min={0}
        max={100}
        value={columns}
        onChange={(e) =>
          dispatch({
            type: "SET_COLUMNS",
            columns: Number(e.target.value),
          })
        }
      />

      <label htmlFor="nearest">Nearest cells:</label>
      <input
        type="number"
        id="nearest"
        name="nearest"
        min={0}
        max={maxNearestAmount}
        value={nearestAmount}
        onChange={(e) =>
          dispatch({
            type: "SET_NEAREST_AMOUNT",
            nearestAmount: Number(e.target.value),
          })
        }
      />
    </div>
  )
}

export default UserInputs
