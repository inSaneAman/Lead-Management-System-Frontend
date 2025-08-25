import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landingPage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateLead from "./pages/createLead";
import Leads from "./pages/leads";
import SingleLead from "./pages/singleLead";
import Profile from "./pages/profile";
import ChangePassword from "./pages/changePassword";
function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/create-lead" element={<CreateLead />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/lead/:id" element={<SingleLead />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />
                </Routes>
                <Toaster />
            </div>
        </Router>
    );
}

export default App;
