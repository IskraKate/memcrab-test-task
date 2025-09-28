import Table from "./components/Table"
import Settings from "./components/Settings"
import { MatrixProvider } from "./context/MatrixProvider"

function App() {
  return (
    <MatrixProvider>
      <Settings />
      <Table />
    </MatrixProvider>
  )
}

export default App
