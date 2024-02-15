import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [loginForm, setIsLoginForm] = useState({
    email: "",
    password: "",
  });
  const { login, error } = useLogin();

  const handleChange = (e) => {
    setIsLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(loginForm.email, loginForm.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="w-[500px] rounded-lg bg-main p-4 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-center text-3xl font-semibold">Sign In</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className=" col-span-12 flex flex-col">
            <label className="pb-1 text-lg font-medium">Email:</label>
            <input
              type="email"
              className="h-9 rounded px-2 py-1 focus:outline-none"
              autoComplete="username"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
            />
          </div>
          <div className=" col-span-12 flex flex-col">
            <label className="pb-1 text-lg font-medium">Password:</label>
            <input
              type="password"
              className="h-9 rounded px-2 py-1 focus:outline-none"
              name="password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={handleChange}
            />
          </div>

          <button className="col-span-full mt-2 h-9 w-full rounded bg-second font-medium transition-all duration-300 ease-in-out hover:bg-neutral-300">
            Login {error}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
