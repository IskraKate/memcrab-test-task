import { useMatrix } from "../hooks/useMatrix"
import NumberField from "./UI/NumberField"

const Settings = () => {
  const { state, setColumns, setRows, setNearestAmount } = useMatrix()
  const { rows, columns, nearestAmount } = state
  const totalCells = rows * columns
  const maxNearest = Math.max(0, totalCells - 1)

  return (
    <fieldset>
      <legend>Settings</legend>

      <NumberField
        label="Rows: "
        value={rows}
        onChange={setRows}
        helpText="Number of table rows"
      />

      <NumberField
        label="Columns: "
        value={columns}
        onChange={setColumns}
        helpText="Number of table columns"
      />

      <NumberField
        label="Nearest cells amount: "
        value={nearestAmount}
        onChange={setNearestAmount}
        max={maxNearest}
        disabled={maxNearest === 0}
        helpText={`Max X: ${maxNearest}${
          maxNearest === 0 ? " (no cells available)" : ""
        }`}
      />
    </fieldset>
  )
}

export default Settings
