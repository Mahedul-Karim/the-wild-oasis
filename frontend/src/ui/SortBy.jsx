import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
 
  const [searchParams,setSearchParams]=useSearchParams();

  const sortedValue = searchParams.get('sortBy') || '';

  const handleSort=function(e){
    searchParams.set('sortBy',e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
     options={options}
     type="white"
     onChange={handleSort}
     value={sortedValue}
    />
  );
}

export default SortBy;
