import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (evnt) => {
    searchParams.set("sortBy", evnt.target.value);
    setSearchParams(searchParams);
  };

  const selectedSortValue = searchParams.get("sortBy") || "";

  return (
    <Select
      options={options}
      type="white"
      value={selectedSortValue}
      onChange={handleChange}
    />
  );
}

export default SortBy;
