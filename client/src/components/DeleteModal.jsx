import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { ModalFormContext } from "../contexts/ModalFormContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePatientContext } from "../hooks/usePatientContext";
import { toast } from "react-toastify";

const DeleteModal = () => {
  const { user } = useAuthContext();

  const { setShowModal, modalType, setModalType } = useContext(ModalContext);
  const { formData, setFormData } = useContext(ModalFormContext);

  const { dispatch } = usePatientContext();

  const handleDeleteYes = async (id) => {
    if (!user) {
      toast.error("You must be logged in");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

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

        dispatch({ type: "DELETE_PATIENT", payload: json });
      }
      toast.success("Patient has been Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteNo = () => {
    setShowModal(false);
    setModalType({ deleteModal: false });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="text-3xl font-bold text-third">
        {`${formData.fullname}`}
      </span>
      <h1 className="p-4 text-2xl font-semibold">
        Are you sure you want to delete this Patient?
      </h1>
      <div className="flex gap-4">
        <button
          className="h-9 w-24 rounded bg-red-400 font-medium"
          onClick={() => handleDeleteYes(formData._id)}
        >
          Yes
        </button>
        <button
          className="h-9 w-24 rounded bg-neutral-400 font-medium"
          onClick={handleDeleteNo}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
