import "./App.css"
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CreateScreen from "./screens/CreateScreen";
import AuthScreen from "./screens/AuthScreen";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import UpdateScreen from "./screens/UpdateScreen";

function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/update/:id" element={<UpdateScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
