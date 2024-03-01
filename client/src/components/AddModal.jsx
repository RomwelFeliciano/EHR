import { useContext, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import { loadingContext } from "../contexts/LoadingContext";
import { ModalContext } from "../contexts/ModalContext";
import { ModalFormContext } from "../contexts/ModalFormContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePatientContext } from "../hooks/usePatientContext";

const AddModal = () => {
  const { user } = useAuthContext();

  const { setIsLoading } = useContext(loadingContext);
  const { setShowModal, modalType, setModalType } = useContext(ModalContext);
  const { formData, setFormData } = useContext(ModalFormContext);
  const { dispatch } = usePatientContext();

  const [currentPicture, setCurrentPicture] = useState(null); // State to hold the current picture

  const newFormData = new FormData();
  // Append each form field to the FormData object
  newFormData.append("fullname", formData.fullname);
  newFormData.append("birthday", formData.birthday);
  newFormData.append("hospitalNumber", formData.hospitalNumber);
  newFormData.append("religion", formData.religion);
  newFormData.append("address", formData.address);
  newFormData.append("complaint", formData.complaint);
  newFormData.append("dateOfAdmission", formData.dateOfAdmission);
  newFormData.append("diagnosis", formData.diagnosis);
  newFormData.append("patientPicture", formData.patientPicture);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePatientPicture = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      patientPicture: file, // Store the file object in profilePicture state
    });
    setCurrentPicture(formData.patientPicture);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const response = await fetch("http://localhost:5000/api/patients", {
      method: "POST",
      body: newFormData,
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    // console.log(response, json);

    if (!response.ok) {
      toast.error(json.error);
      // console.log(json.error);
    }
    if (response.ok) {
      setShowModal(false);
      setModalType({
        addModal: false,
        viewModal: false,
        updateModal: false,
        deleteModal: false,
      });
      setFormData({
        _id: "",
        fullname: "",
        birthday: "",
        hospitalNumber: "",
        religion: "",
        address: "",
        dateOfAdmission: "",
        complaint: "",
        diagnosis: "",
        addedBy: "",
        patientPicture: "",
      });

      dispatch({ type: "ADD_PATIENT", payload: json });
      setIsLoading(true);
    }
  };

  // Handle Update a Patient
  const updatePatient = async (e) => {
    e.preventDefault();

    if (
      !formData.fullname ||
      !formData.birthday ||
      !formData.hospitalNumber ||
      !formData.religion ||
      !formData.address ||
      !formData.dateOfAdmission ||
      !formData.complaint ||
      !formData.diagnosis
    ) {
      return toast.error("Please do not leave an empty input");
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/patients/${formData._id}`,
        {
          method: "PUT",
          body: newFormData,
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      const json = await response.json();

      // console.log(response, json);

      if (!response.ok) {
        toast.error(json.error);
        // console.log(json.error);
      }
      if (response.ok) {
        setShowModal(false);
        setModalType({
          addModal: false,
          viewModal: false,
          updateModal: false,
          deleteModal: false,
        });
        setFormData({
          _id: "",
          fullname: "",
          birthday: "",
          hospitalNumber: "",
          religion: "",
          address: "",
          dateOfAdmission: "",
          complaint: "",
          diagnosis: "",
          addedBy: "",
          patientPicture: "",
        });

        dispatch({ type: "UPDATE_PATIENT", payload: json });
        setIsLoading(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Month starts from 0
    let day = date.getDate();

    // Pad month and day with leading zeros if necessary
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    // Construct the formatted date string in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };

  // Output: YYYY-MM-DD
  const formattedBirthday = formatDate(formData.birthday);
  const formattedDateOfAdmission = formatDate(formData.dateOfAdmission);

  // console.log(formData.patientPicture, newFormData.patientPicture);

  return (
    <div className="flex w-full flex-col items-center justify-center p-2">
      <h1 className="pb-4 text-2xl font-semibold">
        {modalType.editModal === true ? "Edit" : "Add"} Patient
      </h1>

      <form
        className="grid w-full grid-cols-12 gap-4 pt-4"
        onSubmit={modalType.editModal === true ? updatePatient : handleSubmit}
      >
        <div className="relative col-span-12 flex items-center justify-center">
          <div className="h-32 w-32 overflow-hidden rounded-full">
            {formData.patientPicture ? (
              <img
                src={
                  formData.patientPicture !== null && currentPicture === null
                    ? `http://localhost:5000/server/uploads/patient-picture/${formData.patientPicture}`
                    : URL.createObjectURL(formData.patientPicture)
                } // Use URL.createObjectURL to display the selected image
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-300"></div>
            )}
          </div>
          <label htmlFor="profile" className="absolute bottom-2 right-[275px]">
            <div className="flex items-center justify-center gap-2">
              <FaCamera className="text-2xl text-neutral-800" />
              <span className="text-sm font-bold">Upload Picture</span>
            </div>
          </label>
          <input
            type="file"
            id="profile"
            name="patientPicture"
            hidden
            onChange={handlePatientPicture}
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label className="font-medium" htmlFor="fullname">
            Fullname:
          </label>
          <input
            type="text"
            className="h-9 rounded-lg px-2 py-1 focus:outline-none"
            name="fullname"
            id="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label className="font-medium" htmlFor="birthday">
            Birthday:
          </label>
          <input
            type="date"
            className="h-9 rounded-lg px-2 py-1 focus:outline-none"
            name="birthday"
            id="birthday"
            value={
              modalType.editModal === true
                ? formattedBirthday
                : formData.birthday
            }
            onChange={handleChange}
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label className="font-medium" htmlFor="hospitalNumber">
            Hospital #:
          </label>
          <input
            type="text"
            className="h-9 rounded-lg px-2 py-1 focus:outline-none"
            name="hospitalNumber"
            id="hospitalNumber"
            value={formData.hospitalNumber}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label className="font-medium" htmlFor="religion">
            Religion:
          </label>
          <input
            type="text"
            className="h-9 rounded-lg px-2 py-1 focus:outline-none"
            name="religion"
            id="religion"
            value={formData.religion}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label className="font-medium" htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            className="h-9 rounded-lg px-2 py-1 focus:outline-none"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label className="font-medium" htmlFor="complaint">
            Complaint:
          </label>
          <input
            type="text"
            className="h-9 rounded-lg px-2 py-1 focus:outline-none"
            name="complaint"
            id="complaint"
            value={formData.complaint}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-6 flex flex-col">
          <label className="font-medium" htmlFor="dateOfAdmission">
            Date Of Admission:
          </label>
          <input
            type="date"
            className="h-9 rounded-lg px-2 py-1 focus:outline-none"
            name="dateOfAdmission"
            id="dateOfAdmission"
            value={
              modalType.editModal === true
                ? formattedDateOfAdmission
                : formData.dateOfAdmission
            }
            onChange={handleChange}
          />
        </div>
        <div className="col-span-6 flex flex-col">
          <label className="font-medium" htmlFor="diagnosis">
            Diagnosis:
          </label>
          <input
            type="text"
            className="h-9 rounded-lg px-2 py-1 focus:outline-none"
            name="diagnosis"
            id="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
          />
        </div>

        <button className="col-span-full h-10 items-center justify-center rounded-lg bg-main py-2 font-semibold text-second transition-all duration-300 ease-in-out hover:bg-third">
          {modalType.editModal ? "Edit" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddModal;
