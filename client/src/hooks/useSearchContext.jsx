import { useContext } from "react";
import SearchContext from "../contexts/SearchPatientContext";

// Returning SearchPatientContext but checking if it is inside the provider
export const useSearchContext = () => {
  const search = useContext(SearchContext);

  if (!search) {
    throw Error("useSearchContext must be used inside a SearchProvider");
  }

  return search;
};
