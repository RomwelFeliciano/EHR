import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { ModalFormContext } from "../contexts/ModalFormContext";

const Modal = () => {
  const { formData, setFormData } = useContext(ModalFormContext);
  const { setShowModal } = useContext(ModalContext);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div
      className="fixed top-0 z-0 flex h-full w-full items-center justify-center bg-neutral-700 bg-opacity-80 p-4 md:p-0"
      onClick={handleOverlayClick}
    >
      <div className="relative flex w-full flex-col rounded-lg bg-second p-4 md:w-auto">
        <button
          className="absolute right-3 top-3 z-10 flex h-5 w-5 items-center justify-center rounded text-3xl"
          onClick={handleCloseModal}
        >
          &times;
        </button>
        <div className="-mt-2 w-full">
          {/* Your modal content goes here */}
          <div className="flex flex-col items-center justify-center p-2">
            <h1 className="pb-4 text-2xl font-semibold">Patient's Details</h1>
            <img
              src={`http://localhost:5000/server/uploads/patient-picture/${formData.patientPicture}`}
              alt=""
              className="h-28 w-28 rounded-full"
            />
            <form className="grid grid-cols-12 gap-4 pt-4">
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Fullname:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.fullname}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Birthday:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.birthday}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Hospital #:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.hospitalNumber}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Religion:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.religion}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Address:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.address}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Date of Admission:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.dateOfAdmission}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Complaint:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.complaint}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Diagnosis:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.diagnosis}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <label className="font-medium">Added By:</label>
                <span className="flex min-h-9 w-72 items-center rounded-lg bg-white pl-2">
                  {formData.addedBy}
                </span>
              </div>
              <button className="col-span-full h-10 items-center justify-center rounded-lg bg-main py-2 font-semibold text-second transition-all duration-300 ease-in-out hover:bg-third">
                Assess the Patient
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
