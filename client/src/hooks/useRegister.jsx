import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

// To use the URL Localhost of backend
// export const URL = process.env.REACT_APP_SERVER_URL;

// useRegister for Registration Hook
export const useRegister = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  // Handle Register user data
  const register = async (
    firstname,
    lastname,
    position,
    contactNumber,
    email,
    password,
    profilePicture,
  ) => {
    // Set the error to null
    setError(null);

    console.log(profilePicture);

    try {
      // use this kind of data processing when using fetch method
      const data = new FormData();
      data.append("firstname", firstname);
      data.append("lastname", lastname);
      data.append("position", position);
      data.append("contactNumber", contactNumber);
      data.append("email", email);
      data.append("password", password);
      data.append("profilePicture", profilePicture);

      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        body: data,
      });
      const json = await response.json();

      //   Use this one when using axios
      //   const response = await axios.post(
      //     "http://localhost:5000/api/user/register",
      //     {
      //       firstname,
      //       lastname,
      //       position,
      //       contactNumber,
      //       email,
      //       password,
      //       profilePicture,
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     },
      //   );

      //   const json = response.data;
      console.log(response);
      console.log(json);

      if (!profilePicture) {
        setError("Please select a Profile Picture");
      }

      if (!response.ok) {
        setError(json.msg, "WASAGI");
      }
      if (response.ok) {
        // Save the user to local storage
        // localStorage.setItem("user", JSON.stringify(json));

        // Update the auth context
        // dispatch({ type: "LOGIN", payload: json });
        console.log(json, "IT WAS OKAY");
      }
    } catch (error) {
      console.log(error.message, "HEYHEY ERROR");

      setError(error.message);
    }

    if (!profilePicture) {
      setError("Please upload a file");
    }
  };
  return { register, error };
};
