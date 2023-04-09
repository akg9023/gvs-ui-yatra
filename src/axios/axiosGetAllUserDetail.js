import axios from "axios";
import { GET_ALL_USER_DETAIL } from "../constants/apiConstant";

export default async () => {
  const res = await axios.post(GET_ALL_USER_DETAIL);
  return res
};