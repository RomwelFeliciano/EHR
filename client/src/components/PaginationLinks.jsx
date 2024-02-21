import { useContext } from "react";
import { patientTableContext } from "../contexts/PatientTableContext";

const PaginationLinks = () => {
  const { currentPage, setCurrentPage, numberOfPages, numbers } =
    useContext(patientTableContext);

  const startingPage = Math.max(1, currentPage - 2);
  const endingPage = Math.min(startingPage + 4, numberOfPages);

  console.log(startingPage, endingPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleDotPrev = () => {
    setCurrentPage(startingPage);
  };

  const handleDotNext = () => {
    setCurrentPage(endingPage);
  };

  // If the startingPage is greater than 1, render a dot
  const startingDots = startingPage > 1 && (
    <li key={1} className="cursor-pointer">
      <span
        className="flex h-10 items-center justify-center border border-third bg-white px-4 leading-tight text-black hover:bg-third hover:text-white"
        onClick={handleDotPrev}
      >
        ...
      </span>
    </li>
  );

  // If the endingPage is less than the last page, render a dot
  const endingDots = endingPage < numberOfPages && (
    <li key={numberOfPages} className="cursor-pointer">
      <span
        className="flex h-10 items-center justify-center border border-third bg-white px-4 leading-tight text-black hover:bg-third hover:text-white"
        onClick={handleDotNext}
      >
        ...
      </span>
    </li>
  );

  return (
    <>
      {startingDots}
      {numbers.slice(startingPage - 1, endingPage).map((num) => (
        <li key={num}>
          <a
            href="#"
            className={`flex h-10 items-center justify-center border border-third px-4 leading-tight ${
              currentPage === num
                ? "bg-main text-black hover:bg-third hover:text-white"
                : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-700"
            }`}
            onClick={() => handleChangePage(num)}
          >
            {num}
          </a>
        </li>
      ))}
      {endingDots}
    </>
  );
};

export default PaginationLinks;
