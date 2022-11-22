import { Route, Routes, useLocation } from 'react-router-dom'
import ProtectedLayout from './components/auth/Protectedlayout'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Transaction from './pages/transaction/Transaction'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedLayout>
            <Home />
          </ProtectedLayout>
        }
      />
      <Route
        path="/transaction"
        element={
          <ProtectedLayout>
            <Transaction />
          </ProtectedLayout>
        }
      />
      <Route path="/register">
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
