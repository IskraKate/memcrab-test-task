import { useMatrix } from "../hooks/useMatrix"

const Table = () => {
  const { state } = useMatrix()
  return (
    <div>
      {state.matrix.map((row) => (
        <p>
          {row.map((col) => (
            <span>{` ${col.amount}`}</span>
          ))}
        </p>
      ))}
    </div>
  )
}

export default Table
