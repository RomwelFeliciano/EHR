import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { loadingContext } from "../contexts/LoadingContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { isLoading, setIsLoading } = useContext(loadingContext);

  const handleLogout = () => {
    logout();
  };

  const handleLoadingTrue = () => {
    setIsLoading(true);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 800);

  return (
    <header className="fixed top-0 flex h-24 w-full items-center justify-between bg-main px-32 shadow-lg">
      <h1 className="w-full text-3xl font-bold text-second">EHR</h1>
      <nav
        className={`flex w-full items-center gap-4 text-lg font-medium ${user ? "justify-center" : "justify-end"}`}
      >
        <Link
          to="/"
          className="hover:text-second"
          onClick={isLoading ? null : handleLoadingTrue}
        >
          Home
        </Link>
        {user && (
          <>
            <Link
              to="/patients"
              className="hover:text-second"
              onClick={isLoading ? null : handleLoadingTrue} // Conditionally disable onClick handler
            >
              Patients
            </Link>
            <Link
              to="/assessments"
              className="hover:text-second"
              onClick={isLoading ? null : handleLoadingTrue} // Conditionally disable onClick handler
            >
              Assessments
            </Link>
          </>
        )}
        <Link
          to="/about"
          className="hover:text-second"
          onClick={isLoading ? null : handleLoadingTrue} // Conditionally disable onClick handler
        >
          About
        </Link>
        {!user && (
          <>
            <Link
              to="/login"
              className="rounded-lg border-2 border-second px-2 py-1 text-second transition-all duration-300 ease-in-out hover:border-black hover:bg-third hover:text-white"
              onClick={isLoading ? null : handleLoadingTrue} // Conditionally disable onClick handler
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg border-2 border-second px-2 py-1 text-second transition-all duration-300 ease-in-out hover:border-black hover:bg-third hover:text-white"
              onClick={isLoading ? null : handleLoadingTrue} // Conditionally disable onClick handler
            >
              Register
            </Link>
          </>
        )}
      </nav>

      {user && (
        <div className="flex w-full items-center justify-end gap-4">
          <h1 className="text-lg font-bold">
            Hello, {user.firstname} {user.lastname}
          </h1>
          <Link
            to="/"
            className="rounded-lg border-2 border-second px-2 py-1 text-second transition-all duration-300 ease-in-out hover:border-black hover:bg-third hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
