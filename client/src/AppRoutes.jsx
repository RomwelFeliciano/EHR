import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Import the Pages Here
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Patients from "./pages/Patients";

const AppRoutes = () => {
  const { user } = useAuthContext();

  return (
    // Syntax of Routes and Route
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/patients"
        element={user ? <Patients /> : <Navigate to="/login" />}
      />
      {/* Error 404 When Page Not is Not Found */}
      <Route
        path="*"
        element={
          <h1 className="flex min-h-screen items-center justify-center text-center text-3xl font-bold">
            Error 404 <br />
            Page not Found!
          </h1>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
