import { Link } from "react-router-dom";

const Login = ({ handleLogin }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="bg-main w-[500px] rounded-lg p-4 shadow-2xl">
        <h1 className="mb-4 text-center text-3xl font-semibold">Sign In</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className=" col-span-12 flex flex-col">
            <label className="pb-1 text-lg font-medium">Email:</label>
            <input
              type="email"
              className="h-9 rounded px-2 py-1 focus:outline-none"
            />
          </div>
          <div className=" col-span-12 flex flex-col">
            <label className="pb-1 text-lg font-medium">Password:</label>
            <input
              type="password"
              className="h-9 rounded px-2 py-1 focus:outline-none"
            />
          </div>
          <Link to="/" className="col-span-full w-full" onClick={handleLogin}>
            <button className="bg-second col-span-full mt-2 h-9 w-full rounded font-medium transition-all duration-300 ease-in-out hover:bg-neutral-300">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
