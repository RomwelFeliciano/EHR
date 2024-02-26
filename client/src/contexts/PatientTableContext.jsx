import { createContext, useState } from "react";

export const PatientTableContext = createContext(null);

export const PatientTableProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0); // New state for total number of patients
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  // Your pagination logic here

  const contextValue = {
    currentPage,
    setCurrentPage,
    firstIndex,
    lastIndex,
    recordsPerPage,
    totalPatients, // Add totalPatients to the context value
    setTotalPatients, // Add setTotalPatients function to update the total number of patients
  };

  return (
    <PatientTableContext.Provider value={contextValue}>
      {children}
    </PatientTableContext.Provider>
  );
};
