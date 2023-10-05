import { getToday } from "../utils/helpers";
import { API_URL } from "../utils/api";

export const getBookings = async function () {
  const res = await fetch(`${API_URL}/booking`);

  const data = await res.json();

  if (!data.success || !res.ok) {
    throw new Error("Something went wrong!");
  }

  return data;
};

export const singleBooking = async function (id,options={}) {
  const res = await fetch(`${API_URL}/booking/${id}`,options);

  const data = await res.json();

  if (!data.success || !res.ok) {
    throw new Error("Something went wrong!");
  }
  return data;
};
export const recentBooking = async function (date) {
  const res = await fetch(`${API_URL}/booking/recent/${date}`);

  const data = await res.json();
  
  if (!data.success || !res.ok) {
    throw new Error("Something went wrong!");
  }
  return data;
};
export const recentStays = async function (date) {
  const res = await fetch(`${API_URL}/booking/stays/${date}`);

  const data = await res.json();
  
  if (!data.success || !res.ok) {
    throw new Error("Something went wrong!");
  }
  return data;
};
