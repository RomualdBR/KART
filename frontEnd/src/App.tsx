import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Post from "./pages/post";
import Profile from "./pages/Profile";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import AuthProvider from "./utils/auth";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Post />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
