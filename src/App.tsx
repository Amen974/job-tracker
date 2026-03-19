import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/login"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
