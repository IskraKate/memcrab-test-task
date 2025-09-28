import Table from "./components/Table"
import UserInputs from "./components/UserInputs"
import { MatrixProvider } from "./context/MatrixProvider"

function App() {
  return (
    <MatrixProvider>
      <UserInputs />
      <Table />
    </MatrixProvider>
  )
}

export default App
