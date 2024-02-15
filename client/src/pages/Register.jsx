import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import axios from "axios"; // Import axios for making HTTP requests.
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const { register, error, isLoading, setIsLoading } = useRegister();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    position: "",
    contactNumber: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfile = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePicture: file, // Store the file object in profilePicture state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append("firstname", formData.firstname);
    // data.append("lastname", formData.lastname);
    // data.append("position", formData.position);
    // data.append("contactNumber", formData.contactNumber);
    // data.append("email", formData.email);
    // data.append("password", formData.password);
    // data.append("profilePicture", formData.profilePicture);

    try {
      await register(
        formData.firstname,
        formData.lastname,
        formData.position,
        formData.contactNumber,
        formData.email,
        formData.password,
        formData.profilePicture,
      );

      console.log("User Created Successfully!");
    } catch (error) {
      console.log("NETWORK ERROR:", error);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // try {
    //   // Make a POST request to your backend endpoint
    //   const response = await axios.post(
    //     "http://localhost:5000/api/user/register",
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     },
    //   );

    //   console.log("User registered:", response.data);
    //   // Reset form data after successful registration
    //   setFormData({
    //     firstname: "",
    //     lastname: "",
    //     position: "",
    //     contactNumber: "",
    //     email: "",
    //     password: "",
    //     profilePicture: "",
    //   });
    // } catch (error) {
    //   console.error("Error registering user:", error.response.data);
    // }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="w-[800px] rounded-lg bg-main p-4 shadow-2xl"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-center text-3xl font-semibold">
          Registration
        </h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="relative col-span-12 flex items-center justify-center">
            <div className="h-32 w-32 overflow-hidden rounded-full">
              {formData.profilePicture ? (
                <img
                  src={URL.createObjectURL(formData.profilePicture)} // Use URL.createObjectURL to display the selected image
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300"></div>
              )}
            </div>
            <label htmlFor="profile" className="absolute bottom-2 right-52">
              <div className="flex items-center justify-center gap-2">
                <FaCamera className="text-2xl text-neutral-800" />
                <span className="text-sm font-bold">Upload Picture</span>
              </div>
            </label>
            <input
              type="file"
              id="profile"
              name="profilePicture"
              hidden
              onChange={handleProfile}
            />
          </div>
          <div className=" col-span-6 flex flex-col">
            <label className="pb-1 text-lg font-medium">First Name:</label>
            <input
              type="text"
              className="h-9 rounded px-2 py-1 focus:outline-none"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className=" col-span-6 flex flex-col">
            <label className="pb-1 text-lg font-medium">Last Name:</label>
            <input
              type="text"
              className="h-9 rounded px-2 py-1 focus:outline-none"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className=" col-span-6 flex flex-col">
            <label className="pb-1 text-lg font-medium">Position: </label>
            <input
              type="text"
              className="h-9 rounded px-2 py-1 focus:outline-none"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div className=" col-span-6 flex flex-col">
            <label className="pb-1 text-lg font-medium">Contact Number:</label>
            <input
              type="text"
              className="h-9 rounded px-2 py-1 focus:outline-none"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className=" col-span-6 flex flex-col">
            <label className="pb-1 text-lg font-medium">Email:</label>
            <input
              type="email"
              className="h-9 rounded px-2 py-1 focus:outline-none"
              autoComplete="username"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className=" col-span-6 flex flex-col">
            <label className="pb-1 text-lg font-medium">Password:</label>
            <input
              type="password"
              className="h-9 rounded px-2 py-1 focus:outline-none"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="col-span-full mt-2 h-9 w-full rounded bg-second font-medium transition-all duration-300 ease-in-out hover:bg-neutral-300"
            type="submit"
            disabled={isLoading}
          >
            Register {error}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
