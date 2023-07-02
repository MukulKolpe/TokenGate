import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Events from "./pages/Events/Events";
import AddEvent from "./pages/AddEvent/AddEvent";
import EventDetails from "./pages/EventDetails/EventDetails";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import "./App.css";

const polybase = new Polybase();
const auth = new Auth();
function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <PolybaseProvider value={polybase}>
          <AuthProvider auth={auth} polybase={polybase}>
            <Router>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/explore" element={<Events />} />
                <Route path="/add-event" element={<AddEvent />} />
                <Route path="/explore/:id" element={<EventDetails />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
            </Router>
          </AuthProvider>
        </PolybaseProvider>
      </div>
    </>
  );
}

export default App;
