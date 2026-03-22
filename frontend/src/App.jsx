import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SpinnerPage from "./components/Spinner/SpinnerPage";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const { loading } = useAuth();
  if(loading)  return <SpinnerPage />
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
            } 
        />

        <Route path="/dashboard" 
          element={ 
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

