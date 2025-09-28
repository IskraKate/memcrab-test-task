import { useMatrix } from "../hooks/useMatrix"

const Table = () => {
  const { matrix } = useMatrix()
  return (
    <div>
      {matrix.map((row) => (
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
