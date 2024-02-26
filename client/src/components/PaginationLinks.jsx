import { useContext } from "react";
import { PatientTableContext } from "../contexts/PatientTableContext";

const PaginationLinks = ({ numbers, numberOfPages }) => {
  const { currentPage, setCurrentPage } = useContext(PatientTableContext);

  const startingPage = Math.max(1, currentPage - 2);
  const endingPage = Math.min(startingPage + 4, numberOfPages);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleDotPrev = () => {
    setCurrentPage(startingPage);
  };

  const handleDotNext = () => {
    setCurrentPage(endingPage);
  };

  const startingDots = startingPage > 1 && (
    <li key={1} className="cursor-pointer">
      <button
        className="flex h-10 items-center justify-center border border-third bg-white px-4 leading-tight text-black hover:bg-third hover:text-white"
        onClick={handleDotPrev}
      >
        ...
      </button>
    </li>
  );

  const endingDots = endingPage < numberOfPages && (
    <li key={numberOfPages} className="cursor-pointer">
      <button
        className="flex h-10 items-center justify-center border border-third bg-white px-4 leading-tight text-black hover:bg-third hover:text-white"
        onClick={handleDotNext}
      >
        ...
      </button>
    </li>
  );

  return (
    <>
      {startingDots}
      {numbers.slice(startingPage - 1, endingPage).map((num) => (
        <li key={num}>
          <button
            className={`flex h-10 items-center justify-center border border-third px-4 leading-tight ${
              currentPage === num
                ? "bg-main text-black hover:bg-third hover:text-white"
                : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-700"
            }`}
            onClick={() => handleChangePage(num)}
          >
            {num}
          </button>
        </li>
      ))}
      {endingDots}
    </>
  );
};

export default PaginationLinks;
