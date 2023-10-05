import { API_URL } from "../utils/api";


export const getCabins = async function () {
  const res = await fetch(`${API_URL}/cabins`);

  const data = await res.json();

  return data;
};

export const deleteCabins=async function(id){
  const res = await fetch(`${API_URL}/cabins/${id}`,{
    method:'DELETE'
  });

  const data = await res.json();
  
  if(!data.success || !res.ok){
    throw new Error('Something went wrong!')
  }

  return data;

}

export const createCabins = async function(data){
  
  const res = await fetch(`${API_URL}/cabins`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })


  const cabinData = await res.json();

  if(!cabinData.success || !res.ok){
    throw new Error('Something went wrong!Please try again later')
  }

  return cabinData;

}

export const updateCabin =async function(data,id){
  
  const res= await fetch(`${API_URL}/cabins`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({id,...data})
  })

  const cabinData = await res.json();

  if(!cabinData.success || !res.ok){
    throw new Error('Something went wrong!Please try again later')
  }

  return cabinData;

}