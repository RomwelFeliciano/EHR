import axios from "axios";

const Table = ({ patients }) => {
  return (
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
        {patients &&
          patients.map((patient) => {
            // Format dateOfAdmission
            let date = new Date(patient.dateOfAdmission);
            let dateOfAdmissionFormat = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(date);

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
                <td className="px-6 py-4">{patient.birthday}</td>
                <td className="px-6 py-4">{patient.hospitalNumber}</td>
                <td className="px-6 py-4">{patient.address}</td>
                <td className="px-6 py-4">{dateOfAdmissionFormat}</td>
                <td className="px-6 py-4">{patient.diagnosis}</td>
                <td className="px-6 py-4">{patient.addedBy}</td>
                <td className="px-2 py-4">
                  <button className="w-14 rounded-lg bg-blue-400 py-2 hover:bg-blue-600">
                    View
                  </button>
                </td>
                <td className="px-2 py-4">
                  <button className="w-14 rounded-lg bg-green-400 py-2 hover:bg-green-600">
                    Edit
                  </button>
                </td>
                <td className="py-4 pl-2 pr-4">
                  <button className="w-14 rounded-lg bg-red-400 py-2 hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
