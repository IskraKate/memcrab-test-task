import { use } from "react"
import { MatrixContext } from "../context/MatrixContext"

export const useMatrix = () => {
  const ctx = use(MatrixContext)

  if (!ctx) throw new Error("useMatrix must be used within MatrixProvider")
  return ctx
}
