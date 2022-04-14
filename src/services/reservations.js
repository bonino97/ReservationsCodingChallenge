import axios from "axios";
import { API_URL } from "../config/apiUrl";

const url = API_URL + "/reservations";

export const getReservations = async () => {
  try {
    const { data } = await axios.get(url);
    if (!data) throw new Error("No reservations found");
    return data;
  } catch (error) {
    throw new Error("Get reservations error: " + error.message);
  }
};
