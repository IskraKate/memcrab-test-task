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
        label="Please enter rows: "
        value={rows}
        onChange={setRows}
        helpText="Number of table rows (from 0 to 100)"
      />

      <NumberField
        label="Please enter columns: "
        value={columns}
        onChange={setColumns}
        helpText="Number of table columns (from 0 to 100)"
      />

      <NumberField
        label="Please enter nearest cells (how much cells with nearest values should be highlighted): "
        value={nearestAmount}
        onChange={setNearestAmount}
        max={maxNearest}
        disabled={maxNearest === 0}
        helpText={`Max X: ${maxNearest}${
          maxNearest === 0
            ? " (no cells available, columns and rows should be greater than 0)"
            : ""
        }`}
      />
    </fieldset>
  )
}

export default Settings
