import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/login"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import Applications from "./pages/Applications"
import Interviews from "./pages/Interviews"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute>
          <Layout />
        </ProtectedRoute>}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Applications" element={<Applications/>} />
        <Route path="/Interviews" element={<Interviews/>} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
