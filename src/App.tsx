import Table from "./components/Table"
import Settings from "./components/Settings"
import { MatrixProvider } from "./context/MatrixProvider"

function App() {
  return (
    <MatrixProvider>
      <div className="container">
        <Settings />
        <Table />
      </div>
    </MatrixProvider>
  )
}

export default App
