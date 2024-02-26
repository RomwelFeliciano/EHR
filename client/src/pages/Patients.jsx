import { useState, useEffect, useRef, useContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { loadingContext } from "../contexts/LoadingContext";
import { useSearchContext } from "../hooks/useSearchContext";
import { PatientTableContext } from "../contexts/PatientTableContext";
import Loading from "../components/Loading";
import Table from "../components/Table";
import axios from "axios";

const Patients = () => {
  const { user } = useAuthContext();
  const { isLoading, setIsLoading } = useContext(loadingContext);
  const { setCurrentPage } = useContext(PatientTableContext);
  const { searchQuery, setSearchQuery } = useSearchContext();

  const [patients, setPatients] = useState([]);

  const getPatients = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/patients", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPatients(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getPatientsRef = useRef(getPatients);

  useEffect(() => {
    if (user) {
      getPatientsRef.current();
    }
  }, [user, getPatientsRef]);

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem("searchQuery");
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
  }, [setSearchQuery]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredPatients = patients.filter((patient) =>
    Object.values(patient).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

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
            <div className="flex items-center justify-center gap-4">
              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-56 rounded-lg border border-gray-300 bg-white px-3 outline-none transition-all duration-300 focus:border-main"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="flex h-10 w-32 items-center justify-center rounded-lg bg-main py-2 font-semibold text-second transition-all duration-300 ease-in-out hover:border-2 hover:border-main hover:bg-second hover:text-black">
                Add Patient
              </button>
            </div>
          </div>
          <Table patients={filteredPatients} />
        </div>
      )}
    </>
  );
};

export default Patients;
