import { createContext, useReducer, useEffect } from "react";

// Export AuthContext to used in any files in the project
export const AuthContext = createContext();

// Use for authentication to choose what action it should be
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // action.payload to contain the user data
      return { user: action.payload };
    case "LOGOUT":
      // user is null because it doesnt require additional data
      return { user: null };
    default:
      return state;
  }
};

// Function Context Provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    // Initial state is set to null
    user: null,
  });

  //   UseEffect for retrieving the user data from the localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
