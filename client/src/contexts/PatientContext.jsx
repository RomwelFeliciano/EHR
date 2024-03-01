import { createContext, useReducer } from "react";

const PatientContext = createContext();

const patientsReducer = (state, action) => {
  // console.log(state, action);
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
        patients: state.patients.map((patient) =>
          patient._id === action.payload._id ? action.payload : patient,
        ),
      };
    case "DELETE_PATIENT":
      return {
        patients: state.patients.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

const PatientContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientsReducer, {
    patients: [],
  });

  return (
    <PatientContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
};

export { PatientContext, patientsReducer, PatientContextProvider };
