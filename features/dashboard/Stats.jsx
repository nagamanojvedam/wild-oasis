import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ bookings = {}, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce(
    (result, booking) => result + booking.totalPrice,
    0
  );
  const checkins = confirmedStays.length;
  const occupancyRate = `${Math.round(
    (confirmedStays.reduce((result, stay) => result + stay.numNights, 0) /
      (numDays * cabinCount)) *
      100
  )}%`;

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        color="blue"
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        color="indigo"
        value={checkins}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        color="yellow"
        value={occupancyRate}
      />
    </>
  );
}

export default Stats;
