import { PatientContext } from "../contexts/PatientContext";
import { useContext } from "react";

export const usePatientContext = () => {
  const context = useContext(PatientContext);

  if (!context) {
    throw Error(
      "usePatientContext must be used inside a PatientContextProvider",
    );
  }

  return context;
};
