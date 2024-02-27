import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState({
    addModal: false,
    viewModal: false,
    editModal: false,
    deleteModal: false,
  });

  return (
    <ModalContext.Provider
      value={{ showModal, setShowModal, modalType, setModalType }}
    >
      {children}
    </ModalContext.Provider>
  );
};
