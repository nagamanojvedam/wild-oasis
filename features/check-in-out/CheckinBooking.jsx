import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import { useBooking } from "../bookings/useBooking";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isPending } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isPending: isLoadingSettings } = useSettings();
  const {
    id: bookingId,
    guests,
    totalPrice,
    extrasPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking || {};

  useEffect(() => {
    setConfirmPaid(isPaid ?? false);
  }, [isPaid]);

  if (isPending || isLoadingSettings) return <Spinner />;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests + extrasPrice;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            id="addBreakfast"
            checked={addBreakfast}
            onChange={(evnt) => {
              setAddBreakfast(evnt.target.checked);
              setConfirmPaid(false);
            }}
            disabled={addBreakfast}
          >
            {" "}
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          id="confirm"
          checked={confirmPaid}
          onChange={(evnt) => setConfirmPaid(evnt.target.checked)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button
          variation="primary"
          size="medium"
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
