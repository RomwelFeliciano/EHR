import { Route, Routes } from "react-router-dom";

//Components
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";

const AppRoutes = ({ handleLogin }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>Page not Found!</h1>} />
    </Routes>
  );
};

export default AppRoutes;
