import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./AppRoutes";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handeLogout = () => {
    setIsLogin(false);
  };
  return (
    <Router>
      <Navbar isLogin={isLogin} handeLogout={handeLogout} />
      <main className="bg-neutral-100 px-32">
        <AppRoutes handleLogin={handleLogin} />
      </main>
    </Router>
  );
}

export default App;
