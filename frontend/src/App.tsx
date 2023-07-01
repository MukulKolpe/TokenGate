import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Events from "./pages/Events/Events";
import AddEvent from "./pages/AddEvent/AddEvent";
import EventDetails from "./pages/EventDetails/EventDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import "./App.css";

const polybase = new Polybase();
const auth = new Auth();
function App() {
  return (
    <>
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
            </Routes>
          </Router>
        </AuthProvider>
      </PolybaseProvider>
    </>
  );
}

export default App;
