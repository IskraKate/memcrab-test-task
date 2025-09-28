import { createMatrix } from "../utils/utils"

const Table = () => {
  const array = createMatrix(2, 10)
  return (
    <div>
      {array.map((row) => (
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
