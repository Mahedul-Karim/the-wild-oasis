import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useCtx } from "../../context/ContextProvider";

function UpdateUserDataForm() {

  const { user,setUser } = useCtx();
  
  const [fullName, setFullName] = useState(user?.name);
  const [avatar, setAvatar] = useState(null);
  
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ endpoint, option }) => auth(endpoint, option),
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user)),
      toast.success("User data updated!");
      setUser(data.user)
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  function setImage(e) {
    const fileReader = new FileReader();

    fileReader.onload = function () {
      setAvatar(fileReader.result);
    };

    fileReader.readAsDataURL(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user._id, name: fullName, avatar }),
    };

    mutate({ endpoint: "update", option });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" onChange={setImage} />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isLoading}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
