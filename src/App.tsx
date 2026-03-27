import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/login"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute>
          <Layout />
        </ProtectedRoute>}>
        <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
