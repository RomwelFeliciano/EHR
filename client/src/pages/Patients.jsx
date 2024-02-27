import { useEffect, useContext } from "react";

import { ToastContainer } from "react-toastify";

import { loadingContext } from "../contexts/LoadingContext";
import { PatientTableContext } from "../contexts/PatientTableContext";

import { useAuthContext } from "../hooks/useAuthContext";
import { usePatientContext } from "../hooks/usePatientContext";
import { useSearchContext } from "../hooks/useSearchContext";
import { useModalContext } from "../hooks/useModalContext";

import Loading from "../components/Loading";
import Table from "../components/Table";

const Patients = () => {
  // User Hook Authentication
  const { user } = useAuthContext();

  // Patient Hook with Reducer
  const { patients, dispatch } = usePatientContext();

  // Search Hook
  const { searchQuery, setSearchQuery } = useSearchContext();
  const { setShowModal, setModalType } = useModalContext();

  // Use Context for Global State
  const { isLoading } = useContext(loadingContext);
  const { setCurrentPage } = useContext(PatientTableContext);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/patients", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "GET_PATIENTS", payload: json });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients(); // Call fetchPatients function
  }, [dispatch, user]); // Add isLoading as a dependency

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

  const updatePatient = () => {
    setShowModal(true);
    setModalType({ addModal: true });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen items-start justify-center pt-28">
          <Loading />
        </div>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-start gap-4 pt-44">
          <ToastContainer position="top-center" autoClose={3000} />
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
              <button
                className="flex h-10 w-32 items-center justify-center rounded-lg bg-main py-2 font-semibold text-second transition-all duration-300 ease-in-out hover:border-2 hover:border-main hover:bg-second hover:text-black"
                onClick={updatePatient}
              >
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
