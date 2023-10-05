import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { differenceInDays, parseISO } from "date-fns";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBooking = bookings.length;

  const totalSales = bookings?.reduce(
    (acc, cur) => acc + cur.cabinId.regularPrice,
    0
  );

  const numCheckins = confirmedStays.length;

  const numNights = [];

  confirmedStays.forEach((book) => {
    numNights.push(
      differenceInDays(parseISO(book.endDate), parseISO(book.startDate))
    );
  });

  const occupencyRate =
    numNights.reduce((acc, curr) => acc + curr, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat
        title={"Bookings"}
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title={"Sales"}
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title={"Check ins"}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckins}
      />
      <Stat
        title={"Occupency rate"}
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupencyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
