import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./pages/post";
import Profile from "./pages/profile";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import AuthProvider from "./utils/auth";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Post /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute >} />
          <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute >} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
