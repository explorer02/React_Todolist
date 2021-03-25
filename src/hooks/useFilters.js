import { useCallback, useState } from "react";
import { CATEGORY_LIST, URGENCY_LIST } from "../constants";

export const useFilters = () => {
  const [filters, setFilters] = useState(
    URGENCY_LIST.concat(CATEGORY_LIST).map((name) => ({
      name,
      isSelected: false,
    }))
  );

  const toggleFilterhandler = useCallback(
    (name) => {
      const updatedList = [...filters];
      const index = updatedList.findIndex((f) => f.name === name);
      updatedList[index].isSelected = !updatedList[index].isSelected;
      setFilters(updatedList);
    },
    [filters]
  );

  return { filters, toggleFilter: toggleFilterhandler };
};
