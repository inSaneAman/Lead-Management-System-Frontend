import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landingPage";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
                <Toaster />
            </div>
        </Router>
    );
}

export default App;
