import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!cabins.length) <Empty resourceName="cabins" />;

  const filterValue = searchParams.get("discount") || "all";

  let filterdCabins;

  if (filterValue === "all") filterdCabins = cabins.slice();
  if (filterValue === "no-discount")
    filterdCabins = cabins.slice().filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filterdCabins = cabins.slice().filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterdCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Cabin</div>
          <div></div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
