import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { singleBooking } from "../../services/apiBookings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { checkinId } = useParams();
  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", checkinId],
    queryFn: () => singleBooking(checkinId),
    retry: false,
  });

  useEffect(() => {
    setConfirmPaid(booking?.booking?.isPaid || false);
  }, [booking?.booking?.isPaid]);

  const { mutate, isLoading: isChekingIn } = useMutation({
    mutationFn: ({ id, options }) => singleBooking(id, options),
    onSuccess: () => {
      toast.success("Booking updated!");
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  function handleCheckin() {
    if (!confirmPaid) {
      return;
    }

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const sentData = { id: checkinId, options };
    mutate(sentData);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.booking?._id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking?.booking} />
      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isChekingIn}
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          I confirm that {booking?.booking?.guestId?.fullName} has paid the
          total amount{" "}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChekingIn}>
          Check in booking #{booking?.booking?._id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
