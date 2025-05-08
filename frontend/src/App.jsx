import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Suggestions from "./pages/Suggestions/Suggestions";
import Login from "./pages/Auth/Login/page";
import Register from "./pages/Auth/Register/Utils/page";
import History from "./pages/History";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} /> {/* Tela inicial */}
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/Suggestions" element={<Suggestions />} />
				<Route path="/history" element={<History />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
