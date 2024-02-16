import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

// export const URL = process.env.REACT_APP_SERVER_URL;

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.msg);
    }
    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { login };
};
