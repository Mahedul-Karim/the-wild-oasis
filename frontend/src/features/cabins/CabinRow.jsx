import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { deleteCabins } from "../../services/apiCabins";
import CreateCabinForm from "./CreateCabinForm";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from '../../ui/ConfirmDelete';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Button=styled.button`
background-color:transparent;
border:none;
font-size:20px;
margin-right:2px
`

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete,setConfirmDelete]=useState(false);

  const { _id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading } = useMutation({
    mutationFn: (id) => deleteCabins(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error("Something went wrong!"),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>
          {regularPrice
            ? formatCurrency(regularPrice)
            : Math.ceil(Math.random() * 100) + 200}
        </Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Button onClick={() => setShowForm((prev) => !prev)}>
            <HiPencil />
          </Button>
          <Button onClick={() => setConfirmDelete(prev => !prev)} disabled={isLoading}>
            <HiTrash />
          </Button>
        </div>
      </TableRow>
      {showForm && (
        <Modal onClose={setShowForm}>
          <CreateCabinForm cabinEdit={cabin} onCloseModal={setShowForm} />
        </Modal>
      )}
      {confirmDelete && <Modal onClose={setConfirmDelete}><ConfirmDelete resourceName={name} disabled={isLoading} onConfirm={()=>mutate(_id)} onCloseModal={setConfirmDelete}/></Modal>}
    </>
  );
}

export default CabinRow;
