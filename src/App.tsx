import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/login"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App
