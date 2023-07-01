import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Events from "./pages/Events/Events";
import AddEvent from "./pages/AddEvent/AddEvent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";

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
            </Routes>
          </Router>
        </AuthProvider>
      </PolybaseProvider>
    </>
  );
}

export default App;
