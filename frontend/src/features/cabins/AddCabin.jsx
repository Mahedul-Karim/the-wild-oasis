import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal-v1";

function AddCabin() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Button onClick={() => setShowForm((prev) => !prev)}>
        Add new cabins
      </Button>
      {showForm && (
        <Modal onClose={setShowForm}>
          <CreateCabinForm onCloseModal={setShowForm}/>
        </Modal>
      )}
    </>
  );
}
export default AddCabin;
