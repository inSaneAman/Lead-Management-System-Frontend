import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <Router>
            <div className="bg-black text-white">
                <Routes></Routes>
                <Toaster />
            </div>
        </Router>
    );
}
