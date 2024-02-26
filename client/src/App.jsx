import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./AppRoutes";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { loadingContext } from "./contexts/LoadingContext";
import { SearchProvider } from "./contexts/SearchPatientContext";
import { PatientTableProvider } from "./contexts/PatientTableContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <loadingContext.Provider value={{ isLoading, setIsLoading }}>
        <PatientTableProvider>
          <SearchProvider>
            <Navbar />
            <main className="bg-neutral-100 px-32">
              <AppRoutes />
            </main>
          </SearchProvider>
        </PatientTableProvider>
      </loadingContext.Provider>
    </Router>
  );
}

export default App;
