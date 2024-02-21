import { patientTableContext } from "../contexts/PatientTableContext";
import { useContext } from "react";
import PaginationLinks from "./PaginationLinks";

const Pagination = () => {
  const { currentPage, setCurrentPage, numberOfPages } =
    useContext(patientTableContext);

  const handlePrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex h-10 -space-x-px text-base">
        <li>
          <a
            href="#"
            className={`ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-third px-4 leading-tight ${
              currentPage === 1
                ? "bg-main text-black hover:bg-third hover:text-white"
                : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-700"
            }`}
            onClick={handlePrevious}
          >
            Previous
          </a>
        </li>
        <PaginationLinks />
        <li>
          <a
            href="#"
            className={`flex h-10 items-center justify-center rounded-e-lg border border-third px-4 leading-tight ${
              currentPage === numberOfPages
                ? "bg-main text-black hover:bg-third hover:text-white"
                : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-700"
            }`}
            onClick={handleNext}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
