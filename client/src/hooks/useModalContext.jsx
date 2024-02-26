import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";

// Returning SearchPatientContext but checking if it is inside the provider
export const useModalContext = () => {
  const modal = useContext(ModalContext);

  if (!modal) {
    throw Error("useModalContext must be used inside a ModalProvider");
  }

  return modal;
};
