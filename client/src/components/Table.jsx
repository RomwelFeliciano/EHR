import { useContext, useEffect, useMemo } from "react";
import Pagination from "./Pagination";
import { PatientTableContext } from "../contexts/PatientTableContext";
import { ModalContext } from "../contexts/ModalContext";
import { ModalFormContext } from "../contexts/ModalFormContext";
import Modal from "./Modal";

const Table = ({ patients }) => {
  const { firstIndex, lastIndex, recordsPerPage, setTotalPatients } =
    useContext(PatientTableContext);

  const { showModal, setShowModal, setModalType } = useContext(ModalContext);
  const { formData, setFormData } = useContext(ModalFormContext);

  const patientsData = useMemo(
    () => patients.slice(firstIndex, lastIndex),
    [patients, firstIndex, lastIndex],
  );

  // Calculate the total number of pages and page numbers
  const numberOfPages = Math.ceil(patients.length / recordsPerPage);
  const numbers = useMemo(
    () => [...Array(numberOfPages + 1).keys()].slice(1),
    [numberOfPages],
  );

  // Update total patients when patients change
  useEffect(() => {
    setTotalPatients(patients.length);
  }, [patients, setTotalPatients]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };

  // Handle View Patient
  const viewPatient = async (patient) => {
    setShowModal(true);
    setModalType({ viewModal: true });
    setFormData({
      fullname: patient.fullname,
      birthday: formatDate(patient.birthday),
      hospitalNumber: patient.hospitalNumber,
      religion: patient.religion,
      address: patient.address,
      dateOfAdmission: formatDate(patient.dateOfAdmission),
      complaint: patient.complaint,
      diagnosis: patient.diagnosis,
      addedBy: patient.addedBy,
      patientPicture: patient.patientPicture,
    });
    // setNoteID(patient._id);
  };

  // Handle Get Single Note
  const getSinglePatient = async (patient) => {
    setFormData({
      _id: patient._id,
      fullname: patient.fullname,
      birthday: formatDate(patient.birthday),
      hospitalNumber: patient.hospitalNumber,
      religion: patient.religion,
      address: patient.address,
      dateOfAdmission: formatDate(patient.dateOfAdmission),
      complaint: patient.complaint,
      diagnosis: patient.diagnosis,
      addedBy: patient.addedBy,
      patientPicture: patient.patientPicture,
    });
    setShowModal(true);
    setModalType({ addModal: true, editModal: true });
  };

  const showDeleteModal = async (patient) => {
    setFormData({ _id: patient._id, fullname: patient.fullname });
    setShowModal(true);
    setModalType({ deleteModal: true });
  };

  return (
    <>
      <table className="w-full rounded-lg text-left text-sm font-medium text-gray-800 rtl:text-right">
        <thead className="text-se bg-main text-xs uppercase text-second">
          <tr>
            <th scope="col" className="px-6 py-3">
              Patient's Picture
            </th>
            <th scope="col" className="px-6 py-3">
              Patient's Name
            </th>
            <th scope="col" className="px-6 py-3">
              Birthday
            </th>
            <th scope="col" className="px-6 py-3">
              Hospital #
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Date of Admission
            </th>
            <th scope="col" className="px-6 py-3">
              Admitting Diagnosis
            </th>
            <th scope="col" className="px-6 py-3">
              Admitted By
            </th>
            <th scope="col" colSpan={3} className="px-6 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {patientsData &&
            patientsData.map((patient) => {
              const dateOfBirthday = formatDate(patient.birthday);
              const dateOfAdmissionFormat = formatDate(patient.createdAt);

              return (
                <tr
                  className="border-b transition-all duration-200 ease-in-out odd:bg-white even:bg-pink-100 hover:bg-pink-300"
                  key={patient._id}
                >
                  <td scope="row" className="px-6 py-4">
                    <img
                      src={`http://localhost:5000/server/uploads/patient-picture/${patient.patientPicture}`}
                      className="h-16 w-16"
                      alt=""
                    />
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-semibold text-black"
                  >
                    {patient.fullname}
                  </td>
                  <td className="px-6 py-4">{dateOfBirthday}</td>
                  <td className="px-6 py-4">{patient.hospitalNumber}</td>
                  <td className="px-6 py-4">{patient.address}</td>
                  <td className="px-6 py-4">{dateOfAdmissionFormat}</td>
                  <td className="px-6 py-4">{patient.diagnosis}</td>
                  <td className="px-6 py-4">{patient.addedBy}</td>
                  <td className="px-2 py-4">
                    <button
                      className="w-14 rounded-lg bg-blue-400 py-2 hover:bg-blue-600"
                      onClick={() => viewPatient(patient)}
                    >
                      View
                    </button>
                  </td>
                  <td className="px-2 py-4">
                    <button
                      className="w-14 rounded-lg bg-green-400 py-2 hover:bg-green-600"
                      onClick={() => getSinglePatient(patient)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-4 pl-2 pr-4">
                    <button
                      className="w-14 rounded-lg bg-red-400 py-2 hover:bg-red-600"
                      onClick={() => showDeleteModal(patient)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination numbers={numbers} numberOfPages={numberOfPages} />
      {showModal === true ? <Modal /> : null}
    </>
  );
};

export default Table;
