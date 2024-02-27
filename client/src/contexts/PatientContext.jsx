import { createContext, useReducer } from "react";

export const PatientContext = createContext();

export const patientsReducer = (state, action) => {
  switch (action.type) {
    case "GET_PATIENTS":
      return {
        patients: action.payload,
      };
    case "ADD_PATIENT":
      return {
        patients: [action.payload, ...state.patients],
      };
    case "UPDATE_PATIENT":
      return {
        patients: [action.payload, ...state.patients],
      };
    case "DELETE_PATIENT":
      return {
        patients: state.patients.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PatientContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientsReducer, {
    patients: [],
  });

  return (
    <PatientContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
};
