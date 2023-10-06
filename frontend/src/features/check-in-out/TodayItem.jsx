import styled from "styled-components";
import {Flag} from '../../ui/Flag';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button'

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { _id, status, guestId } = activity;
  console.log(guestId)
  return (
    <>
      {guestId?.fullName && <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guestId?.countryFlag} alt={`Flag of ${guestId?.country}`} />
      <Guest>{guestId?.fullName}</Guest>
    </StyledTodayItem>}
    </>
  );
}

export default TodayItem;
