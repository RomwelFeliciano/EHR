import { useContext } from "react";
import { PatientTableContext } from "../contexts/PatientTableContext";
import PaginationLinks from "./PaginationLinks";

const Pagination = ({ numbers, numberOfPages }) => {
  const { currentPage, setCurrentPage } = useContext(PatientTableContext);

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
          <button
            className={`ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-third px-4 leading-tight ${
              currentPage === 1
                ? "bg-main text-black hover:bg-third hover:text-white"
                : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-700"
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1} // Disable previous button if currentPage is 1
          >
            Previous
          </button>
        </li>
        <PaginationLinks numbers={numbers} numberOfPages={numberOfPages} />
        <li>
          <button
            className={`flex h-10 items-center justify-center rounded-e-lg border border-third px-4 leading-tight ${
              currentPage === numberOfPages
                ? "bg-main text-black hover:bg-third hover:text-white"
                : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-700"
            }`}
            onClick={handleNext}
            disabled={currentPage === numberOfPages} // Disable next button if currentPage is last page
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
