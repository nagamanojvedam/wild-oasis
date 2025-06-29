import Filter from "../../ui/Filter";

function DashboardFilter() {
  const lastOptions = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
  ];
  return <Filter filterField="last" options={lastOptions} />;
}

export default DashboardFilter;
