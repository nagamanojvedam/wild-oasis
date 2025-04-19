import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No Discount" },
    { value: "with-discount", label: "With Discount" },
  ];

  const sortOptions = [
    { value: "name-asc", label: "Sort by name (A-Z)" },
    { value: "name-desc", label: "Sort by name (Z-A)" },
    { value: "regularPrice-asc", label: "Sort by price (Low first)" },
    { value: "regularPrice-desc", label: "Sort by price (High first)" },
    { value: "maxCapacity-asc", label: "Sort by capacity (Low first)" },
    { value: "maxCapacity-desc", label: "Sort by capacity (High first)" },
  ];

  return (
    <>
      <TableOperations>
        <Filter filterField="discount" options={filterOptions} />
        <SortBy options={sortOptions} />
      </TableOperations>
    </>
  );
}

export default CabinTableOperations;
