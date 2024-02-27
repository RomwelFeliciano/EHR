import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { ModalFormContext } from "../contexts/ModalFormContext";
import ViewModal from "./ViewModal";
import AddModal from "./AddModal";

const Modal = () => {
  const { setShowModal, modalType, setModalType } = useContext(ModalContext);
  const { setFormData } = useContext(ModalFormContext);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType({
      addModal: false,
      viewModal: false,
      updateModal: false,
      deleteModal: false,
    });
    setFormData({
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
        <div className="-mt-2 w-full lg:min-w-[900px]">
          {/* Your modal content goes here */}
          {modalType.addModal && <AddModal />}
          {modalType.viewModal && <ViewModal />}
          {modalType.updateModal && <ViewModal />}
          {modalType.deleteModal && <ViewModal />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
