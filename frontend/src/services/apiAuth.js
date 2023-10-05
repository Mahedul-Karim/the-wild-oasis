import toast from "react-hot-toast";
import { API_URL } from "../utils/api";

export const auth = async function (endpoint, options) {
  const res = await fetch(`${API_URL}/user/${endpoint}`, options);

  const data = await res.json();

  if (!data.success || !res.ok) {
    return toast.error("Invalid credentials!");
  }

  return data;
};
