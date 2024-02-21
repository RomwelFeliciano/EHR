import { useState, useEffect, useRef, useContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { loadingContext } from "../contexts/LoadingContext";
import Loading from "../components/Loading";
import Table from "../components/Table";
import axios from "axios";

const Patients = () => {
  const { isLoading, setIsLoading } = useContext(loadingContext);
  // const [isLoading, setIsLoading] = useState(true);

  const [patients, setPatients] = useState([]);

  const { user } = useAuthContext();

  // Handle Get All Data
  const getPatients = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/patients", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPatients(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
      console.log(error);
    }
  };

  // Re-render when there are notes
  const getPatientsRef = useRef(getPatients);

  useEffect(() => {
    if (user) {
      getPatientsRef.current();
    }
  }, [user, getPatientsRef]);

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen items-start justify-center pt-28">
          <Loading />
        </div>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-start gap-4 pt-44">
          <div className="flex h-10 w-full justify-between">
            <h1 className="text-2xl font-bold">Patient's Table</h1>
            <button className="flex h-10 w-32 items-center justify-center rounded-lg bg-main py-2 font-semibold text-second transition-all duration-300 ease-in-out hover:border-2 hover:border-main hover:bg-second hover:text-black">
              Add Patient
            </button>
          </div>
          <Table patients={patients} />
        </div>
      )}
    </>
  );
};

export default Patients;
