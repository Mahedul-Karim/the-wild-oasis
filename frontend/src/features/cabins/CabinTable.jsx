import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {


  const [searchParams]=useSearchParams();

  const filterValue = searchParams.get('discount') || 'all';

  const {data,isLoading} = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  //queryKey can have a second value like useEffect;['cabins',searchParams,....]
  //it will refetch data as search params changes

  if(isLoading){
    return <Spinner />
  }

  const sortBy = searchParams.get('sortBy') || 'startDate-asc';

  const [sortValue,direction]=sortBy.split('-');
  
  let filteredCabins;

  if(filterValue === 'all'){
    filteredCabins = data?.cabins
  }
  if(filterValue === 'no-discount'){
    filteredCabins = data?.cabins.filter(c=> c.discount === 0);
  }
  if(filterValue === 'with-discount'){
    filteredCabins = data?.cabins.filter(c => c.discount > 0)
  }

  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabin = filteredCabins.sort((a,b)=>(a[sortValue] - b[sortValue])*modifier)

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {sortedCabin.map((cabin) => (
    <CabinRow cabin={cabin} key={cabin._id} />
  ))}
    </Table>
  );
}
export default CabinTable;