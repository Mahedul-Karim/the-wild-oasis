import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { getBookings } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const [searchParams] = useSearchParams();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  if (isLoading) {
    return <Spinner />;
  }

  const filterValue = searchParams.get("status") || "all";
  const paginationSize = Number(searchParams.get("page")) || 1;

  const sortBy = searchParams.get("sortBy") || "startDate-desc";

  const [sortValue, direction] = sortBy.split("-");

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = bookings?.bookings;
  }
  if (filterValue === "checked-out") {
    filteredCabins = bookings?.bookings.filter(
      (c) => c.status === "checked-out"
    );
  }
  if (filterValue === "checked-in") {
    filteredCabins = bookings?.bookings.filter(
      (c) => c.status === "checked-in"
    );
  }
  if (filterValue === "unconfirmed") {
    filteredCabins = bookings?.bookings.filter(
      (c) => c.status === "unconfirmed"
    );
  }

  const modifier = direction === "asc" ? 1 : -1;

  const totalPage = Math.ceil(filteredCabins.length / 10);

  const nextPage = (paginationSize - 1) * 10;
  const prevPage =
    paginationSize === totalPage ? filteredCabins.length : paginationSize * 10;

  const sortedCabin = filteredCabins
    .sort(
      (a, b) => (new Date(a[sortValue]) - new Date(b[sortValue])) * modifier
    )
    .slice(nextPage, prevPage );

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabin}
          render={(booking) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={filteredCabins.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
