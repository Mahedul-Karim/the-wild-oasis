import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { recentBooking, recentStays } from "../../services/apiBookings";
import { useMemo } from "react";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { getCabins } from "../../services/apiCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams();

  const recent = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const recentDate = subDays(new Date(), recent).toISOString();

  const { data: booking, isLoading: isBookLoading } = useQuery({
    queryFn: () => recentBooking(recentDate),
    queryKey: ["booking-recent", `recent-${recent}`],
  });
  const { data: staying, isLoading: isStaysLoading } = useQuery({
    queryFn: () => recentStays(recentDate),
    queryKey: ["stays-recent", `recent-${recent}`],
  });

  const { data: cabinData, isLoading: isCabinLOading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isBookLoading || isStaysLoading || isCabinLOading) {
    return <Spinner />;
  }

  const stayinFilter = staying?.recentStays?.filter(
    (stay) => stay.status !== "unconfirmed"
  );

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={booking?.recentBooking}
        confirmedStays={stayinFilter}
        numDays={recent}
        cabinCount={cabinData?.cabins.length}
      />
      <TodayActivity />
      <DurationChart />
      <SalesChart bookings={booking?.recentBooking} numDays={recent} />
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
