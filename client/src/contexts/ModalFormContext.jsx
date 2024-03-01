import { createContext, useState } from "react";

export const ModalFormContext = createContext();

export const ModalFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    _id: "",
    fullname: "",
    birthday: "",
    hospitalNumber: "",
    religion: "",
    address: "",
    dateOfAdmission: "",
    complaint: "",
    diagnosis: "",
    addedBy: "",
    patientPicture: "",
  });

  return (
    <ModalFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </ModalFormContext.Provider>
  );
};
