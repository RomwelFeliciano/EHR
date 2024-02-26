import { useContext } from "react";
import ModalFormContext from "../contexts/ModalFormContext";

// Returning SearchPatientContext but checking if it is inside the provider
export const useModalFormContext = () => {
  const modalForm = useContext(ModalFormContext);

  if (!modalForm) {
    throw Error("useModalFormContext must be used inside a modalFormProvider");
  }

  return modalForm;
};
